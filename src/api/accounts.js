// src/api/accounts.js
import { apiFetch } from "./client";

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
  return apiFetch(`/accounts/${iban}`, {
    method: "DELETE",
  });
}
