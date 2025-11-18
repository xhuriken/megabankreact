import React from "react";

export default function HistoryList({ history }) {
  return (
    <div>
      <h3 className="text-xl font-semibold text-gray-800 mb-4">
        Historique des transactions
      </h3>

      <div className="space-y-3">
        {history.map((item) => (
          <div
            key={item.id}
            className="flex justify-between items-center bg-gray-50 border rounded-lg p-4 shadow-sm hover:shadow-md transition"
          >
            <div>
              <p className="font-medium text-gray-800">{item.label}</p>
              <p className="text-sm text-gray-500">{item.date}</p>
            </div>

            <p
              className={`text-lg font-semibold ${
                item.amount < 0 ? "text-red-600" : "text-green-600"
              }`}
            >
              {item.amount > 0 ? "+" : ""}
              {item.amount.toFixed(2)} €
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
