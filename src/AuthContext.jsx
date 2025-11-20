// AuthContext.jsx
import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [isConnected, setIsConnected] = useState(false);

  // Check the token
  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    setIsConnected(!!token);
  }, []);

  const login = (token) => {
    localStorage.setItem("accessToken", token);
    setIsConnected(true);
  };

  const logout = () => {
    localStorage.removeItem("accessToken");
    setIsConnected(false);
  };

  //give this funcs to children (So the <App/>)
  return (
    <AuthContext.Provider value={{ isConnected, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
