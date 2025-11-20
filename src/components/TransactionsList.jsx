import React, { useEffect, useState } from "react";
import { getAccountTransactions } from "../api/transactions";

export default function TransactionsList({ iban }) {
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function load() {
            try {
                const data = await getAccountTransactions(iban);
                setTransactions(data);
            } catch (err) {
                console.error("Erreur chargement transactions :", err);
            } finally {
                setLoading(false);
            }
        }
        load();

    }, [iban]);

    if (loading) return <div className="text-text-muted">Chargement…</div>;

    if (transactions.length === 0)
        return <div className="text-text-muted">Aucune transaction trouvée.</div>;

    return (
        <div className="space-y-3">
            {transactions.map((t, index) => (
                <div
                    key={index}
                    className="flex items-center justify-between rounded-xl border border-white/10 bg-surface/80 p-3"
                >
                    <div>
                        <div className="font-semibold">{t.label}</div>
                        <div className="text-xs text-text-muted">{t.date}</div>
                    </div>

                    <div
                        className={`text-lg font-semibold ${t.type === "credit" ? "text-emerald-300" : "text-red-300"}`}
                    >
                        {t.type === "credit" ? "+" : "-"}
                        {Math.abs(t.amount).toLocaleString("fr-FR", {minimumFractionDigits: 2,})}{" "}Ⓑ
                    </div>
                </div>
            ))}
        </div>
    );
}
