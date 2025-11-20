import React, { useState } from "react";
import Account from "./Account";

// Sample mock data for demo. Replace with real data (props / API) as needed.
const sampleAccounts = [
  {
    id: "acc-1",
    name: "Compte principal",
    balance: 4280.5,
    lastTransaction: { label: "Salaire", amount: 2100.0, type: "credit", date: "2025-11-01" },
  },
  {
    id: "acc-2",
    name: "Épargne",
    balance: 1500.0,
    lastTransaction: { label: "Virement vers Épargne", amount: 420.0, type: "credit", date: "2025-11-10" },
  },
  {
    id: "acc-3",
    name: "Voyages",
    balance: 320.75,
    lastTransaction: { label: "Courses", amount: -54.2, type: "debit", date: "2025-11-12" },
  },
];

const sampleBeneficiaries = [
  { id: "b-1", name: "Alice", note: "Amie", handle: "alice01" },
  { id: "b-2", name: "Bob", note: "Coloc", handle: "bob-room" },
  { id: "b-3", name: "Sophie Rain", note: "Maman", handle: "sophie-m" },
];

function formatBalance(value) {
  return value.toLocaleString("fr-FR", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

export default function Dashboard({ accounts = sampleAccounts, beneficiaries = sampleBeneficiaries }) {
  const [selectedAccount, setSelectedAccount] = useState(null);
  const [isAddingBeneficiary, setIsAddingBeneficiary] = useState(false);
  const [accountsState, setAccountsState] = useState(accounts);
  const [beneficiariesState, setBeneficiariesState] = useState(beneficiaries);
  const [newName, setNewName] = useState("");
  const [newIban, setNewIban] = useState("");

  // If an account is selected, show the account detail page
  if (selectedAccount) {
    return <Account account={selectedAccount} onBack={() => setSelectedAccount(null)} />;
  }

  // Modal form state and handlers are rendered inline below when `isAddingBeneficiary` is true.

  // ensure we show at least 1 and at most 5 accounts
  const visibleAccounts = (accountsState && accountsState.length > 0) ? accountsState.slice(0, 5) : sampleAccounts.slice(0, 1);
  const primary = visibleAccounts[0] || null;
  // secondary accounts — up to 4 (slots will be filled with placeholders if missing)
  const secondary = visibleAccounts.slice(1, 5);
  const slots = Array.from({ length: 4 }).map((_, i) => secondary[i] || null);

  return (
    <section className="mx-auto max-w-4xl">
      <h1 className="text-3xl font-semibold mb-2">Tableau de bord</h1>
      <p className="text-text-muted mb-6">Vos comptes et vos bénéficiaires — envoyez des Bonk en un clic.</p>

      {/* Primary account (large, centered) */}
      <div className="flex justify-center mb-6">
        {primary ? (
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
            <h2 className="text-xl font-semibold mb-1">Bénéficiaires</h2>
            <p className="text-sm text-text-muted">Personnes à qui vous pouvez envoyer des Bonk rapidement.</p>
          </div>
          <div>
            <button
              onClick={() => setIsAddingBeneficiary(true)}
              className="rounded-full bg-primary px-3 py-1.5 text-sm font-medium text-white shadow-none transform transition-all duration-150 hover:scale-105 hover:shadow-[0_0_35px_rgba(110,84,188,0.7)] hover:brightness-100"
            >
              Ajouter
            </button>
          </div>
        </div>

        <div className="mt-4 grid gap-3 sm:grid-cols-3">
          {beneficiariesState.map((b) => (
            <div key={b.id} className="flex items-center gap-3 rounded-xl border border-white/10 bg-surface/90 p-3 transform transition-transform duration-150 hover:scale-105">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/20 font-semibold text-primary">{b.name.charAt(0)}</div>
              <div className="flex-1">
                <div className="font-semibold">{b.name}</div>
              </div>
              <button className="cursor-pointer rounded-full border border-white/10 bg-primary/80 px-3 py-1 text-xs text-white transform transition-all duration-150 hover:scale-105 hover:shadow-[0_0_35px_rgba(110,84,188,0.7)] hover:brightness-100">Envoyer</button>
            </div>
          ))}
        </div>
      </div>

      {isAddingBeneficiary && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/60" onClick={() => setIsAddingBeneficiary(false)} />
          <form
            onSubmit={(e) => {
              e.preventDefault();
              const id = `b-${Date.now()}`;
              const handle = newName ? newName.toLowerCase().replace(/\s+/g, "-") : `user-${Date.now()}`;
              const newBenef = { id, name: newName || "Nouveau bénéficiaire", note: `IBAN: ${newIban || "-"}`, handle };
              setBeneficiariesState((prev) => [newBenef, ...prev]);
              setNewName("");
              setNewIban("");
              setIsAddingBeneficiary(false);
            }}
            className="relative z-10 w-full max-w-md rounded-xl border border-white/10 bg-surface/95 p-6 shadow-xl"
          >
            <h3 className="text-lg font-semibold mb-2">Ajouter un bénéficiaire</h3>
            <p className="text-sm text-text-muted mb-4">Entrez le nom et l'IBAN du bénéficiaire.</p>

            <label className="block text-sm mb-2">
              <div className="text-xs text-text-muted mb-1">Nom</div>
              <input
                required
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                className="w-full rounded-md border border-white/10 bg-transparent px-3 py-2 text-sm"
                placeholder="Ex: Jean Dupont"
              />
            </label>

            <label className="block text-sm mb-4">
              <div className="text-xs text-text-muted mb-1">IBAN</div>
              <input
                required
                value={newIban}
                onChange={(e) => setNewIban(e.target.value)}
                className="w-full rounded-md border border-white/10 bg-transparent px-3 py-2 text-sm"
                placeholder="FR76 3000 6000 0112 3456 7890 189"
              />
            </label>

            <div className="flex justify-end gap-3">
              <button type="button" onClick={() => setIsAddingBeneficiary(false)} className="rounded-md px-3 py-2 text-sm border border-white/10">Annuler</button>
              <button type="submit" className="rounded-md bg-primary px-3 py-2 text-sm text-white">Ajouter</button>
            </div>
          </form>
        </div>
      )}
    </section>
  );
}
