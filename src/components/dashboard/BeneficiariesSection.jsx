// src/components/dashboard/BeneficiariesSection.jsx
import React, { useState } from "react";

export default function BeneficiariesSection({
  className = "",
  beneficiaries,
  loading,
  error,
  onAddBeneficiary,
  onDeleteBeneficiary,
}) {
  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState("");
  const [eban, setEban] = useState("");
  const [submitting, setSubmitting] = useState(false);

  function openModal() {
    setName("");
    setEban("");
    setShowModal(true);
  }

  function closeModal() {
    setShowModal(false);
    setSubmitting(false);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const trimmedName = name.trim();
    const trimmedEban = eban.trim();
    if (!trimmedName || !trimmedEban) return;
    setSubmitting(true);
    try {
      if (onAddBeneficiary) {
        await onAddBeneficiary({ name: trimmedName, iban: trimmedEban });
      }
      closeModal();
    } catch (err) {
      // keep modal open; parent may show error
      setSubmitting(false);
    }
  }

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
          onClick={openModal}
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

        {/* Modal */}
        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div
              className="absolute inset-0 bg-black/50"
              onClick={closeModal}
            />

            <div className="relative w-full max-w-md rounded-xl bg-surface/95 p-6 shadow-lg">
              <h3 className="mb-3 text-lg font-semibold">Nouveau bénéficiaire</h3>
              <form onSubmit={handleSubmit}>
                <label className="mb-1 block text-sm font-medium">Nom</label>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="mb-3 w-full rounded-md border border-white/10 bg-transparent px-3 py-2 text-sm outline-none"
                  placeholder="Nom du bénéficiaire"
                  required
                />

                <label className="mb-1 block text-sm font-medium">EBAN</label>
                <input
                  value={eban}
                  onChange={(e) => setEban(e.target.value)}
                  className="mb-4 w-full rounded-md border border-white/10 bg-transparent px-3 py-2 text-sm outline-none"
                  placeholder="EBAN / IBAN"
                  required
                />

                <div className="flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={closeModal}
                    className="rounded-full border border-white/10 bg-gray-600/60 px-4 py-1 text-sm text-white"
                  >
                    Annuler
                  </button>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="rounded-full bg-primary px-4 py-1 text-sm font-medium text-white"
                  >
                    {submitting ? "Enregistrement..." : "Enregistrer"}
                  </button>
                </div>
              </form>
            </div>
          </div>
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
