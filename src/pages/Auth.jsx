import React, { useEffect, useState } from "react";
import LoginRegister from "../components/LoginRegister";
import { useLocation, useNavigate } from "react-router-dom"; 
import { registerUser, loginUser } from "../api/auth";


export default function Auth() {

  const navigate = useNavigate();

  //get rooter dom oocation and extract isSignUp
  const location = useLocation();
  const initialIsSignUp = location.state?.isSignUp ?? false; //if we dont give isSignUp

  // If already logged we redirect user to the dashboard
  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      navigate("/dashboard");
    }
  }, []);

  return (
    <section className="flex min-h-[calc(75vh)] items-center justify-center flex-col gap-10 md:items-center">
        {/* Head */}
          <h1 className="text-3xl font-semibold leading-tight md:text-4xl">
            <span className="bg-gradient-to-r from-primary-soft via-primary to-secondary bg-clip-text text-transparent">
              REJOINS LE GAME
            </span>
          </h1>
      
      <LoginRegister initialIsSignUp={initialIsSignUp} />

    </section>
  );
}
