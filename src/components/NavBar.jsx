import React, { useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";

export default function LoginPage() {

    const {isConnected, logout} = useAuth();

  const navigate = useNavigate();
  //navigate and give isSignUp to auth page 
  const goToAuth = (isSignUp) => {
    navigate("/auth", {
      state: { isSignUp }, 
    });
  };


  const Logout = () => {
    // Delete the token from the local storage
    localStorage.removeItem("accessToken");
    
    logout();

    //Go to home !
    navigate("/");
  };

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

          {isConnected ? (
            <nav className="flex items-center gap-4 text-xs md:text-sm">
              <button onClick={Logout} className="cursor-pointer rounded-full border border-white/10 px-3 py-1.5 text-xs font-medium text-text-muted backdrop-blur-sm transition-colors hover:border-primary-soft hover:text-text">
                Déconnexion
              </button>
            </nav>
          ) : ( 
            <nav className="flex items-center gap-4 text-xs md:text-sm">
              <button onClick={() => goToAuth(true)} className="cursor-pointer rounded-full border border-white/10 px-3 py-1.5 text-xs font-medium text-text-muted backdrop-blur-sm transition-colors hover:border-primary-soft hover:text-text">
                Connexion
              </button>
              <button onClick={() => goToAuth(true)} className="cursor-pointer rounded-full  bg-primary px-3 py-1.5 text-xs  font-medium text-white shadow-[0_0_35px_rgba(110,84,188,0.7)] transition-transform duration-200 hover:-translate-y-0.5 hover:shadow-[0_0_55px_rgba(110,84,188,1)]">
                Ouvrir un compte Bonk
              </button>
            </nav>
          )}
         
      </header>
  );

}

              {/* <button className="cursor-pointer text-text-muted transition-colors hover:text-text">
                test
              </button>
              <button className="cursor-pointer text-text-muted transition-colors hover:text-text">
                Test
              </button> */}