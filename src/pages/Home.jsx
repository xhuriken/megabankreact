import React from "react";

export default function Home() {
  return (
    <section className="flex flex-col gap-10 md:flex-row md:items-center">
      {/* Left column: hero and feature bullets */}
      <div className="flex-1 space-y-7">

        {/* Head */}
        <div className="space-y-3">
          <h1 className="text-3xl font-semibold leading-tight md:text-4xl">
            Level up ton argent
            <br />
            <span className="bg-gradient-to-r from-primary-soft via-primary to-secondary bg-clip-text text-transparent">
              en stockant tes Bonk
            </span>
          </h1>

          {/* Description*/}
          <p className="max-w-xl text-sm text-text-muted md:text-base">
            Chez MEGA BANK, tu ne stockes pas des euros mais des Bonk :
            <br />
            <strong>1 Ⓑ</strong> (Bonk) = 100 minibonk (les centimes),
            <strong> 1&nbsp;000 Ⓑ = 1 Mega Bonk</strong> (MⒷ). Tu peux voir
            ton solde en Bonk, déplacer tes Bonk entre comptes et suivre chaque
            minibonk dépensé.
          </p>
        </div>

        {/* Buttons */}
        <div className="flex flex-wrap gap-3 pt-1">
          <button className="cursor-pointer rounded-xl bg-primary px-5 py-2.5 text-sm font-medium text-white shadow-[0_0_35px_rgba(110,84,188,0.7)] transition-transform duration-200 hover:-translate-y-0.5 hover:shadow-[0_0_55px_rgba(110,84,188,1)]">
            Ouvrir un compte Bonk
          </button>
          <button className="cursor-pointer rounded-xl border border-white/15 bg-surface/70 px-5 py-2.5 text-sm font-medium text-text-muted backdrop-blur-sm transition-colors hover:border-primary-soft hover:text-text">
            Déjà client ? Se connecter
          </button>
        </div>

        {/* Feature list */}
        <div className="flex flex-col gap-4 pt-4 text-xs text-text-muted">
          <div className="flex gap-3">
            <div className="mt-1 h-6 w-6 shrink-0 rounded-full bg-primary/30 ring-1 ring-primary-soft/60" />
            <div>
              <div className="text-[11px] font-semibold uppercase tracking-wide text-text">
                Jusqu&apos;à 5 comptes Bonk
              </div>
              <p>
                Crée jusqu&apos;à cinq comptes pour séparer ton quotidien, ta
                réserve de Mega Bonk et tes projets.
              </p>
            </div>
          </div>

          <div className="flex gap-3">
            <div className="mt-1 h-6 w-6 shrink-0 rounded-full bg-secondary/40 ring-1 ring-secondary/70" />
            <div>
              <div className="text-[11px] font-semibold uppercase tracking-wide text-text">
                Virements instantanés
              </div>
              <p>
                Ajoute un bénéficiaire une fois, envoie tes Bonk en quelques
                secondes entre comptes ou vers tes proches.
              </p>
            </div>
          </div>

          <div className="flex gap-3">
            <div className="mt-1 h-6 w-6 shrink-0 rounded-full bg-accent/30 ring-1 ring-accent/70" />
            <div>
              <div className="text-[11px] font-semibold uppercase tracking-wide text-text">
                Liste de transactions claire
              </div>
              <p>
                Chaque mouvement de Bonk s&apos;affiche dans une liste simple,
                avec le montant, le compte et la catégorie.
              </p>
            </div>
          </div>

          <div className="flex gap-3">
            <div className="mt-1 h-6 w-6 shrink-0 rounded-full bg-primary-dark/50 ring-1 ring-primary-soft/60" />
            <div>
              <div className="text-[11px] font-semibold uppercase tracking-wide text-text">
                Vue globale en temps réel
              </div>
              <p>
                Consulte en un coup d&apos;œil ton total de Bonk, tes Mega Bonk
                et tes dernières opérations.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Right : PREVIEW */}
      <div className="relative flex-1">
        {/* Glow behind */}
        <div className="pointer-events-none absolute inset-x-6 bottom-0 h-40 rounded-full bg-primary-dark/80 blur-3xl" />

        <div className="group relative rounded-3xl border border-white/10 bg-surface/90 p-4 shadow-[0_25px_80px_rgba(0,0,0,0.9)] backdrop-blur-sm transition-transform duration-300 hover:-translate-y-1">
          {/* Top label */}
          <div className="mb-4 flex items-center justify-between rounded-full bg-gradient-to-r from-primary-dark via-primary to-secondary px-4 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-text shadow-[0_0_25px_rgba(110,84,188,0.9)]">
            <span>Aperçu du compte</span>
            <span className="text-[9px] text-text">
              Ceci est une preview
            </span>
          </div>

          {/* Inner content */}
          <div className="space-y-4">
            {/* Balance block */}
            <div className="rounded-2xl bg-gradient-to-b from-primary-dark via-primary to-secondary px-5 py-4 text-sm text-white shadow-[0_0_35px_rgba(110,84,188,0.8)]">
              <div className="flex items-center justify-between text-[11px] text-white/80">
                <span>Compte principal Bonk</span>
                <span className="rounded-full bg-black/30 px-2 py-0.5 text-[10px]">
                  Jusqu&apos;à 5 comptes
                </span>
              </div>
              <div className="mt-2 flex items-end justify-between">
                <div>
                  <div className="text-xs text-white/70">Solde actuel</div>
                  <div className="text-2xl font-semibold">
                    4&nbsp;280,50 Ⓑ
                  </div>
                </div>
                <div className="text-right text-[11px]">
                  <div className="text-emerald-200">+ 320,00 Ⓑ</div>
                  <div className="text-white/70">ce mois-ci</div>
                </div>
              </div>
            </div>

            {/* Transfers and beneficiaries row */}
            <div className="flex gap-3 text-[11px]">
              <div className="flex-1 rounded-xl border border-white/10 bg-surface/90 px-3 py-2.5 shadow-[0_10px_30px_rgba(0,0,0,0.6)] transition duration-200 group-hover:border-primary-soft/80">
                <div className="mb-1 flex items-center justify-between">
                  <span className="font-semibold text-text">
                    Virement rapide
                  </span>
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                </div>
                <p className="text-[10px] text-text-muted">
                  Derniers : Épargne, Loyer, Ami.
                </p>
              </div>

              <div className="flex-1 rounded-xl border border-white/10 bg-surface/90 px-3 py-2.5 shadow-[0_10px_30px_rgba(0,0,0,0.6)] transition duration-200 group-hover:border-primary-soft/80">
                <div className="mb-1 flex items-center justify-between">
                  <span className="font-semibold text-text">
                    Bénéficiaires
                  </span>
                  <span className="rounded-full bg-primary/30 px-2 py-0.5 text-[9px]">
                    + Ajouter
                  </span>
                </div>
                <p className="text-[10px] text-text-muted">
                  Enregistre les comptes de confiance pour envoyer des Bonk plus
                  vite.
                </p>
              </div>
            </div>

            {/* Mini transaction list */}
            <div className="mt-2 rounded-2xl border border-white/10 bg-surface/95 p-3 text-[11px]">
              <div className="mb-2 flex items-center justify-between text-[10px] uppercase tracking-wide text-text-muted">
                <span>Dernières transactions</span>
                <button className="cursor-pointer text-[10px] text-primary-soft transition-colors hover:text-primary">
                  Voir tout
                </button>
              </div>
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-text">Courses</span>
                  <span className="text-text-muted">- 54,20 Ⓑ</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-text">Salaire</span>
                  <span className="text-emerald-300">+ 2&nbsp;100,00 Ⓑ</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-text">Virement vers Épargne</span>
                  <span className="text-text-muted">- 150,00 Ⓑ</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
