// src/components/dashboard/AccountsSection.jsx
import React, { useState, useEffect } from "react";
import { formatBalance } from "../../api/format";
import { getAccounts } from "../../api/accounts";
import NewAccountModal from "../modals/NewAccountModal";

export default function AccountsSection({ onSelectAccount }) {
  const [accounts, setAccounts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [modalInfo, setModalInfo] = useState(null); // { isPrimary: bool }

  // fetch accounts
  async function fetchAccounts() {
    setLoading(true);
    setError(null);
    try {
      const data = await getAccounts();
      setAccounts(data);
    } catch (err) {
      console.error("Erreur fetch accounts :", err);
      setError("Impossible de récupérer les comptes");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchAccounts();
  }, []);

  const primary = accounts.find(a => a.is_primary) || (accounts.length > 0 ? accounts[0] : null);
  const secondary = primary == null ? accounts : accounts.filter(a => a.iban !== primary.iban).slice(0, 4);
  const slots = Array.from({ length: 4 }).map((_, i) => secondary[i] || null);

  return (
    <>
      {/* Primary account */}
      <div className="flex justify-center mb-6">
        {loading ? (
          <div className="text-text-muted">Loading accounts...</div>
        ) : error ? (
          <div className="text-red-400">{error}</div>
        ) : primary ? (
          <article
            onClick={() => onSelectAccount && onSelectAccount(primary)}
            className="w-full max-w-2xl rounded-3xl border border-white/10 bg-surface/95 p-6 shadow-[0_20px_60px_rgba(0,0,0,0.65)] transform transition-transform duration-200 hover:-translate-y-1 cursor-pointer"
          >
            <div>
              <div className="text-sm uppercase tracking-wide text-text-muted">
                {primary.name} (Principal)
              </div>
              <p className="text-sm text-text-muted">{primary.iban}</p>
              <div className="mt-3 text-4xl font-bold">{formatBalance(primary.balance)} Ⓑ</div>
              <div className="text-sm text-text-muted mt-1">Solde disponible</div>
            </div>
          </article>
        ) : (
          <article className="w-full max-w-2xl rounded-3xl border border-dashed border-white/10 bg-surface/90 p-6 text-center">
            <div className="text-sm text-text-muted">No primary account yet</div>
            <button
              onClick={() => setModalInfo({ isPrimary: true })}
              className="mt-3 rounded-full bg-primary px-4 py-2 text-white"
            >
              Ouvrir compte principal
            </button>
          </article>
        )}
      </div>

      {/* Secondary accounts */}
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2">
        {slots.map((acc, idx) => (
          <article
            key={idx}
            onClick={() => acc && onSelectAccount && onSelectAccount(acc)}
            className={`rounded-xl border border-white/10 bg-surface/90 p-4 text-sm transition-transform duration-200 hover:scale-105 hover:shadow-xl ${acc ? "cursor-pointer" : "opacity-80"}`}
          >
            {acc ? (
              <div>
                <div className="text-xs uppercase tracking-wide text-text-muted">{acc.name}</div>
                <p className="text-sm text-text-muted">{acc.iban}</p>
                <div className="mt-2 text-xl font-semibold">{formatBalance(acc.balance)} Ⓑ</div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-center">
                <div className="text-sm text-text-muted">Empty slot</div>
                <div className="mt-3 text-[12px] text-text-muted">Open a new account here.</div>
                <button
                  onClick={() => setModalInfo({ isPrimary: false })}
                  className="mt-4 rounded-full bg-primary px-3 py-1 text-xs text-white"
                >
                  Open
                </button>
              </div>
            )}
          </article>
        ))}
      </div>

      {/* Modal */}
      {modalInfo && (
        <NewAccountModal
          isPrimary={modalInfo.isPrimary}
          onClose={() => setModalInfo(null)}
          onCreated={() => fetchAccounts()} // refresh list after creation
        />
      )}
    </>
  );
}
