import React, { useState } from "react";
import { createAccount } from "../../api/accounts";

export default function NewAccountModal({ isPrimary, onClose, onCreated }) {
    const [name, setName] = useState("");
    const [loading, setLoading] = useState(false);

    async function handleSubmit(e) {
        e.preventDefault();
        const trimmed = name.trim();
        if (!trimmed) return alert("Le nom du compte ne peut pas être vide.");

        try {
            setLoading(true);
            await createAccount({ is_primary: !!isPrimary, name: trimmed });
            if (onCreated) onCreated(); // notify parent
            onClose();
        } catch (err) {
            console.error("Erreur création compte :", err);
            alert("Impossible de créer le compte. Vérifie la console.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <div className="bg-surface p-6 rounded-2xl w-full max-w-sm shadow-lg">
                <h2 className="text-lg font-semibold mb-4">
                    {isPrimary ? "Ouvrir compte principal" : "Ouvrir compte secondaire"}
                </h2>
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <input
                        type="text"
                        placeholder="Nom du compte"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="border border-white/20 rounded px-3 py-2 bg-surface text-text focus:outline-none"
                        autoFocus
                    />
                    <div className="flex justify-end gap-2">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 rounded bg-gray-600 text-white hover:bg-gray-700"
                            disabled={loading}
                        >
                            Annuler
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 rounded bg-primary text-white hover:bg-purple-700 disabled:opacity-60"
                            disabled={loading}
                        >
                            {loading ? "Création..." : "Créer"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
