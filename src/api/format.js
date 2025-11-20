// src/utils/format.js

// Small helper to format balance with french style
export function formatBalance(value) {
  const number = Number(value ?? 0);
  return number.toLocaleString("fr-FR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}
