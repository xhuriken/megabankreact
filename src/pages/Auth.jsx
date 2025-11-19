import React, { useEffect, useState } from "react";
import LoginRegister from "../components/LoginRegister";


export default function Auth() {
  // Simple state pour stocker la réponse de l'API
  // This lets us render something from the server response.
  const [apiUser, setApiUser] = useState(null);

  useEffect(() => {
    // We run this once when the component mounts.
    // This is where we call our FastAPI backend.
    const registerHardcodedUser = async () => {
      try {
        // Hardcoded user payload we send to /auth/register
        // This must match the FastAPI schema: UserCreate.
        const body = {
          email: "caca@example.com",
          password: "SuperSecret123!",
          first_name: "Test",
          last_name: "User",
        };

        // Basic fetch POST request
        // fetch is built into the browser, no extra library needed.
        const response = await fetch("http://127.0.0.1:8000/auth/register", {
          method: "POST", // We use POST because we create a new user.
          headers: {
            // This tells the server we are sending JSON.
            "Content-Type": "application/json",
          },
          // We must stringify the body so the server can read it as JSON.
          body: JSON.stringify(body),
        });

        // If status is not in the 200–299 range, we throw an error.
        // This is important to catch 400 or 500 responses cleanly.
        if (!response.ok) {
          const errorData = await response.json().catch(() => null);
          console.error("Register failed:", response.status, errorData);
          return;
        }

        // Parse the JSON response from FastAPI.
        // This gives us the object returned by your /auth/register route.
        const data = await response.json();
        console.log("Register success, API response:", data);

        // Save part of the response in state so we can display it in JSX.
        setApiUser(data.user ?? null);
      } catch (err) {
        // This catches network errors (server down, CORS issues, etc.)
        console.error("Network or fetch error:", err);
      }
    };

    registerHardcodedUser();
  }, []); // Empty dependency array = run only once on first render.


  return (
    <section className="flex min-h-[calc(75vh)] items-center justify-center flex-col gap-10 md:items-center">
        {/* Head */}
          <h1 className="text-3xl font-semibold leading-tight md:text-4xl">
            <span className="bg-gradient-to-r from-primary-soft via-primary to-secondary bg-clip-text text-transparent">
              REJOINS LE GAME
            </span>
          </h1>
      
      <LoginRegister />

    </section>
  );
}
