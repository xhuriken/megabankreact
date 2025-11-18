import "./App.css";
import Home from "./pages/Home";

// Background tuning
const BG_BLUR_CLASS = "blur-[2px]";     // Change blur here (e.g. 'blur-none', 'blur-sm', 'blur-md')
const BG_DARK_OVERLAY_CLASS = "bg-black/60"; // Change darkness here (e.g. 'bg-black/40', 'bg-black/80')

function App() {
  return (
    <div className="min-h-screen text-text">
      {/* Root background wrapper */}
      <div className="relative min-h-screen overflow-hidden bg-bg">
        {/* Background image layer */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <img
            src="/Background.png"
            alt="Mega Bank background"
            className={`h-full w-full object-cover ${BG_BLUR_CLASS}`}
          />
          {/* Dark overlay on top of the image */}
          <div className={`absolute inset-0 ${BG_DARK_OVERLAY_CLASS}`} />
        </div>

        {/* Main content container */}
        <div className="relative z-10 mx-auto flex min-h-screen max-w-6xl flex-col px-4 py-6 md:px-8 md:py-10">
          {/* Top navigation */}
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

          {/* Footer */}
          <footer className="mt-10 border-t border-white/5 pt-4 text-[10px] text-text-muted md:text-xs">
            <p>© {new Date().getFullYear()} MEGA BANK. Tous droits réservés.</p>
          </footer>
        </div>
      </div>
    </div>
  );
}

export default App;
