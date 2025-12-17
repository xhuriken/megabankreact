// src/api/auth.js

const API_URL = "http://localhost:8000"; //fast api

// Fetch helper !
async function apiFetch(path, options = {}) {
  const response = await fetch(`${API_URL}${path}`, {
    // We spread options so we can pass method, body, vars
    ...options,
    headers: {
      // This header tells the server we sending json
      // we spread header too (always put app/json, but custom header if the user put it too)
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
  });

  // Trying to parse json
  const data = await response.json().catch(() => null);

  // If status is not 2xx, we throw an error
  if (!response.ok) {
    // error msg
    const message =
                    data?.detail ||
                    data?.message ||
                    `Request failed : ${response.status}`;

    const error = new Error(message);
    error.status = response.status;
    error.data = data;
    throw error;
  }

  return data;
}//gpt

// Call /auth/register from fast api
// Send new user, and get generated token
export async function registerUser({ firstName, lastName, email, password }) {
  const payload = {
    // CORRESPONDS Au model UserCreate pydantic sur l'autre projet
    first_name: firstName,
    last_name: lastName,
    email,
    password,
  };

  const data = await apiFetch("/auth/register", {
    method: "POST",
    body: JSON.stringify(payload),
  });

  // Stock token in local Storage
  //Do we need to change it later ?

  if (data.access_token) {
    console.log("on set le token via le register :" , data.access_token)
    localStorage.setItem("accessToken", data.access_token);
  }

  return data; // { message, user, access_token, token_type }
}

// Its the same !
// Call /auth/login to get a token for an existing user from fast api
export async function loginUser({ email, password }) {
  const payload = { email, password };

  const data = await apiFetch("/auth/login", {
    method: "POST",
    body: JSON.stringify(payload),
  });

  if (data.access_token) {
    console.log("on set le  token via loginUser:", data.access_token)
    localStorage.setItem("accessToken", data.access_token);
  }

  return data; // { access_token, token_type }
}
