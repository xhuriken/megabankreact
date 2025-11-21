import React, { useState } from "react";
import { depositMoney } from "../../api/transactions";

export default function DepositModal({ iban, onClose }) {
    const [amount, setAmount] = useState("");
    const [loading, setLoading] = useState(false);

    async function handleSubmit(e) {
        e.preventDefault();
        const trimmed = amount.trim();
        if (!trimmed) return alert("L'amount ne peut pas être vide.");

        try {
            setLoading(true);
            await depositMoney({ iban , amount });
            onClose();
        } catch (err) {
            console.error("Erreur dépot d'argent : ", err);
            alert("Impossible de déposer de l'argent. Vérifie la console.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <div className="bg-surface p-6 rounded-2xl w-full max-w-sm shadow-lg">
                <h2 className="text-lg font-semibold mb-4">
                    Déposer des Bonks
                </h2>
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <input
                        type="number"
                        placeholder="Combiens ?"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
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
                            {loading ? "Dépot..." : "Déposé"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
