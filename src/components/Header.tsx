import React, { useState, useEffect } from "react";
import Nav from "./Nav";
import useCart from "../hooks/useCart";
import { GoogleLogin, googleLogout } from "@react-oauth/google";
import {jwtDecode, JwtPayload } from "jwt-decode";

type PropsType = {
  viewCart: boolean;
  setViewCart: React.Dispatch<React.SetStateAction<boolean>>;
};

// Define the expected structure of the decoded JWT payload
interface DecodedJwtPayload extends JwtPayload {
  name?: string;
  picture?: string;
  // Add other fields you expect in the JWT payload
}

const Header = ({ viewCart, setViewCart }: PropsType) => {
  const { totalItems, totalPrice } = useCart();
  
  // User state is either null or an object matching DecodedJwtPayload
  const [user, setUser] = useState<DecodedJwtPayload | null>(null);

  useEffect(() => {
    // Check for the token in localStorage when the component mounts
    const token = localStorage.getItem("google_jwt");
    if (token) {
      try {
        const decoded = jwtDecode<DecodedJwtPayload>(token);
        setUser(decoded); // Restore the user state
      } catch (error) {
        console.error("Failed to decode token:", error);
      }
    }
  }, []);

  const handleLogout = () => {
    googleLogout(); // Logs out from Google
    setUser(null); // Clears the user state
    localStorage.removeItem("google_jwt"); // Clear the token from localStorage
  };

  const handleLoginSuccess = (credentialResponse: any) => {
    const { credential } = credentialResponse;
    if (credential) {
      const decoded = jwtDecode<DecodedJwtPayload>(credential);
      setUser(decoded); // Store user info in state
      localStorage.setItem("google_jwt", credential); // Save the token in localStorage
      console.log(decoded);
    } else {
      console.error("Credential is undefined");
    }
  };

  const content = (
    <header className="header">
      <div className="header__title-bar">
        <div>
          <img src="/logo.svg" alt="Logo" />
        </div>
        <div className="header__price-box">
          <p>Total Items: {totalItems}</p>
          <p>Total Price: {totalPrice}</p>
        </div>
      </div>
      <Nav viewCart={viewCart} setViewCart={setViewCart} />
      {user ? (
        <div>
          <p>Welcome, {user.name}</p>
          <button onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <GoogleLogin
          onSuccess={handleLoginSuccess}
          onError={() => {
            console.log("Login Failed");
          }}
        />
      )}
    </header>
  );

  return content;
};

export default Header;
