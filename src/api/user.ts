// api/user.ts (par exemple)
export async function fetchCurrentUser(baseUrl: string): Promise<any> {
  // This calls /users/me with the stored access token.
  // We use it in frontend components to know who is logged in.
  const token = localStorage.getItem("access_token");
  if (!token) {
    throw new Error("No access token found");
  }

  const res = await fetch(`${baseUrl}/users/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch /users/me: ${res.status}`);
  }

  return res.json(); // { uuid, email, first_name, last_name }
}
