import React, { useState } from "react";

export default function LoginPage() {
  const [isSignUp, setIsSignUp] = useState(false);

  const toggleForm = () => setIsSignUp(!isSignUp);

  return (
    <div className="relative w-full max-w-4xl h-[500px] mx-auto mt-20 shadow-xl overflow-hidden rounded-xl">

      {/* Formulaire Sign In */}
      <div
        className={`absolute top-0 left-0 w-1/2 h-full bg-white p-10 flex flex-col justify-center items-center transition-transform duration-700 ${
          isSignUp ? "-translate-x-full opacity-0" : "translate-x-0 opacity-100"
        }`}
      >
        <h1 className="text-3xl font-bold mb-4">Sign In</h1>
        <input type="email" placeholder="Email" className="mb-4 p-2 border rounded w-full" />
        <input type="password" placeholder="Password" className="mb-4 p-2 border rounded w-full" />
        <button className="bg-blue-600 text-white px-6 py-2 rounded">Sign In</button>
      </div>

      {/* Formulaire Sign Up */}
      <div
        className={`absolute top-0 right-0 w-1/2 h-full bg-gray-100 p-10 flex flex-col justify-center items-center transition-transform duration-700 ${
          isSignUp ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"
        }`}
      >
        <h1 className="text-3xl font-bold mb-4">Sign Up</h1>
        <input type="text" placeholder="Name" className="mb-4 p-2 border rounded w-full" />
        <input type="email" placeholder="Email" className="mb-4 p-2 border rounded w-full" />
        <input type="password" placeholder="Password" className="mb-4 p-2 border rounded w-full" />
        <button className="bg-green-600 text-white px-6 py-2 rounded">Sign Up</button>
      </div>

      {/* Panneau bleu toggle */}
      <div
        className={`absolute top-0 left-1/2 w-1/2 h-full bg-blue-500 text-white flex flex-col justify-center items-center transition-transform duration-700 ${
          isSignUp ? "-translate-x-2/2" : "translate-x-0"
        }`}
      >
        <h1 className="text-3xl font-bold mb-4">
          {isSignUp ? "Welcome Back!" : "Hello, Friend!"}
        </h1>
        <p className="mb-6 text-center px-4">
          {isSignUp
            ? "Enter your personal details to sign in"
            : "Register with your personal details to sign up"}
        </p>
        <button
          className="border-2 border-white px-6 py-2 rounded hover:bg-white hover:text-blue-500 transition-colors"
          onClick={toggleForm}
        >
          {isSignUp ? "Sign In" : "Sign Up"}
        </button>
      </div>

    </div>
  );
}
