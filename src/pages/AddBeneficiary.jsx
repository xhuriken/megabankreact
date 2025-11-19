import React, { useState } from "react";

export default function AddBeneficiary({ onBack, onAdd }) {
  const [name, setName] = useState("");
  const [note, setNote] = useState("");
  const [handle, setHandle] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    if (!name.trim() || !handle.trim()) return;
    const newBeneficiary = { id: `b-${Date.now()}`, name: name.trim(), note: note.trim(), handle: handle.trim() };
    onAdd?.(newBeneficiary);
  }

  return (
    <section className="mx-auto max-w-4xl">
      <button onClick={onBack} className="mb-4 rounded-full border border-white/10 px-4 py-2 text-sm text-text-muted hover:text-text">
        ← Retour
      </button>

      <div className="rounded-2xl border border-white/10 bg-surface/90 p-6">
        <h1 className="text-2xl font-semibold mb-3">Ajouter un bénéficiaire</h1>
        <p className="text-sm text-text-muted mb-4">Ajoutez une personne à qui vous pourrez envoyer des Bonk rapidement.</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-sm">Nom complet</label>
            <input value={name} onChange={(e) => setName(e.target.value)} className="mt-1 w-full rounded-md bg-surface/40 border border-white/10 p-3 text-sm outline-none" />
          </div>

          <div>
            <label className="text-sm">Note (ex: Ami, Coloc)</label>
            <input value={note} onChange={(e) => setNote(e.target.value)} className="mt-1 w-full rounded-md bg-surface/40 border border-white/10 p-3 text-sm outline-none" />
          </div>

          <div>
            <label className="text-sm">Identifiant / pseudo</label>
            <input value={handle} onChange={(e) => setHandle(e.target.value)} className="mt-1 w-full rounded-md bg-surface/40 border border-white/10 p-3 text-sm outline-none" />
          </div>

          <div className="flex gap-3">
            <button type="submit" className="rounded-xl bg-primary px-4 py-2 text-sm text-white">Ajouter</button>
            <button type="button" onClick={onBack} className="rounded-xl border border-white/10 px-4 py-2 text-sm text-text-muted">Annuler</button>
          </div>
        </form>
      </div>
    </section>
  );
}
