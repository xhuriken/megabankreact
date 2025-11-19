import React, { useState } from "react";

export default function LoginPage() {

    return (
        <header className="mb-10 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-sm font-bold shadow-[0_0_25px_rgba(110,84,188,0.8)]">
                M
              </div>
              <div className="flex flex-col leading-tight">
                <span className="text-xs font-semibold tracking-[0.2em] uppercase text-text-muted">
                  Mega Bank
                </span>
                <span className="text-sm text-text-muted">Banque en ligne</span>
              </div>
            </div>

            <nav className="flex items-center gap-4 text-xs md:text-sm">
              <button className="cursor-pointer text-text-muted transition-colors hover:text-text">
                Sécurité
              </button>
              <button className="cursor-pointer text-text-muted transition-colors hover:text-text">
                Tarifs
              </button>
              <button className="cursor-pointer rounded-full border border-white/10 px-3 py-1.5 text-xs font-medium text-text-muted backdrop-blur-sm transition-colors hover:border-primary-soft hover:text-text">
                Connexion
              </button>
            </nav>
        </header>
    );

}