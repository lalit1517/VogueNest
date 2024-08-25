import React, { useEffect, useRef, useState } from "react";
import { GoogleLogin, googleLogout } from "@react-oauth/google";
import { jwtDecode, JwtPayload } from "jwt-decode";
import { useAuth } from "../context/AuthContext";
import { motion, AnimatePresence } from "framer-motion";

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
  const [menuOpen, setMenuOpen] = useState(false);
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
        if (decoded.name) {
          decoded.name = decoded.name.split(" ")[0]; 
        }
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

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  const buttonVariants = {
    hidden: { opacity: 0, y: 50, transition: { duration: 0.6, ease: "easeOut" } }, 
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }, 
    exit: { opacity: 0, y: -50, transition: { duration: 0.6, ease: "easeIn" } }, 
  };
  
  const menuVariants = {
    hidden: {
      opacity: 0,
      transition: {
        when: "afterChildren",
      },
    },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.15, 
      },
    },
    exit: {
      opacity: 0,
      transition: {
        when: "afterChildren",
        staggerChildren: 0.15,
      },
    },
  };

  const [show, setShow] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const controlNavbar = () => {
    if (typeof window === "undefined") {
      return;
    }

    const currentScrollY = window.scrollY;

    if (currentScrollY > lastScrollY) {
      setShow(false);
    } else {
      setShow(true);
    }

    setLastScrollY(currentScrollY);
  };

  useEffect(() => {
    window.addEventListener("scroll", controlNavbar, { passive: true });

    return () => {
      window.removeEventListener("scroll", controlNavbar);
    };
  }, [lastScrollY]);

  return (
    <header
      className={` bg-black shadow fixed w-full z-[10000] ${show ? "active-menu" : ""} ${menuOpen ? "fixed w-full" : "header"}`}
    >
      <div className="container container-xl-custom h-[97px] flex items-center py-6 justify-between md:justify-center">
        {/* Logo Section */}
        <div className="w-1/3 flex items-center justify-start">
          <a href="/" className="text-xl font-bold text-gray-800">
            <img src="/logo.png" alt="Logo" />
          </a>
        </div>

        {/* Navigation Links - Desktop */}
        <nav className="hidden md:flex items-center justify-evenly w-1/3">
          <button
            className={`underline-hover font-bold transition-all duration-300 ${
              view === "products" ? "active text-[#E53935]" : "text-white"
            }`}
            onClick={() => setView("products")}
          >
            Products
          </button>
          <button
            className={`underline-hover font-bold transition-all duration-300 ${
              view === "cart" ? "active text-[#E53935]" : "text-white"
            }`}
            onClick={() => setView("cart")}
          >
            Cart
          </button>
          <button
            className={` underline-hover font-bold transition-all duration-300 ${
              view === "orders" ? "active text-[#E53935]" : "text-white"
            }`}
            onClick={() => setView("orders")}
          >
            Orders
          </button>
        </nav>

        {/* Profile and Login/Logout Section - Desktop */}
        <div className="hidden md:flex relative w-1/3 items-center justify-end">
          <div>
            <div className="flex items-center gap-2">
              {user ? (
                <p className="text-white transition-all duration-300 text-sm lg:text-base font-medium">
                  Welcome, {user.name}
                </p>
              ) : (
                <p className="text-gray-800 transition-all duration-300 font-semibold mb-2"></p>
              )}
              <img
                ref={profilePicRef}
                className={`transition-all duration-300 ${
                  user ? "w-[35px] h-[35px]" : "w-[42px] h-[42px]"
                }  rounded-full cursor-pointer`}
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

        {/* Hamburger Menu - Mobile */}
        <div className="md:hidden w-1/3 flex items-center justify-end">
          <button
            onClick={toggleMenu}
            className="text-white"
            aria-label="Toggle menu"
          >
            {menuOpen ? (
              <svg
                width="28"
                height="20"
                viewBox="0 0 55 22"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect
                  id="rect1"
                  y="15.5742"
                  width="55"
                  height="4"
                  fill={menuOpen ? "#E53935" : "white"}
                  className="transition-all duration-500"
                  transform="rotate(45 36 6)"
                />
                <rect
                  id="rect2"
                  y="0.0742188"
                  width="55"
                  height="4"
                  fill={menuOpen ? "#E53935" : "white"}
                  className="transition-all duration-500"
                  transform="rotate(-45 32 6)"
                />
              </svg>
            ) : (
              <svg
                width="28"
                height="20"
                viewBox="0 0 55 22"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect
                  id="rect1"
                  y="15.5742"
                  width="55"
                  height="4"
                  fill={menuOpen ? "#E53935" : "white"}
                  className="transition-all duration-500"
                />
                <rect
                  id="rect2"
                  y="0.0742188"
                  width="55"
                  height="4"
                  fill={menuOpen ? "#E53935" : "white"}
                  className="transition-all duration-500"
                />
              </svg>
            )}
          </button>
        </div>
      </div>
      {/* Mobile Menu Overlay */}
      <AnimatePresence>
      {menuOpen && (
        <motion.div
          animate="visible"
          id="navigation-menu"
          initial="hidden"
          exit="exit"
          variants={menuVariants}
          className="w-full fixed z-[10000] md:hidden"
        >
          <div
            className={`bg-black ${
              menuOpen
                ? "fixed md:hidden w-full"
                : "hidden"
            }`}
          >
            <nav className="flex min-h-screen mt-auto pt-48 flex-col items-center space-y-6">
              <motion.button
                variants={buttonVariants}
                className={`text-4xl ${
                  view === "products" ? "active text-[#E53935]" : "text-white"
                }`}
                onClick={() => { setView("products"); setMenuOpen(false); } }
              >
                Products
              </motion.button>
              <motion.button
                variants={buttonVariants}
                className={`text-4xl ${
                  view === "cart" ? "active text-[#E53935]" : "text-white"
                }`}
                onClick={() => { setView("cart"); setMenuOpen(false); } }
              >
                Cart
              </motion.button>
              <motion.button
                variants={buttonVariants}
                className={`text-4xl ${
                  view === "orders" ? "active text-[#E53935]" : "text-white"
                }`}
                onClick={() => { setView("orders"); setMenuOpen(false); } }
              >
                Orders
              </motion.button>
              <div
                className={`flex items-center justify-center w-full`}
              >
                {user ? (
                  <motion.button
                    variants={buttonVariants}
                    className="text-white text-xl underline"
                    onClick={handleLogout}
                  >
                    Logout
                  </motion.button>
                ) : (
                  <motion.button
                    variants={buttonVariants}
                  >
                  <GoogleLogin
                    onSuccess={handleLoginSuccess}
                    onError={() => {
                      console.log("Login Failed");
                    }}
                  />
                  </motion.button>
                )}
              </div>
            </nav>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
    </header>
  );
};

export default Header;
