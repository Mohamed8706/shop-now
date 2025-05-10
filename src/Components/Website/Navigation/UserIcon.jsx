import { faUserCircle } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useAuth } from "./../../../hooks/useAuth";
import { NavLink } from "react-router-dom";
import Cookie from "cookie-universal";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { ChartBarBig, Home, LogInIcon, UserPlus } from "lucide-react";

export function UserIcon() {
  const cookies = Cookie();
  const token = cookies.get("e-commerce");
  const { logout, user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Animation variants for the dropdown
  const dropdownVariants = {
    hidden: {
      opacity: 0,
      x: 20,
      y: -20,
      scale: 0.5,
      transformOrigin: "top right",
    },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.3,
        ease: "easeOut",
      },
    },
    exit: {
      opacity: 0,
      x: 20,
      y: -20,
      scale: 0.5,
      transition: {
        duration: 0.2,
      },
    },
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <FontAwesomeIcon
        className="p-2 rounded-full cursor-pointer"
        icon={faUserCircle}
        color="#06c44f"
        fontSize={32}
        onClick={() => setIsOpen(!isOpen)}
      />

      {/* Dropdown Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="absolute top-full right-0 mt-2 w-54 bg-white shadow-md rounded-3xl 
            z-10 overflow-hidden"
            variants={dropdownVariants}
            initial="hidden"
            animate="visible"
            exit="exit">
            {token ? (
            <>
                <NavLink to="/" className="px-4 py-3 flex items-center justify-start 
                    gap-3 hover:bg-gray-100 !text-gray-800" onClick={() => setIsOpen(false)}>
                    <Home size={24}/>
                    <p className="text-16 font-medium f-jakarta ">Home</p>
                </NavLink>
                {["1999", "1995", "1996"].includes(user?.role) && (
                <NavLink
                    to="/dashboard"
                    className="px-4 py-3 flex items-center justify-start 
                    gap-3 hover:bg-gray-100 !text-gray-800"
                    onClick={() => setIsOpen(false)}
                    >
                    <ChartBarBig size={24}/>
                    <p className="text-16 font-medium f-jakarta ">Dashboard</p>
                </NavLink>
                )}
                <div className="px-4 py-3 flex items-center justify-center text-primary f-jakarta"
                  onClick={() => {
                    logout();
                    setIsOpen(false);
                  }}
                >
                <div className="flex items-center justify-center w-3/4 rounded-full border border-primary 
                    hover:!bg-[#06c65014] px-4 py-2 cursor-pointer duration-300" onClick={() => {logout();setIsOpen(false);}}>
                    Logout
                </div>
                </div>
              </>
            ) : (
              <>
                <NavLink
                  to="/login"
                className="px-4 py-3 flex items-center justify-start 
                    gap-3 hover:bg-gray-100 !text-gray-800"
                  onClick={() => setIsOpen(false)}
                >
                    <LogInIcon size={24}/>
                    <p className="text-16 font-medium f-jakarta ">Login</p>
                </NavLink>
                <NavLink
                  to="/register"
                  className="px-4 py-3 flex items-center justify-start 
                    gap-3 hover:bg-gray-100 !text-gray-800"
                  onClick={() => setIsOpen(false)}
                >
                    <UserPlus size={24}/>
                    <p className="text-16 font-medium f-jakarta ">Get Started</p>
                </NavLink>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}