import React, { createContext, ReactNode, useEffect, useState } from 'react'
import { jwtDecode } from "jwt-decode";

export type AuthContextType = {
  isLoggedIn: boolean;
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
  logout : () => void
}

const defaultAuthContext: AuthContextType = {
  isLoggedIn: false,
  setIsLoggedIn: () => {},
  logout : () => {}
};

export const AuthContext = createContext(defaultAuthContext);

type PropType = {
  children: ReactNode;
};

const AuthProvider:React.FC<PropType> = ({children}) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  const logout = () => {
    localStorage.removeItem('auth_token');
    setIsLoggedIn(false);
  };

  useEffect(() => {
    const token = localStorage.getItem('auth_token');

    if (token) {
      const decodedAuthToken = jwtDecode(token) as {
        userId: number;
        exp: number;
      }

      if (decodedAuthToken.exp < Date.now() / 1000) {
        logout();
      }
      setIsLoggedIn(true);
    }
  }, []);

  return (
    <AuthContext.Provider value={{isLoggedIn, setIsLoggedIn, logout}}>{children}</AuthContext.Provider>
  )
}

export default AuthProvider;