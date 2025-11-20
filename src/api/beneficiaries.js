// src/api/beneficiaries.js
import { apiFetch } from "./client";

// Get all beneficiaries for current user
export async function getBeneficiaries() {
  return apiFetch("/beneficiaries", {
    method: "GET",
  });
}

// Create one beneficiary
export async function createBeneficiary({ name, iban }) {
  const payload = { name, iban };
  return apiFetch("/beneficiaries", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

// Delete one beneficiary
export async function deleteBeneficiary(id) {
  return apiFetch(`/beneficiaries/${id}`, {
    method: "DELETE",
  });
}
