// src/api/accounts.js
import { apiFetch } from "./client";
import { getToken } from "./user";

// Get all accounts for the current user
export async function getAccounts() {
  return apiFetch("/accounts", { method: "GET" });
}

//Create new account (primary or secondary)
export async function createAccount({ is_primary = false, name = null } = {}) {
  const payload = { is_primary, name };
  return apiFetch("/accounts", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

// Close account with an iban
export async function closeAccount(iban) {
  const token = getToken(); 
  const res = await fetch(`/accounts/${iban}`, {
    method: "DELETE",
    headers: {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    const text = await res.text();
    console.log("Réponse back lors de la suppression :", text);

    let detail = "Erreur lors de la suppression du compte.";
    try {
      const json = text ? JSON.parse(text) : {};
      detail = json.detail || detail;
    } catch (_) {}
    throw new Error(detail);
  }

  const text = await res.text();
  return text ? JSON.parse(text) : null;
}



