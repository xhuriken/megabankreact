// src/api/accounts.js
// Client helper for accounts endpoints
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

export async function getAccounts() {
  const token = getToken();
  if (!token) throw new Error("Aucun token trouvé.");

  const res = await fetch(`${API_BASE_URL}/accounts`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    },
  });
  return handleResponse(res);
}

export async function getAccount(iban) {
  const token = getToken();
  if (!token) throw new Error("Aucun token trouvé.");

  const res = await fetch(`${API_BASE_URL}/accounts/${encodeURIComponent(iban)}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    },
  });
  return handleResponse(res);
}

export async function createAccount(payload) {
  const token = getToken();
  if (!token) throw new Error("Aucun token trouvé.");

  const res = await fetch(`${API_BASE_URL}/accounts`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  });
  return handleResponse(res);
}
