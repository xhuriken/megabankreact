// src/api/beneficiaries.js
// If your backend exposes beneficiaries endpoints, these will call them.
// Otherwise these functions will return an empty list or mirror local mock data.

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
    throw new Error(msg);
  }
  return data;
}

export async function getBeneficiaries() {
  // Try to call the backend if endpoint exists
  const token = getToken();
  if (!token) {
    // No token => return empty list (UI can show placeholder)
    return [];
  }

  try {
    const res = await fetch(`${API_BASE_URL}/beneficiaries`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
    });
    return handleResponse(res);
  } catch (err) {
    // If the endpoint doesn't exist or network error, fallback to empty list
    console.warn("getBeneficiaries failed:", err);
    return [];
  }
}

export async function addBeneficiary(payload) {
  const token = getToken();
  if (!token) throw new Error("Aucun token trouvé.");

  const res = await fetch(`${API_BASE_URL}/beneficiaries`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  });
  return handleResponse(res);
}
