export default function AccountList({ accounts }) {
  return (
    <div>
      <h3 className="text-xl font-semibold text-gray-800 mb-4">
        Vos comptes bancaires
      </h3>

      <div className="space-y-4">
        {accounts.map((acc) => (
          <div
            key={acc.id}
            className="flex justify-between items-center p-4 bg-gray-50 border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition"
          >
            {/* INFO */}
            <div>
              <p className="font-semibold text-gray-800">
                Compte #{acc.id} – {acc.type}
              </p>
              <p className="text-green-600 font-bold text-lg">
                {acc.balance.toLocaleString()} €
              </p>
            </div>

            {/* BUTTON DETAIL */}
            <button
              className="px-4 py-2 bg-gray-800 text-white rounded-lg shadow hover:bg-black transition"
            >
              Voir détails →
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
