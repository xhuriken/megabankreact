// src/api/transactions.js
// Client helper for transaction endpoints

const API_BASE_URL = "http://127.0.0.1:8000";

function getToken() {
  const accessToken = localStorage.getItem("accessToken");
  return accessToken;
}

async function handleResponse(res) {
  const data = await res.json().catch(() => null);
  if (!res.ok) {
    if (res.status === 401) {
      localStorage.removeItem("accessToken");
      throw new Error("Session expirée. Veuillez vous reconnecter.");
    }
    const msg = data?.detail || data?.message || `Request failed: ${res.status}`;
    const err = new Error(msg);
    err.status = res.status;
    err.data = data;
    throw err;
  }
  return data;
}

/**
 * Transfer money from one account to another
 * @param {string} sourceIban - source account IBAN
 * @param {string} targetIban - target account IBAN
 * @param {number} amount - amount to transfer
 */
export async function transferMoney(sourceIban, targetIban, amount) {
  const token = getToken();
  if (!token) throw new Error("Aucun token trouvé.");

  const res = await fetch(`${API_BASE_URL}/transactions`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    },
    body: JSON.stringify({
      source_iban: sourceIban,
      target_iban: targetIban,
      amount: Number(amount),
    }),
  });
  return handleResponse(res);
}
