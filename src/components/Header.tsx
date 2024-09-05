import { useEffect, useRef, useState } from "react";
import { GoogleLogin, googleLogout } from "@react-oauth/google";
import { jwtDecode, JwtPayload } from "jwt-decode";
import { useAuth } from "../context/AuthContext";
import { motion, AnimatePresence } from "framer-motion";
import { WavyLink } from "react-wavy-transitions";
import { useLocation } from "react-router-dom";
import Cart from "./Cart";
import Orders from "./Orders";

interface DecodedJwtPayload extends JwtPayload {
  name?: string;
  picture?: string;
  sub?: string;
}

const Header = () => {
  const { user, setUser } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const profilePicRef = useRef<HTMLImageElement>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
    document.body.classList.add("noscroll-phone");
  };

  const closeModal = () => {
    setIsModalOpen(false);
    document.body.classList.remove("noscroll-phone");
  };

  const openOrderModal = () => {
    setIsOrderModalOpen(true);
    document.body.classList.add("noscroll-phone");
  };

  const closeOrderModal = () => {
    setIsOrderModalOpen(false);
    document.body.classList.remove("noscroll-phone");
  };

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
    setMenuOpen((prev) => {
      const newMenuOpen = !prev;
      if (newMenuOpen) {
        document.body.classList.add("noscroll");
      } else {
        document.body.classList.remove("noscroll");
      }
      return newMenuOpen;
    });
  };

  const buttonVariants = {
    hidden: {
      opacity: 0,
      y: 50,
      transition: { duration: 0.6, ease: "easeOut" },
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
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

  const location = useLocation();

  const [activeItem, setActiveItem] = useState("Home");

  useEffect(() => {
    const pathname = location.pathname;
    if (pathname === "/") {
      setActiveItem("Home");
    } else if (pathname === "/shop") {
      setActiveItem("Products");
    }
  }, [location.pathname]);

  return (
    <>
      <header
        className={`block md:hidden bg-black shadow fixed w-full z-[10000] ${
          show ? "active-menu" : ""
        } ${menuOpen ? "fixed w-full" : "header"}`}
      >
        <div className="container container-xl-custom h-[80px] flex items-center py-6 justify-between md:justify-center">
          <div className="w-1/3 flex items-center justify-start">
            <div>
              <WavyLink to="/" color="#E53935">
                <img src="/logo.svg" alt="Logo" />
              </WavyLink>
            </div>
          </div>

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
                    fill={menuOpen ? "#E53935" : "#E53935"}
                    className="transition-all duration-500"
                    transform="rotate(45 36 6)"
                  />
                  <rect
                    id="rect2"
                    y="0.0742188"
                    width="55"
                    height="4"
                    fill={menuOpen ? "#E53935" : "#E53935"}
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
                    fill={menuOpen ? "#E53935" : "#E53935"}
                    className="transition-all duration-500"
                  />
                  <rect
                    id="rect2"
                    y="0.0742188"
                    width="55"
                    height="4"
                    fill={menuOpen ? "#E53935" : "#E53935"}
                    className="transition-all duration-500"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
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
                  menuOpen ? "fixed md:hidden h-[calc(100dvh-80px)] w-full flex flex-col items-center justify-center" : "hidden"
                }`}
              >
                <nav className="flex flex-col items-center space-y-8">
                  <motion.div
                    variants={buttonVariants}
                    className={`${
                      activeItem === "Home"
                        ? "active text-[#E53935] text-4xl"
                        : "text-white text-4xl"
                    }`}
                    onClick={() => {
                      setMenuOpen(false);
                      document.body.classList.remove("noscroll");
                    }}
                  >
                    <WavyLink to="/" color="#E53935">
                      <div className="text-4xl">Home</div>
                    </WavyLink>
                  </motion.div>
                  <motion.div
                    variants={buttonVariants}
                    className={`${
                      activeItem === "Products"
                        ? "active text-[#E53935] text-4xl"
                        : "text-white text-4xl"
                    }`}
                    onClick={() => {
                      setMenuOpen(false);
                      document.body.classList.remove("noscroll");
                    }}
                  >
                    <WavyLink to="/shop" color="#E53935">
                      <div className="text-4xl">Shop</div>
                    </WavyLink>
                  </motion.div>
                  <motion.div
                    variants={buttonVariants}
                    onClick={() => {
                      setMenuOpen(false);
                      document.body.classList.remove("noscroll");
                    }}
                  >
                    <button onClick={openModal}>
                      <div className="text-4xl text-white hover:text-[#E53935]">Cart</div>
                    </button>
                  </motion.div>
                  <motion.div
                    variants={buttonVariants}
                    onClick={() => {
                      setMenuOpen(false);
                      document.body.classList.remove("noscroll");
                    }}
                  >
                    <button onClick={openOrderModal}>
                      <div className="text-4xl text-white hover:text-[#E53935]">Orders</div>
                    </button>
                  </motion.div>

                  <motion.div
                    variants={buttonVariants}
                    onClick={() => {
                      setMenuOpen(false);
                      document.body.classList.remove("noscroll");
                    }}
                  >
                    <button onClick={toggleDropdown}>
                      <div className="text-4xl text-white hover:text-[#E53935]">{user ? "Logout" : "Login"}</div>
                    </button>
                  </motion.div>
                </nav>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <header
        className={`w-full bg-black fixed hidden header md:block ${
          show ? "active-menu" : ""
        }`}
      >
        <div className="container py-2 flex w-full items-center justify-between text-white text-[1.8rem] font-extrabold">
          <div className="header-link">
            <WavyLink to="/" color="#E53935">
              <div className="text-[2rem] ">HOME</div>
            </WavyLink>
          </div>
          <div className="header-link">
            <WavyLink to="/shop" color="#E53935">
              <div className="text-[2rem]">SHOP</div>
            </WavyLink>
          </div>
          <div className="header-link">
            <button onClick={openModal}>CART</button>
          </div>
          <div className="header-link">
            <button onClick={openOrderModal}>ORDERS</button>
          </div>
          <div className="header-link">
            <button onClick={toggleDropdown}>
              {user ? "LOGOUT" : "LOGIN"}
            </button>
          </div>
        </div>
      </header>

      {dropdownOpen && (
        <div
          ref={dropdownRef}
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
        >
          <div className="bg-white p-8 rounded-lg shadow-lg max-w-sm w-5/6 md:w-full relative">
            <button
              onClick={toggleDropdown}
              className="absolute  top-2 right-4 font-bold text-[2rem] hover:text-gray-800 text-[#E53935] transition-colors duration-300"
            >
              &times;
            </button>
            {user ? (
              <>
                <h3 className="text-xl font-extrabold my-6">
                  Sad to see you go ! :(
                </h3>
                <button
                  className="px-8 py-2 text-gray-800 border text-sm hover:text-white hover:bg-black transition-all duration-300 font-extrabold border-gray-800 rounded-full"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <h3 className="text-xl font-extrabold my-6">
                  Welcome to the VogueNest !
                </h3>
                <GoogleLogin
                  onSuccess={handleLoginSuccess}
                  onError={() => {
                    console.log("Login Failed");
                  }}
                  shape="circle"
                  width={80}
                />
              </>
            )}
          </div>
        </div>
      )}

      <Cart isOpen={isModalOpen} onClose={closeModal} />
      <Orders isOpen={isOrderModalOpen} onClose={closeOrderModal} />
    </>
  );
};

export default Header;
