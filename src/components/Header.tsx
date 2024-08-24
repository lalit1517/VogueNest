import React, { useEffect, useRef, useState } from "react";
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
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const profilePicRef = useRef<HTMLImageElement>(null);

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

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        profilePicRef.current &&
        !profilePicRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    googleLogout();
    setUser(null);
    localStorage.removeItem("google_jwt");
    localStorage.removeItem("userId");
    setDropdownOpen(false); 
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
        setDropdownOpen(false); 
      } catch (error) {
        console.error("Failed to decode credential:", error);
      }
    } else {
      console.error("Credential is undefined");
    }
  };

  const toggleDropdown = () => {
    setDropdownOpen((prev) => !prev);
  };

  return (
    <header className="bg-white shadow">
      <div className="container container-xl-custom flex items-center py-4 justify-between">
        {/* Logo Section */}
        <div>
          <a href="/" className="text-xl font-bold text-gray-800">
            <img src="/logo.png" alt="Logo" className="" />
          </a>
        </div>

        {/* Navigation Links */}
        <nav className="flex items-center space-x-6">
          <button
            className={`text-gray-600 hover:text-gray-800 ${view === "products" ? "active" : ""}`}
            onClick={() => setView("products")}
          >
            Products
          </button>
          <button
            className={`text-gray-600 hover:text-gray-800 ${view === "cart" ? "active" : ""}`}
            onClick={() => setView("cart")}
          >
            Cart
          </button>
          <button
            className={`text-gray-600 hover:text-gray-800 ${view === "orders" ? "active" : ""}`}
            onClick={() => setView("orders")}
          >
            Orders
          </button>
        </nav>

        {/* Profile and Login/Logout Section */}
        <div className="relative">
          <div className="flex items-center gap-2">
            {user ? (
              <p className="text-gray-800 font-semibold">
                Welcome, {user.name}
              </p>
            ) : (
              <p className="text-gray-800 font-semibold mb-2"></p>
            )}
            <img
              ref={profilePicRef}
              className="w-[40px] h-[40px] rounded-full cursor-pointer"
              src={
                user?.picture || "https://img.icons8.com/bubbles/50/user.png"
              }
              alt={user?.name || "User"}
              onClick={toggleDropdown}
            />
          </div>
          {dropdownOpen && (
            <div
              ref={dropdownRef}
              className="absolute right-2 mt-2 w-60 bg-white border border-gray-300 rounded-md shadow-lg z-10"
            >
              <div className="flex flex-col p-2 overflow-hidden">
                {user ? (
                  <>
                    <button
                      className="px-4 py-2 text-gray-600 hover:text-gray-800 bg-gray-100 rounded-md"
                      onClick={handleLogout}
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <>
                    <p className="text-gray-800 font-semibold mb-2">
                      Sign in with Google
                    </p>
                    <GoogleLogin
                      onSuccess={handleLoginSuccess}
                      onError={() => {
                        console.log("Login Failed");
                      }}
                    />
                  </>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
