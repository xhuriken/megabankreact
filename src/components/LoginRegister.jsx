import React, { useState } from "react";

export default function LoginRegister() {
  const [isSignUp, setIsSignUp] = useState(false);
  const toggleForm = () => setIsSignUp(!isSignUp);

  return (
    <div className="relative max-w-4xl w-full h-[520px] mx-auto mt-5">
      {/* Glow derrière */}
      <div className="pointer-events-none absolute inset-x-10 bottom-0 h-40 rounded-full bg-primary-dark/80 blur-3xl" />

      {/* Container principal */}
      <div className="relative w-full h-full overflow-hidden rounded-3xl border border-white/10 bg-surface/80 backdrop-blur-sm shadow-[0_25px_80px_rgba(0,0,0,0.9)]">
        
        {/* SIGN IN */}
        <div
          className={`absolute inset-y-0 left-0 w-1/2 p-10 flex flex-col justify-center transition-all duration-700 ${
            isSignUp
              ? "-translate-x-full opacity-0"
              : "translate-x-0 opacity-100"
          }`}
        >
          <h1 className="text-3xl font-semibold mb-6">Connexion</h1>

          <input
            type="email"
            placeholder="Adresse email"
            className="mb-4 w-full rounded-xl bg-surface/40 border border-white/10 p-3 text-sm text-text transition-all duration-300 focus:border-primary-soft outline-none "
          />
          <input
            type="password"
            placeholder="Mot de passe"
            className="mb-6 w-full rounded-xl bg-surface/40 border border-white/10 p-3 text-sm text-text transition-all duration-300 focus:border-primary-soft outline-none"
          />

          <button className="cursor-pointer rounded-xl bg-primary px-5 py-3 text-sm font-medium text-white shadow-[0_0_15px_rgba(110,84,188,0.7)] transition-transform duration-200 hover:-translate-y-0.5 hover:shadow-[0_0_35px_rgba(110,84,188,1)]">
            Se connecter
          </button>
        </div>

        {/* SIGN UP */}
        <div
          className={`absolute inset-y-0 right-0 w-1/2 p-10 flex flex-col justify-center transition-all duration-700 ${
            isSignUp
              ? "translate-x-0 opacity-100"
              : "translate-x-full opacity-0"
          }`}
        >
          <h1 className="text-3xl font-semibold mb-6">Créer un compte</h1>

          <input
            type="text"
            placeholder="Nom complet"
            className="mb-4 w-full rounded-xl bg-surface/40 border border-white/10 p-3 text-sm transition-all duration-300 text-text focus:border-primary-soft outline-none"
          />
          <input
            type="email"
            placeholder="Adresse email"
            className="mb-4 w-full rounded-xl bg-surface/40 border border-white/10 p-3 text-sm transition-all duration-300 text-text focus:border-primary-soft outline-none"
          />
          <input
            type="password"
            placeholder="Mot de passe"
            className="mb-6 w-full rounded-xl bg-surface/40 border border-white/10 p-3 text-sm transition-all duration-300 text-text focus:border-primary-soft outline-none"
          />

          <button className="cursor-pointer rounded-xl bg-secondary px-5 py-3 text-sm font-medium text-white shadow-[0_0_35px_rgba(110,84,188,0.7)] transition-transform duration-200 hover:-translate-y-0.5 hover:shadow-[0_0_55px_rgba(110,84,188,1)]">
            Créer un compte Bonk
          </button>
        </div>

        {/* PANNEAU TOGGLE */}
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
