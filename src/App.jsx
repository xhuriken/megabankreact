import "./App.css";
import Home from "./pages/Home";

// Background tuning
const BG_BLUR_CLASS = "blur-[2px]";     // this is the blur (change it too)
const BG_DARK_OVERLAY_CLASS = "bg-black/60"; //This is the brighness of the background (change it if it's ugly)

function App() {
  return (
    <div className="min-h-screen text-text">
      {/* background */}
      <div className="relative min-h-screen overflow-hidden bg-bg">
        {/* Background image */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <img
            src="/Background.png"
            alt="Mega Bank background"
            className={`h-full w-full object-cover ${BG_BLUR_CLASS}`}
          />
          {/* Dark overlay */}
          <div className={`absolute inset-0 ${BG_DARK_OVERLAY_CLASS}`} />
        </div>

        {/* Main content */}
        <div className="relative z-10 mx-auto flex min-h-screen max-w-6xl flex-col px-4 py-6 md:px-8 md:py-10">
          {/* navigation TODO: put it in component and upgrade style*/}
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

          {/* Page content */}
          <main className="flex-1">
            <Home />
          </main>

          {/* Footer TODO: put it in component and upgrade style */}
          <footer className="mt-10 border-t border-white/5 pt-4 text-[10px] text-text-muted md:text-xs">
            <p>© {new Date().getFullYear()} MEGA BANK. Tous droits réservés.</p>
          </footer>
        </div>
      </div>
    </div>
  );
}

export default App;
