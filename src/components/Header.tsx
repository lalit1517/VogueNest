import React, { useEffect, useState } from "react";
import Nav from "./Nav";
import { GoogleLogin, googleLogout } from "@react-oauth/google";
import { jwtDecode, JwtPayload } from "jwt-decode";
import { useAuth } from "../context/AuthContext";

type ViewType = "products" | "cart" | "orders";

type PropsType = {
  view: ViewType;
  setView: React.Dispatch<React.SetStateAction<ViewType>>;
};

interface DecodedJwtPayload extends JwtPayload {
  name?: string;
  picture?: string;
  sub?: string; 
}

const Header = ({ view, setView }: PropsType) => {
  const { user, setUser } = useAuth();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("google_jwt");
    if (token) {
      try {
        const decoded = jwtDecode<DecodedJwtPayload>(token);
        setUser(decoded);
      } catch (error) {
        console.error("Failed to decode token:", error);
      }
    }
  }, [setUser]);

  const handleLogout = () => {
    googleLogout();
    setUser(null);
    localStorage.removeItem("google_jwt");
    localStorage.removeItem("userId");
    setIsDropdownOpen(false);
  };

  const handleLoginSuccess = (credentialResponse: { credential?: string }) => {
    const { credential } = credentialResponse;
    if (credential) {
      try {
        const decoded = jwtDecode<DecodedJwtPayload>(credential);
        setUser(decoded);
        localStorage.setItem("google_jwt", credential);
        if (decoded.sub) {
          localStorage.setItem("userId", decoded.sub);
        }
      } catch (error) {
        console.error("Failed to decode credential:", error);
      }
    } else {
      console.error("Credential is undefined");
    }
  };

  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

  return (
    <header className="header">
      <div className="header__title-bar">
        <div>
          <img src="/logo.svg" alt="Logo" />
        </div>
        <div>
          <Nav view={view} setView={setView} />
        </div>
        <div>
          {user ? (
            <div className="relative">
              <div className="flex items-center cursor-pointer" onClick={toggleDropdown}>
                <p className="mr-2">Welcome, {user.name}</p>
                <img
                  className="w-[60px] h-[60px] rounded-full"
                  src={user.picture || "https://img.icons8.com/bubbles/50/user.png"}
                  alt={user.name || "User"}
                />
              </div>
              {isDropdownOpen && (
                <div className="absolute top-full right-0 mt-2 bg-white shadow-lg rounded-lg">
                  <button
                    className="block w-full px-4 py-2 text-left hover:bg-gray-200"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div>
              <img
                className="w-[60px] h-[60px]"
                src="https://img.icons8.com/bubbles/50/user.png"
                alt="Default user icon"
              />
            </div>
          )}
        </div>
      </div>
      {!user && (
        <GoogleLogin
          onSuccess={handleLoginSuccess}
          onError={() => {
            console.log("Login Failed");
          }}
        />
      )}
    </header>
  );
};

export default Header;
