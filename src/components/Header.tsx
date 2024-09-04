import { useEffect, useRef, useState } from "react";
import { GoogleLogin, googleLogout } from "@react-oauth/google";
import { jwtDecode, JwtPayload } from "jwt-decode";
import { useAuth } from "../context/AuthContext";
import { motion, AnimatePresence } from "framer-motion";
import { WavyLink } from "react-wavy-transitions";
import { useLocation } from "react-router-dom";
import Cart from "./Cart";

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
  const defaultPic = "https://img.icons8.com/bubbles/50/user.png";
  const [profilePic, setProfilePic] = useState(
    user && user.picture ? user.picture : defaultPic
  );
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    console.log("Close button clicked"); // Debugging
    setIsModalOpen(false);
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

  useEffect(() => {
    if (user && user.picture) {
      setProfilePic(user.picture);
    } else {
      setProfilePic(defaultPic);
    }
  }, [user]);

  const firstName = user?.name?.split(" ")[0] || "";

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
    } else if (pathname === "/cart") {
      setActiveItem("Cart");
    } else if (pathname === "/orders") {
      setActiveItem("Orders");
    }
  }, [location.pathname]);

  return (
    <>
      <nav
        className={` bg-black shadow fixed w-full z-[10000] block md:hidden ${
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
          <div className="w-1/3 flex items-center justify-end">
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
                  menuOpen ? "fixed md:hidden w-full" : "hidden"
                }`}
              >
                <nav className="flex min-h-screen pt-48 flex-col items-center space-y-6">
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
                    className={`${
                      activeItem === "Cart"
                        ? "active text-[#E53935] text-4xl"
                        : "text-white text-4xl"
                    }`}
                    onClick={() => {
                      setMenuOpen(false);
                      document.body.classList.remove("noscroll");
                    }}
                  >
                    <button onClick={openModal}>
                      <div className="text-4xl">Cart</div>
                    </button>
                  </motion.div>
                  <motion.div
                    variants={buttonVariants}
                    className={`${
                      activeItem === "Orders"
                        ? "active text-[#E53935] text-4xl"
                        : "text-white text-4xl"
                    }`}
                    onClick={() => {
                      setMenuOpen(false);
                      document.body.classList.remove("noscroll");
                    }}
                  >
                    <WavyLink to="/orders" color="#E53935">
                      <div className="text-4xl">Orders</div>
                    </WavyLink>
                  </motion.div>

                  <div
                    className={`flex items-center justify-center w-full bottom-44 absolute`}
                  >
                    {user ? (
                      <motion.button
                        variants={buttonVariants}
                        className="text-white text-lg underline"
                        onClick={handleLogout}
                      >
                        Logout
                      </motion.button>
                    ) : (
                      <motion.button variants={buttonVariants}>
                        <GoogleLogin
                          onSuccess={handleLoginSuccess}
                          onError={() => {
                            console.log("Login Failed");
                          }}
                          shape="circle"
                          width={80}
                        />
                      </motion.button>
                    )}
                  </div>
                </nav>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      <header className="w-full fixed hidden md:block">
        <div className="container py-4 flex w-full items-center justify-between text-white text-[2rem] font-extrabold">
          <div className="header-link">
            <WavyLink to="/" color="#E53935">
              <div className="text-[2rem]">HOME</div>
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
            <WavyLink to="/orders" color="#E53935">
              <div className="text-[2rem]">ORDERS</div>
            </WavyLink>
          </div>
          <div className="header-link">
            <button onClick={toggleDropdown}>
              {user ? "LOGOUT" : "LOGIN"}
            </button>
          </div>
        </div>
        <div className="">
          <div className="w-full absolute bg-white h-[2px]"></div>
        </div>
      </header>

      {dropdownOpen && (
          <div
            ref={dropdownRef}
            className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
          >
            <button
              onClick={toggleDropdown}
              className="absolute  top-2 right-4 font-bold text-[2rem] hover:text-gray-800 text-[#E53935] transition-colors duration-300"
            ></button>
            <div className="bg-white p-8 rounded-lg shadow-lg max-w-sm w-5/6 md:w-full relative">
              {user ? (
                <>
                  <button
                    className="px-8 py-2 text-gray-800 border text-sm hover:text-[#E53935] hover:bg-black transition-all duration-300 font-bold border-gray-800 rounded-full"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <p className="text-gray-800 font-semibold mb-2">Sign in</p>
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
    </>
  );
};

export default Header;

// import { useEffect, useRef, useState } from "react";
// import { GoogleLogin, googleLogout } from "@react-oauth/google";
// import { jwtDecode, JwtPayload } from "jwt-decode";
// import { useAuth } from "../context/AuthContext";
// import { motion, AnimatePresence } from "framer-motion";
// import { WavyLink } from "react-wavy-transitions";
// import { useLocation } from "react-router-dom";
// import Cart from "./Cart";
// import Orders from "./Orders";

// interface DecodedJwtPayload extends JwtPayload {
//   name?: string;
//   picture?: string;
//   sub?: string;
// }

// const Header = () => {
//   const { user, setUser } = useAuth();
//   const [dropdownOpen, setDropdownOpen] = useState(false);
//   const [menuOpen, setMenuOpen] = useState(false);
//   const dropdownRef = useRef<HTMLDivElement>(null);
//   const profilePicRef = useRef<HTMLImageElement>(null);
//   const defaultPic = "https://img.icons8.com/bubbles/50/user.png";
//   const [profilePic, setProfilePic] = useState(
//     user && user.picture ? user.picture : defaultPic
//   );
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);

//   const openModal = () => {
//     setIsModalOpen(true);
//     document.body.classList.add("noscroll-phone");
//   };

//   const closeModal = () => {
//     setIsModalOpen(false);
//     document.body.classList.remove("noscroll-phone");
//   };

//   const openOrderModal = () => {
//     setIsOrderModalOpen(true);
//     document.body.classList.add("noscroll-phone");
//   };

//   const closeOrderModal = () => {
//     setIsOrderModalOpen(false);
//     document.body.classList.remove("noscroll-phone");
//   };

//   useEffect(() => {
//     const token = localStorage.getItem("google_jwt");
//     if (token) {
//       try {
//         const decoded = jwtDecode<DecodedJwtPayload>(token);
//         setUser(decoded);
//       } catch (error) {
//         console.error("Failed to decode token:", error);
//       }
//     }
//   }, [setUser]);

//   useEffect(() => {
//     const handleClickOutside = (event: MouseEvent) => {
//       if (
//         dropdownRef.current &&
//         !dropdownRef.current.contains(event.target as Node) &&
//         profilePicRef.current &&
//         !profilePicRef.current.contains(event.target as Node)
//       ) {
//         setDropdownOpen(false);
//       }
//     };

//     document.addEventListener("mousedown", handleClickOutside);

//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, []);

//   const handleLogout = () => {
//     googleLogout();
//     setUser(null);
//     localStorage.removeItem("google_jwt");
//     localStorage.removeItem("userId");
//     setDropdownOpen(false);
//   };

//   const handleLoginSuccess = (credentialResponse: { credential?: string }) => {
//     const { credential } = credentialResponse;
//     if (credential) {
//       try {
//         const decoded = jwtDecode<DecodedJwtPayload>(credential);
//         if (decoded.name) {
//           decoded.name = decoded.name.split(" ")[0];
//         }
//         setUser(decoded);
//         localStorage.setItem("google_jwt", credential);
//         if (decoded.sub) {
//           localStorage.setItem("userId", decoded.sub);
//         }
//         setDropdownOpen(false);
//       } catch (error) {
//         console.error("Failed to decode credential:", error);
//       }
//     } else {
//       console.error("Credential is undefined");
//     }
//   };

//   useEffect(() => {
//     if (user && user.picture) {
//       setProfilePic(user.picture);
//     } else {
//       setProfilePic(defaultPic);
//     }
//   }, [user]);

//   const firstName = user?.name?.split(" ")[0] || "";

//   const toggleDropdown = () => {
//     setDropdownOpen((prev) => !prev);
//   };

//   const toggleMenu = () => {
//     setMenuOpen((prev) => {
//       const newMenuOpen = !prev;
//       if (newMenuOpen) {
//         document.body.classList.add("noscroll");
//       } else {
//         document.body.classList.remove("noscroll");
//       }
//       return newMenuOpen;
//     });
//   };

//   const buttonVariants = {
//     hidden: {
//       opacity: 0,
//       y: 50,
//       transition: { duration: 0.6, ease: "easeOut" },
//     },
//     visible: {
//       opacity: 1,
//       y: 0,
//       transition: { duration: 0.6, ease: "easeOut" },
//     },
//     exit: { opacity: 0, y: -50, transition: { duration: 0.6, ease: "easeIn" } },
//   };

//   const menuVariants = {
//     hidden: {
//       opacity: 0,
//       transition: {
//         when: "afterChildren",
//       },
//     },
//     visible: {
//       opacity: 1,
//       transition: {
//         when: "beforeChildren",
//         staggerChildren: 0.15,
//       },
//     },
//     exit: {
//       opacity: 0,
//       transition: {
//         when: "afterChildren",
//         staggerChildren: 0.15,
//       },
//     },
//   };

//   const [show, setShow] = useState(true);
//   const [lastScrollY, setLastScrollY] = useState(0);

//   const controlNavbar = () => {
//     if (typeof window === "undefined") {
//       return;
//     }

//     const currentScrollY = window.scrollY;

//     if (currentScrollY > lastScrollY) {
//       setShow(false);
//     } else {
//       setShow(true);
//     }

//     setLastScrollY(currentScrollY);
//   };

//   useEffect(() => {
//     window.addEventListener("scroll", controlNavbar, { passive: true });

//     return () => {
//       window.removeEventListener("scroll", controlNavbar);
//     };
//   }, [lastScrollY]);

//   const location = useLocation();

//   const [activeItem, setActiveItem] = useState("Home");

//   useEffect(() => {
//     const pathname = location.pathname;
//     if (pathname === "/") {
//       setActiveItem("Home");
//     } else if (pathname === "/shop") {
//       setActiveItem("Products");
//     } else if (pathname === "/cart") {
//       setActiveItem("Cart");
//     } else if (pathname === "/orders") {
//       setActiveItem("Orders");
//     }
//   }, [location.pathname]);

//   return (
//     <header
//       className={` bg-black shadow fixed w-full z-[10000] ${
//         show ? "active-menu" : ""
//       } ${menuOpen ? "fixed w-full" : "header"}`}
//     >
//       <div className="container container-xl-custom h-[80px] flex items-center py-6 justify-between md:justify-center">
//         {/* Logo Section */}
//         <div className="w-1/3 flex items-center justify-start">
//           <div>
//             <WavyLink to="/" color="#E53935">
//               <img src="/logo.svg" alt="Logo" />
//             </WavyLink>
//           </div>
//         </div>

//         {/* Navigation Links - Desktop */}
//         <nav className="hidden md:flex items-center justify-between w-1/2 xl:w-1/3 ">
//           <div
//             className={`underline-hover font-bold transition-all duration-300 ${
//               activeItem === "Home" ? "active text-[#E53935]" : "text-white"
//             } ${isModalOpen || isOrderModalOpen ? "text-white" : ""}`}
//           >
//             <WavyLink to="/" color="#E53935">
//               Home
//             </WavyLink>
//           </div>
//           <div
//             className={`underline-hover font-bold transition-all duration-300 ${
//               activeItem === "Products" ? "active text-[#E53935]" : "text-white"
//             } ${isModalOpen || isOrderModalOpen ? "text-white" : ""} `}
//           >
//             <WavyLink to="/shop" color="#E53935">
//               Shop
//             </WavyLink>
//           </div>
//           <div
//             className={`underline-hover font-bold transition-all duration-300 ${
//               isModalOpen ? "active text-[#E53935]" : "text-white"
//             }`}
//           >
//             <button onClick={openModal}>Cart</button>
//           </div>
//           <div
//             className={`underline-hover font-bold transition-all duration-300 ${
//               isOrderModalOpen ? "active text-[#E53935]" : "text-white"
//             }`}
//           >
//             <button onClick={openOrderModal}>Orders</button>
//           </div>
//         </nav>

//         {/* Profile and Login/Logout Section - Desktop */}
//         <div className="hidden md:flex relative w-1/3 items-center justify-end">
//           <div>
//             <div className="flex items-center gap-2">
//               {user ? (
//                 <p className="text-white transition-all duration-300 text-sm lg:text-base font-medium">
//                   Welcome, {firstName}
//                 </p>
//               ) : (
//                 <p className="text-white transition-all duration-300 text-sm lg:text-base font-medium"></p>
//               )}
//               <img
//                 ref={profilePicRef}
//                 className={`transition-all duration-300 ${
//                   user ? "w-[35px] h-[35px]" : "w-[42px] h-[42px]"
//                 }  rounded-full cursor-pointer`}
//                 src={profilePic}
//                 alt={user?.name || "User"}
//                 onClick={toggleDropdown}
//               />
//             </div>
//             {dropdownOpen && (
//               <div
//                 ref={dropdownRef}
//                 className="absolute right-2 mt-[22px] bg-white border border-gray-300 rounded-md shadow-lg z-10"
//               >
//                 <div className="flex flex-col p-2 overflow-hidden">
//                   {user ? (
//                     <>
//                       <button
//                         className="px-8 py-2 text-gray-800 border text-sm hover:text-white hover:bg-black transition-all duration-300 font-bold border-gray-800 rounded-full"
//                         onClick={handleLogout}
//                       >
//                         Logout
//                       </button>
//                     </>
//                   ) : (
//                     <>
//                       <p className="text-gray-800 font-semibold mb-2">
//                         Sign in
//                       </p>
//                       <GoogleLogin
//                         onSuccess={handleLoginSuccess}
//                         onError={() => {
//                           console.log("Login Failed");
//                         }}
//                         shape="circle"
//                         width={80}
//                       />
//                     </>
//                   )}
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>

//         {/* Hamburger Menu - Mobile */}
//         <div className="md:hidden w-1/3 flex items-center justify-end">
//           <button
//             onClick={toggleMenu}
//             className="text-white"
//             aria-label="Toggle menu"
//           >
//             {menuOpen ? (
//               <svg
//                 width="28"
//                 height="20"
//                 viewBox="0 0 55 22"
//                 fill="none"
//                 xmlns="http://www.w3.org/2000/svg"
//               >
//                 <rect
//                   id="rect1"
//                   y="15.5742"
//                   width="55"
//                   height="4"
//                   fill={menuOpen ? "#E53935" : "#E53935"}
//                   className="transition-all duration-500"
//                   transform="rotate(45 36 6)"
//                 />
//                 <rect
//                   id="rect2"
//                   y="0.0742188"
//                   width="55"
//                   height="4"
//                   fill={menuOpen ? "#E53935" : "#E53935"}
//                   className="transition-all duration-500"
//                   transform="rotate(-45 32 6)"
//                 />
//               </svg>
//             ) : (
//               <svg
//                 width="28"
//                 height="20"
//                 viewBox="0 0 55 22"
//                 fill="none"
//                 xmlns="http://www.w3.org/2000/svg"
//               >
//                 <rect
//                   id="rect1"
//                   y="15.5742"
//                   width="55"
//                   height="4"
//                   fill={menuOpen ? "#E53935" : "#E53935"}
//                   className="transition-all duration-500"
//                 />
//                 <rect
//                   id="rect2"
//                   y="0.0742188"
//                   width="55"
//                   height="4"
//                   fill={menuOpen ? "#E53935" : "#E53935"}
//                   className="transition-all duration-500"
//                 />
//               </svg>
//             )}
//           </button>
//         </div>
//       </div>
//       {/* Mobile Menu Overlay */}
//       <AnimatePresence>
//         {menuOpen && (
//           <motion.div
//             animate="visible"
//             id="navigation-menu"
//             initial="hidden"
//             exit="exit"
//             variants={menuVariants}
//             className="w-full fixed z-[10000] md:hidden"
//           >
//             <div
//               className={`bg-black ${
//                 menuOpen ? "fixed md:hidden w-full" : "hidden"
//               }`}
//             >
//               <nav className="flex min-h-screen pt-48 flex-col items-center space-y-6">
//                 <motion.div
//                   variants={buttonVariants}
//                   className={`${
//                     activeItem === "Home"
//                       ? "active text-[#E53935] text-4xl"
//                       : "text-white text-4xl"
//                   }`}
//                   onClick={() => {
//                     setMenuOpen(false);
//                     document.body.classList.remove("noscroll");
//                   }}
//                 >
//                   <WavyLink to="/" color="#E53935">
//                     <div className="text-4xl">Home</div>
//                   </WavyLink>
//                 </motion.div>
//                 <motion.div
//                   variants={buttonVariants}
//                   className={`${
//                     activeItem === "Products"
//                       ? "active text-[#E53935] text-4xl"
//                       : "text-white text-4xl"
//                   }`}
//                   onClick={() => {
//                     setMenuOpen(false);
//                     document.body.classList.remove("noscroll");
//                   }}
//                 >
//                   <WavyLink to="/shop" color="#E53935">
//                     <div className="text-4xl">Shop</div>
//                   </WavyLink>
//                 </motion.div>
//                 <motion.div
//                   variants={buttonVariants}
//                   className={`${
//                     activeItem === "Cart"
//                       ? "active text-[#E53935] text-4xl"
//                       : "text-white text-4xl"
//                   }`}
//                   onClick={() => {
//                     setMenuOpen(false);
//                     document.body.classList.remove("noscroll");
//                   }}
//                 >
//                   <button onClick={openModal}>
//                     <div className="text-4xl">Cart</div>
//                   </button>
//                 </motion.div>
//                 <motion.div
//                   variants={buttonVariants}
//                   className={`${
//                     activeItem === "Orders"
//                       ? "active text-[#E53935] text-4xl"
//                       : "text-white text-4xl"
//                   }`}
//                   onClick={() => {
//                     setMenuOpen(false);
//                     document.body.classList.remove("noscroll");
//                   }}
//                 >
//                   <button onClick={openOrderModal}>
//                     <div className="text-4xl">Orders</div>
//                   </button>
//                 </motion.div>

//                 <div
//                   className={`flex items-center justify-center w-full bottom-44 absolute`}
//                 >
//                   {user ? (
//                     <motion.button
//                       variants={buttonVariants}
//                       className="text-white text-lg underline"
//                       onClick={handleLogout}
//                     >
//                       Logout
//                     </motion.button>
//                   ) : (
//                     <motion.button variants={buttonVariants}>
//                       <GoogleLogin
//                         onSuccess={handleLoginSuccess}
//                         onError={() => {
//                           console.log("Login Failed");
//                         }}
//                         shape="circle"
//                         width={80}
//                       />
//                     </motion.button>
//                   )}
//                 </div>
//               </nav>
//             </div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//       <Cart isOpen={isModalOpen} onClose={closeModal} />
//       <Orders isOpen={isOrderModalOpen} onClose={closeOrderModal} />
//     </header>
//   );
// };

// export default Header;
