import React from "react";
import TransactionsList from "../components/TransactionsList";
import DepositModal from "../components/modals/DepositModal";
import { getAccounts } from "../api/accounts";
import { useState } from "react";

import { closeAccount } from "../api/accounts";

function formatBalance(value) {
  return value.toLocaleString("fr-FR", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}


export default function Account({ account, onBack, onTransferClick }) {
  const [modalInfo, setModalInfo] = useState(null);



  function closeModal() {
    window.location.reload();
    setModalInfo(null);
  }


  if (!account) {
    return (
      <section className="mx-auto max-w-4xl">
        <button onClick={onBack} className="mb-4 rounded-full border border-white/10 px-4 py-2 text-sm text-text-muted hover:text-text">
          ← Retour
        </button>
        <div className="text-center text-text-muted">Aucun compte sélectionné.</div>
      </section>
    );
  }


  async function handleDeleteAccount() {
    if (!window.confirm("Voulez-vous vraiment supprimer ce compte ?")) return;

    try {
      await closeAccount(account.iban);
      onBack();
    } catch (err) {
      alert(err.message);
    }
  }

  const last = account.lastTransaction ?? {
    type: "credit",
    amount: 0,
    date: "—",
    label: "Aucune transaction",
  };

  return (
    <>
      <section className="mx-auto max-w-4xl">
        {/* Back button */}
        <button onClick={onBack} className="mb-6 rounded-full border border-white/10 px-4 py-2 text-sm text-text-muted hover:text-text transition-colors">
          ← Retour au tableau de bord
        </button>

        {/* Account header */}
        <div className="rounded-3xl border border-white/10 bg-surface/95 p-6 shadow-[0_20px_60px_rgba(0,0,0,0.65)] mb-6">
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-3xl font-semibold">{account.name}</h1>
              <p className="text-sm text-text-muted">{account.iban}</p>
              <p className="text-sm text-text-muted mt-2">Détails de votre compte</p>
            </div>
          </div>
        </div>

        {/* Solde actuel */}
        <div className="grid gap-4 md:grid-cols-3 mb-6">
          <div className="rounded-2xl border border-white/10 bg-surface/90 p-4">
            <div className="text-xs uppercase tracking-wide text-text-muted">Solde disponible</div>
            <div className="mt-3 text-3xl font-bold">{formatBalance(account.balance)} Ⓑ</div>
            <div className="mt-2 text-xs text-text-muted">En Bonk</div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-surface/90 p-4">
            <div className="text-xs uppercase tracking-wide text-text-muted">Dernière transaction</div>
            <div className={`mt-3 text-2xl font-semibold ${last.type === "credit" ? "text-emerald-300" : "text-red-300"}`}>
              {last.type === "credit" ? "+" : "-"}{Math.abs(last.amount).toLocaleString("fr-FR", { minimumFractionDigits: 2 })} Ⓑ
            </div>
            <div className="mt-2 text-xs text-text-muted capitalize">{last.type}</div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-surface/90 p-4">
            <div className="text-xs uppercase tracking-wide text-text-muted">Date</div>
            <div className="mt-3 text-lg font-semibold">{last.date}</div>
            <div className="mt-2 text-xs text-text-muted">{last.label}</div>
          </div>
        </div>

        {/* Historique transactions */}
        <div className="rounded-2xl border border-white/10 bg-surface/90 p-6">
          <div className="rounded-2xl border border-white/10 bg-surface/90 p-6">
            <h2 className="text-xl font-semibold mb-4">Historique des transactions</h2>
            <TransactionsList iban={account.iban} />
          </div>
        </div>

        {/* Actions */}
        <div className="mt-6 flex gap-3">
          <button
            onClick={() => setModalInfo(account.iban)}
            className="cursor-pointer flex-1 rounded-xl bg-primary px-4 py-3 text-sm font-medium text-white shadow-[0_0_35px_rgba(110,84,188,0.7)] transition-transform duration-200 hover:-translate-y-0.5 hover:shadow-[0_0_55px_rgba(110,84,188,1)]"
          >Déposer des Bonks</button>
          <button
            onClick={() => onTransferClick && onTransferClick(account)}
            className="flex-1 rounded-xl bg-primary px-4 py-3 text-sm font-medium text-white shadow-[0_0_35px_rgba(110,84,188,0.7)] transition-transform duration-200 hover:-translate-y-0.5 hover:shadow-[0_0_55px_rgba(110,84,188,1)]"
          >
            Envoyer de l'argent
          </button>
          {/* del button for primary account*/}
          {!account.is_primary && (
            <button
              onClick={async () => {
                const ok = window.confirm("Êtes-vous sûr de vouloir supprimer ce compte ?");
                if (!ok) return;

                try {
                  await closeAccount(account.iban);
                  alert("Compte supprimé !");

                  if (onBack) onBack(account.iban);
                } catch (err) {
                  console.error(err);
                  alert(err.message || "Erreur lors de la suppression du compte.");
                }
              }}
              className="flex-1 rounded-xl border border-white/10 bg-surface/90 px-4 py-3 text-sm font-medium text-text-muted backdrop-blur-sm transition-colors hover:border-primary-soft hover:text-text"
            >
              Supprimer le compte
            </button>
          )}
        </div>
      </section>
      {/* Modal */}
      {modalInfo && (
        <DepositModal
          iban={account.iban}
          onClose={() => closeModal()}
        />
      )}
    </>
  );
}
