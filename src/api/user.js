// src/api/user.js

const API_BASE_URL = "http://127.0.0.1:8000";

/**
 * Fonctiot to get current user info from the API using stored token.
 */
export async function getCurrentUser() {
  const accessToken = localStorage.getItem("accessToken");
  console.log("accessToken:", accessToken);
  const token = accessToken;

  if (!token) {
    throw new Error("Aucun token trouvé. Utilisateur non connecté.");
  }

  const res = await fetch(`${API_BASE_URL}/users/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    if (res.status === 401) {
      localStorage.removeItem("accessToken");
      throw new Error("Session expirée. Veuillez vous reconnecter.");
    }
    throw new Error("Erreur lors de la récupération des données utilisateur");
  }

  return res.json();
}
