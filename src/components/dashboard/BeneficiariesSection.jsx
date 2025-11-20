// src/components/dashboard/BeneficiariesSection.jsx
import React from "react";

export default function BeneficiariesSection({
  className = "",
  beneficiaries,
  loading,
  error,
  onAddBeneficiary,
  onDeleteBeneficiary,
}) {
  return (
    <div className={className}>
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold mb-1">Bénéficiaires</h2>
          <p className="text-sm text-text-muted">
            Personnes à qui vous pouvez envoyer des Bonk rapidement.
          </p>
        </div>
        <button
          onClick={onAddBeneficiary}
          className="rounded-full bg-primary px-3 py-1.5 text-sm font-medium text-white shadow-none transform transition-all duration-150 hover:scale-105 hover:shadow-[0_0_35px_rgba(110,84,188,0.7)] hover:brightness-100"
        >
          Ajouter
        </button>
      </div>

      {loading && (
        <p className="mt-3 text-sm text-text-muted">
          Loading beneficiaries...
        </p>
      )}

      {error && !loading && (
        <p className="mt-3 text-sm text-red-400">Error: {error}</p>
      )}

      {!loading && !error && (
        <div className="mt-4 grid gap-3 sm:grid-cols-3">
          {beneficiaries.map((b) => (
            <div
              key={b.id}
              className="flex items-center gap-3 rounded-xl border border-white/10 bg-surface/90 p-3 transform transition-transform duration-150 hover:scale-105"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/20 font-semibold text-primary">
                {b.name?.charAt(0) || "?"}
              </div>
              <div className="flex-1">
                <div className="font-semibold">{b.name}</div>
                <div className="text-xs text-text-muted break-all">
                  {b.iban}
                </div>
              </div>
              <div className="flex flex-col gap-1">
                <button className="cursor-pointer rounded-full border border-white/10 bg-primary/80 px-3 py-1 text-xs text-white transform transition-all duration-150 hover:scale-105 hover:shadow-[0_0_35px_rgba(110,84,188,0.7)] hover:brightness-100">
                  Envoyer
                </button>
                <button
                  onClick={() => onDeleteBeneficiary && onDeleteBeneficiary(b.id)}
                  className="cursor-pointer rounded-full border border-white/10 bg-red-700/80 px-3 py-1 text-[10px] text-white"
                >
                  Supprimer
                </button>
              </div>
            </div>
          ))}

          {beneficiaries.length === 0 && (
            <p className="text-sm text-text-muted">
              Aucun bénéficiaire pour le moment.
            </p>
          )}
        </div>
      )}
    </div>
  );
}
