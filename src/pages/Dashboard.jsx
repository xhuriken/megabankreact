import React, { useState, useEffect } from "react";
import Account from "./Account";
import { getAccounts } from "../api/accounts";
import { useAuth } from "../AuthContext";

const sampleBeneficiaries = [
  { id: "b-1", name: "Alice", note: "Amie", handle: "alice01" },
  { id: "b-2", name: "Bob", note: "Coloc", handle: "bob-room" },
  { id: "b-3", name: "Sophie Rain", note: "Maman", handle: "sophie-m" },
];
function formatBalance(value) {
  return value.toLocaleString("fr-FR", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

export default function Dashboard() {
  const { isConnected } = useAuth();
  const [selectedAccount, setSelectedAccount] = useState(null);
  const [beneficiariesState, setBeneficiariesState] = useState(sampleBeneficiaries);

  const [accountsState, setAccountsState] = useState([]);
  const [loadingAccounts, setLoadingAccounts] = useState(false);
  const [accountsError, setAccountsError] = useState(null);

  useEffect(() => {
    // only fetch when user is connected
    if (!isConnected) return;

    setLoadingAccounts(true);
    setAccountsError(null);
    getAccounts()
      .then((data) => {
        // backend returns list of accounts matching AccountPublic schema
        // adapt shape to what the Dashboard expects
        const mapped = (data || []).map((a) => ({
          id: a.iban || a.id,
          name: a.iban || "Compte",
          iban: a.iban,
          balance: Number(a.balance ?? 0),
          lastTransaction: a.last_transaction || { label: "—", amount: 0, type: "credit", date: "" },
        }));
        setAccountsState(mapped);
      })
      .catch((err) => {
        console.error("getAccounts error:", err);
        setAccountsError(err.message || String(err));
      })
      .finally(() => setLoadingAccounts(false));

    // beneficiaries are local for now (sample data)
  }, [isConnected]);

  // If an account is selected, show the account detail page
  if (selectedAccount) {
    return <Account account={selectedAccount} onBack={() => setSelectedAccount(null)} />;
  }

  // simple handler to add a beneficiary locally (sample data)
  const handleAddBeneficiary = () => {
    const name = window.prompt("Nom du bénéficiaire (Prénom Nom)");
    if (!name) return;
    const note = window.prompt("Note (optionnel)") || "";
    const handle = name.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");
    const id = `b-${Date.now()}`;
    setBeneficiariesState((prev) => [{ id, name, note, handle }, ...prev]);
  };

  // ensure we show at least 1 and at most 5 accounts
  const visibleAccounts = (accountsState && accountsState.length > 0) ? accountsState.slice(0, 5) : [];
  const primary = visibleAccounts[0] || null;
  // secondary accounts — up to 4 (slots will be filled with placeholders if missing)
  const secondary = visibleAccounts.slice(1, 5);
  const slots = Array.from({ length: 4 }).map((_, i) => secondary[i] || null);

  return (
    <section className="mx-auto max-w-4xl">
      <h1 className="text-3xl font-semibold mb-2">Tableau de bord</h1>
      <p className="text-text-muted mb-6">Vos comptes — envoyez des Bonk en un clic.</p>

      {/* Primary account (large, centered) */}
      <div className="flex justify-center mb-6">
        {loadingAccounts ? (
          <div className="text-text-muted">Chargement des comptes...</div>
        ) : accountsError ? (
          <div className="text-red-400">Erreur: {accountsError}</div>
        ) : primary ? (
          <article
            onClick={() => setSelectedAccount(primary)}
            className="w-full max-w-2xl rounded-3xl border border-white/10 bg-surface/95 p-6 shadow-[0_20px_60px_rgba(0,0,0,0.65)] transform transition-transform duration-200 hover:-translate-y-1 cursor-pointer"
          >
            <div className="flex items-center justify-between gap-4">
              <div>
                <div className="text-sm uppercase tracking-wide text-text-muted">{primary.name} (Principal)</div>
                <div className="mt-3 text-4xl font-bold">{formatBalance(primary.balance)} Ⓑ</div>
                <div className="text-sm text-text-muted mt-1">Solde disponible</div>
              </div>
              <div className="text-right">
                <div className={`inline-block px-3 py-2 rounded-full text-sm ${primary.lastTransaction.type === "credit" ? "bg-emerald-700 text-emerald-100" : "bg-red-700 text-red-100"}`}>
                  {primary.lastTransaction.type === "credit" ? "+" : ""}{Math.abs(primary.lastTransaction.amount).toLocaleString("fr-FR", { minimumFractionDigits: 2 })} Ⓑ
                </div>
                <div className="mt-2 text-sm text-text-muted">Dernière: {primary.lastTransaction.label}</div>
                <div className="text-xs text-text-muted">{primary.lastTransaction.date}</div>
              </div>
            </div>
          </article>
        ) : (
          <article className="w-full max-w-2xl rounded-3xl border border-dashed border-white/10 bg-surface/90 p-6 text-center">
            <div className="text-sm text-text-muted">Aucun compte principal</div>
            <button className="mt-3 rounded-full bg-primary px-4 py-2 text-white">Ouvrir un compte</button>
          </article>
        )}
      </div>

      {/* Secondary small cards row: exactly 4 slots (placeholders if empty) */}
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2">
        {slots.map((acc, idx) => (
          <article
            key={idx}
            className={`rounded-xl border border-white/10 bg-surface/90 p-4 text-sm transition-transform duration-200 hover:scale-105 hover:shadow-xl ${acc ? "" : "opacity-80"}`}>
            {acc ? (
              <div className="flex flex-col h-full justify-between">
                <div>
                  <div className="text-xs uppercase tracking-wide text-text-muted">{acc.name}</div>
                  <div className="mt-2 text-xl font-semibold">{formatBalance(acc.balance)} Ⓑ</div>
                </div>
                <div className="mt-4">
                    <div className="mt-2 text-[11px] text-text-muted capitalize">{acc.lastTransaction.type}</div>
                  <div className="flex items-center justify-between">
                    <div className="text-[12px] text-text-muted">{acc.lastTransaction.label}</div>
                    <div className={`text-lg font-semibold ${acc.lastTransaction.type === "credit" ? "text-emerald-300" : "text-red-300"}`}>
                      {acc.lastTransaction.type === "credit" ? "+" : "-"}{Math.abs(acc.lastTransaction.amount).toLocaleString("fr-FR", { minimumFractionDigits: 2 })} Ⓑ
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-center">
                <div className="text-sm text-text-muted">Emplacement vide</div>
                <div className="mt-3 text-[12px] text-text-muted">Ouvrir un compte pour remplir cette carte.</div>
                <button className="mt-4 rounded-full bg-primary px-3 py-1 text-xs text-white">Ouvrir</button>
              </div>
            )}
          </article>
        ))}
      </div>

      {/* Beneficiaries */}
      <div className="mt-8">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold mb-1">Bénéficiaires / Amis</h2>
            <p className="text-sm text-text-muted">Personnes à qui vous pouvez envoyer des Bonk rapidement.</p>
          </div>
          <div>
            <button onClick={handleAddBeneficiary} className="rounded-full bg-primary px-3 py-1.5 text-sm font-medium text-white shadow-[0_0_35px_rgba(110,84,188,0.7)]">Ajouter</button>
          </div>
        </div>

        <div className="mt-4 grid gap-3 sm:grid-cols-3">
          {beneficiariesState.map((b) => (
            <div key={b.id} className="flex items-center gap-3 rounded-xl border border-white/10 bg-surface/90 p-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/20 font-semibold text-primary">{b.name.charAt(0)}</div>
              <div className="flex-1">
                <div className="font-semibold">{b.name}</div>
                <div className="text-[12px] text-text-muted">{b.note} • <span className="text-primary">@{b.handle}</span></div>
              </div>
              <button className="cursor-pointer rounded-full border border-white/10 bg-primary/80 px-3 py-1 text-xs text-white">Envoyer</button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
