import React, { createContext, useContext, useState, ReactNode } from "react";
import { JwtPayload } from "jwt-decode";

interface DecodedJwtPayload extends JwtPayload {
  name?: string;
  picture?: string;
  sub?: string; 
}

interface AuthContextType {
  user: DecodedJwtPayload | null;
  setUser: React.Dispatch<React.SetStateAction<DecodedJwtPayload | null>>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<DecodedJwtPayload | null>(null);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
