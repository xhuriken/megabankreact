import "./App.css";
import Home from "./pages/Home";
import Auth from "./pages/Auth";
import Footer from "./components/Footer";
import NavBar from "./components/NavBar";

import { BrowserRouter, Routes, Route } from "react-router-dom";

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
        <div className="relative z-10 mx-auto flex min-h-screen max-w-6xl flex-col px-4 py-3 md:px-8 md:py-6">
          {/* nav*/}
          <NavBar />

          {/* Page content */}
          <main className="flex-1">
            <Routes>
              {/* Default*/}
              <Route path="/" element={<Home />} />

              {/* Auth */}
              <Route path="/auth" element={<Auth />} />
            </Routes>
          </main>
          {/* Footer*/}
          <Footer />
        </div>
      </div>
    </div>
  );
}

export default App;
