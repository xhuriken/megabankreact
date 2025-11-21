// src/api/transactions.js
import { apiFetch } from "./client";

// Send money between 2 IBAN
export async function transferMoney(sourceIban, targetIban, amount, label = null) {
  const payload = {
    source_iban: sourceIban,
    target_iban: targetIban,
    amount,
    label,
  };

  return apiFetch("/transactions", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}
export async function depositMoney({iban, amount}) {
  const payload = {
    iban: iban,
    amount: amount,
  };
  return apiFetch(`/deposits/${iban}`, {
    method: "POST",
    body: JSON.stringify(payload)
  });
}

// Get all transactions for one account (by IBAN)
export async function getAccountTransactions(iban) {
  return apiFetch(`/transactions/account/${iban}`, {
    method: "GET",
  });
}
