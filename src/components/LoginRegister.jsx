// src/components/LoginRegister.jsx
import React, { useState, useEffect } from "react";
import { registerUser, loginUser } from "../api/auth";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";


export default function LoginRegister({ initialIsSignUp = false }) {
  const [isSignUp, setIsSignUp] = useState(false);
  const navigate = useNavigate();
  const {login } = useAuth(); //for update the global const isConnected

  //Login Input
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  // Sign up Input
  const [signUpFirstName, setSignUpFirstName] = useState("");
  const [signUpLastName, setSignUpLastName] = useState("");
  const [signUpEmail, setSignUpEmail] = useState("");
  const [signUpPassword, setSignUpPassword] = useState("");

  // Var for feedback of pastapi
  const [loading, setLoading] = useState(false);
  const [info, setInfo] = useState("");

  const [loginError, setLoginError] = useState("");
  const [signUpError, setSignUpError] = useState("");

  // Check if email error exists for sign up or login
  const emailExists = signUpError.toLowerCase().includes("email");
  const loginEmailInvalid =
    loginError.toLowerCase().includes("email") ||
    loginError === "Invalid credentials";
  
  const toggleForm = () => {
    setLoginError("");
    setSignUpError("");
    setInfo("");
    setIsSignUp((prev) => !prev);
  };

  useEffect(() => {
    // Parent choose if we show sign up or login first.
    setIsSignUp(initialIsSignUp);
  }, [initialIsSignUp]);

  // Handle login submit
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoginError("");
    setSignUpError("");
    setInfo("");
    setLoading(true);

    try {
      const data = await loginUser({
        email: loginEmail,
        password: loginPassword,
      });

      setInfo("Login successful.");
      login();
      navigate("/dashboard");

    } catch (err) {
      if (err.message === "Invalid credentials") {
        setLoginError("Email introuvable");
      } else {
        setLoginError(err.message || "Login failed.");
      }
    } finally {
      setLoading(false);
    }
  };

  // Handle sign up submit
  const handleSignUp = async (e) => {
    e.preventDefault();
    setLoginError("");
    setSignUpError("");
    setInfo("");

    //Checking fields
    if (!signUpFirstName.trim() || !signUpLastName.trim() || !signUpEmail.trim() || !signUpPassword.trim()) {
      setSignUpError("Tous les champs sont obligatoires");
      return;
    }

    setLoading(true);

    try {
      const data = await registerUser({
        firstName: signUpFirstName,
        lastName: signUpLastName,
        email: signUpEmail,
        password: signUpPassword,
      });

      setInfo(`Account created for ${data.user?.email}.`);
      login();
      navigate("/dashboard");

    } catch (err) {
      setSignUpError(err.message || "Registration failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative max-w-4xl w-full h-[520px] mx-auto mt-5">
      {/* Glow */}
      <div className="pointer-events-none absolute inset-x-10 bottom-0 h-40 rounded-full bg-primary-dark/80 blur-3xl" />

      {/* Main container */}
      <div className="relative w-full h-full overflow-hidden rounded-3xl border border-white/10 bg-surface/80 backdrop-blur-sm shadow-[0_25px_80px_rgba(0,0,0,0.9)]">

        {/* SIGN IN */}
        <div
          className={`absolute inset-y-0 left-0 w-1/2 p-10 flex flex-col justify-center transition-all duration-700 ${
            isSignUp ? "-translate-x-full opacity-0" : "translate-x-0 opacity-100"
          }`}
        >
          <h1 className="text-3xl font-semibold mb-6">Connexion</h1>

          {!isSignUp && (info || loginError || loading) && (
            <div className="mb-4 text-sm">
              {loading && <p className="text-text-muted">Processing request...</p>}
              {info && !loading && <p className="text-emerald-300">{info}</p>}
              {loginError && !loading && <p className="text-red-400">{loginError}</p>}
            </div>
          )}

          <form onSubmit={handleLogin} className="flex flex-col">
            <input
              type="email"
              placeholder={loginEmailInvalid ? "Email introuvable" : "Adresse email"}
              value={loginEmail}
              onChange={(e) => {
                setLoginEmail(e.target.value);
                setLoginError("");
              }}
              className={`
                mb-4 w-full rounded-xl p-3 text-sm transition-all duration-300 outline-none
                ${
                  loginEmailInvalid
                    ? "border-red-500 text-red-400 placeholder-red-400 bg-red-500/10"
                    : "border border-white/10 text-text focus:border-primary-soft"
                }
              `}
            
            />

            <input
              type="password"
              placeholder="Mot de passe"
              value={loginPassword}
              onChange={(e) => setLoginPassword(e.target.value)}
              className="mb-6 w-full rounded-xl bg-surface/40 border border-white/10 p-3 text-sm text-text transition-all duration-300 focus:border-primary-soft outline-none"
            />

            <button
              type="submit"
              disabled={loading}
              className="cursor-pointer rounded-xl bg-primary px-5 py-3 text-sm font-medium text-white shadow-[0_0_15px_rgba(110,84,188,0.7)] transition-transform duration-200 hover:-translate-y-0.5 hover:shadow-[0_0_35px_rgba(110,84,188,1)] disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? "Connexion..." : "Se connecter"}
            </button>
          </form>
        </div>

        {/* SIGN UP */}
        <div
          className={`absolute inset-y-0 right-0 w-1/2 p-10 flex flex-col justify-center transition-all duration-700 ${
            isSignUp ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"
          }`}
        >
          <h1 className="text-3xl font-semibold mb-6">Créer un compte</h1>

          {isSignUp && (info || signUpError || loading) && (
            <div className="mb-4 text-sm">
              {loading && <p className="text-text-muted">Processing request...</p>}
              {info && !loading && <p className="text-emerald-300">{info}</p>}
              {signUpError && !loading && <p className="text-red-400">{signUpError}</p>}
            </div>
          )}

          <form onSubmit={handleSignUp} className="flex flex-col">
            <div className="flex gap-3 mb-4">
              <input
                type="text"
                placeholder="Prénom"
                value={signUpFirstName}
                onChange={(e) => setSignUpFirstName(e.target.value)}
                className="w-1/2 rounded-xl bg-surface/40 border border-white/10 p-3 text-sm transition-all duration-300 text-text focus:border-primary-soft outline-none"
              />
              <input
                type="text"
                placeholder="Nom"
                value={signUpLastName}
                onChange={(e) => setSignUpLastName(e.target.value)}
                className="w-1/2 rounded-xl bg-surface/40 border border-white/10 p-3 text-sm transition-all duration-300 text-text focus:border-primary-soft outline-none"
              />
            </div>

            <input
              type="email"
              placeholder={emailExists ? "Email déjà utilisé" : "Adresse email"}
              value={signUpEmail}
              onChange={(e) => {
                setSignUpEmail(e.target.value);
                setSignUpError(""); // reset error dès que l'utilisateur modifie l'email
              }}
              className={`
                mb-4 w-full rounded-xl bg-surface/40 p-3 text-sm transition-all duration-300 outline-none
                ${
                  emailExists
                    ? "border-red-500 text-red-400 placeholder-red-400 bg-red-500/10"
                    : "border border-white/10 text-text focus:border-primary-soft"
                }
              `}
            />

            <input
              type="password"
              placeholder="Mot de passe"
              value={signUpPassword}
              onChange={(e) => setSignUpPassword(e.target.value)}
              className="mb-6 w-full rounded-xl bg-surface/40 border border-white/10 p-3 text-sm transition-all duration-300 text-text focus:border-primary-soft outline-none"
            />

            <button
              type="submit"
              disabled={loading}
              className="cursor-pointer rounded-xl bg-secondary px-5 py-3 text-sm font-medium text-white shadow-[0_0_15px_rgba(110,84,188,0.7)] transition-transform duration-200 hover:-translate-y-0.5 hover:shadow-[0_0_55px_rgba(110,84,188,1)] disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? "Création..." : "Créer un compte Bonk"}
            </button>
          </form>
        </div>

        {/* PANEL TOGGLE */}
        <div
          className={`
            absolute inset-y-0 left-1/2 w-1/2 
            bg-gradient-to-b from-primary-dark via-primary to-secondary
            text-white flex flex-col justify-center items-center
            transition-transform duration-700 shadow-[0_0_35px_rgba(110,84,188,0.8)]
            ${isSignUp ? "-translate-x-full" : "translate-x-0"}
          `}
        >
          <h1 className="text-2xl font-semibold mb-3 tracking-[0.15em] uppercase">
            {isSignUp ? "Déjà membre ?" : "Nouveau chez nous?"}
          </h1>

          <p className="text-md text-white/80 max-w-xs text-center mb-6">
            {isSignUp
              ? "Connecte-toi pour accéder à tes comptes Bonk."
              : "Crée ton compte pour rejoindre la banque du futur."}
          </p>

          <button
            onClick={toggleForm}
            className="cursor-pointer rounded-xl border border-white/30 bg-black/20 px-5 py-2.5 text-sm font-medium text-white backdrop-blur-sm transition hover:bg-white hover:text-primary"
          >
            {isSignUp ? "Se connecter" : "Créer un compte"}
          </button>
        </div>
      </div>
    </div>
  );
}
