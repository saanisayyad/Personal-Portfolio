import { useState } from "react";

import { Link, NavLink } from "react-router-dom";

import { Menu, X } from "lucide-react";

import {
  motion,
  AnimatePresence,
} from "framer-motion";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const token = localStorage.getItem("token");

  const navLinks = [
    {
      name: "Home",
      path: "/",
    },
    {
      name: "Projects",
      path: "/projects",
    },
    {
      name: "Qualifications",
      path: "/qualifications",
    },
    {
      name: "Notes",
      path: "/notes",
    },
    {
      name: "Gallery",
      path: "/gallery",
    },
  ];

  return (
    <>
      {/* Navbar */}
      <header className="fixed top-4 left-1/2 -translate-x-1/2 w-[95%] max-w-7xl z-50">
        <nav
          className=" 
    group
    relative
    h-18
    px-6
    flex
    items-center
    justify-between
    rounded-full
    border
    border-[#c5b18a]/[0.17]
    bg-[#15140f]/90
    backdrop-blur-2xl
    shadow-[0_14px_44px_rgba(0,0,0,0.34)]
    transition-[border-color,background-color,box-shadow]
    duration-300
    hover:border-[#c5b18a]/[0.28]"
        >
          <div
            className="
    absolute
    inset-0
    rounded-full
    blur-xl
    opacity-0
    transition-opacity
    duration-500
    group-hover:opacity-100
    -z-10
  "
          />
          {/* Logo */}
          <div className="flex items-center gap-3 select-none">
            {/* Logo */}
            <div className="relative w-14 h-14 flex items-center justify-center">
              {/* Analytics Ring */}
              <svg
                className="absolute inset-0"
                viewBox="0 0 100 100"
                style={{
                  animationDuration: "10s",
                  animationTimingFunction: "linear",
                }}
              >
                <defs>
                  <linearGradient
                    id="analyticsRing"
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="100%"
                  >
                    <stop offset="0%" stopColor="#c5b18a" />
                    <stop offset="50%" stopColor="#948268" />
                    <stop offset="100%" stopColor="#e4d6b9" />
                  </linearGradient>
                </defs>

                <circle
                  cx="50"
                  cy="50"
                  r="47"
                  fill="none"
                  stroke="url(#analyticsRing)"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeDasharray="42 260"
                />
              </svg>

              {/* Logo */}
              <img
              src="/logo.webp"
              alt="Logo"
              width="48"
              height="48"
              />
            </div>

            {/* Portfolio descriptor */}
            <div className="flex flex-col justify-center gap-2">
              <span className="h-px w-9 bg-[#c5b18a]/70" aria-hidden="true" />
              <span className="text-[9px] uppercase tracking-[0.24em] text-[#b8b0a2] sm:text-[10px]">
                Data Analyst
              </span>
            </div>
          </div>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-2">
            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                className={({ isActive }) =>
                  `relative rounded-full px-4 py-3 text-sm font-medium transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300/60 ${
                    isActive ? "text-[#e5d2a8]" : "text-[#a39b8e] hover:text-[#f0eadf]"
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    {isActive && (
                      <motion.div
                        layoutId="active"
                        className="
                          absolute
                          inset-0
                          rounded-full
                          bg-[#c5b18a]/[0.07]
                          border
                          border-[#c5b18a]/[0.14]
                          "
                      />
                    )}

                    <span className="relative z-10">{link.name}</span>
                  </>
                )}
              </NavLink>
            ))}
          </div>

          {/* Right Side */}
          <div className="hidden md:flex items-center gap-4">
            {token ? (
              <NavLink
                to="/admin/dashboard"
                className="
group
relative
overflow-hidden
px-5
py-2.5
rounded-full
font-semibold
text-sm
text-[#171510]
shadow-[0_4px_18px_rgba(0,0,0,0.14)]
bg-gradient-to-r
from-[#c5b18a]
via-[#d8c7a5]
to-[#948268]
bg-[length:100%]
transition-all
duration-300
hover:-translate-y-0.5
hover:shadow-[0_6px_24px_rgba(0,0,0,0.22)]
"
              >
                <span className="relative z-10">Dashboard</span>


              </NavLink>
            ) : (
              <NavLink
                to="/admin/login"
                className="
group
relative
overflow-hidden
px-5
py-2.5
rounded-full
font-semibold
text-sm
text-[#171510]
shadow-[0_4px_18px_rgba(0,0,0,0.14)]
bg-gradient-to-r
from-[#c5b18a]
via-[#d8c7a5]
to-[#948268]
bg-[length:100%]
transition-all
duration-300
hover:-translate-y-0.5
hover:shadow-[0_6px_24px_rgba(0,0,0,0.22)]
"
              >
                <span className="relative z-10">Admin</span>


              </NavLink>
            )}
          </div>

          {/* Mobile Button */}
          <motion.button
            whileTap={{ scale: 0.97 }}
            type="button"
            aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen(!menuOpen)}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[#c5b18a]/[0.18] bg-[#c5b18a]/[0.045] text-[#f0eadf] transition-colors hover:border-[#c5b18a]/35 hover:bg-[#c5b18a]/[0.08] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c5b18a]/70 md:hidden"
          >
            {menuOpen ? (
              <motion.div
                animate={{
                  rotate: 180,
                }}
                transition={{
                  duration: 0.3,
                }}
              >
                <X size={30} />
              </motion.div>
            ) : (
              <motion.div
                animate={{
                  rotate: menuOpen ? 90 : 0,
                }}
                transition={{
                  duration: 0.3,
                }}
              >
                <Menu size={30} />
              </motion.div>
            )}
          </motion.button>
        </nav>
      </header>

      {/* Mobile Overlay */}
      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMenuOpen(false)}
              className="fixed inset-0 z-40 bg-[#080806]/70 backdrop-blur-sm md:hidden"
            />

            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{
                type: "spring",
                damping: 25,
                stiffness: 200,
              }}
              className="fixed top-0 right-0 z-50 h-screen w-[85%] max-w-sm border-l border-[#c5b18a]/[0.16] bg-[#15140f]/[0.98] shadow-[-20px_0_70px_rgba(0,0,0,0.38)] backdrop-blur-2xl md:hidden"
            >
              <div className="flex items-center justify-between p-6 border-b border-zinc-800">
                <h2 className="text-2xl font-black bg-gradient-to-r from-white to-zinc-500 bg-clip-text text-transparent">
                  Navigation
                </h2>

                <button
                  type="button"
                  onClick={() => setMenuOpen(false)}
                  aria-label="Close navigation menu"
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#c5b18a]/20 text-[#d2cabb] transition-colors hover:bg-[#c5b18a]/[0.08] hover:text-[#f0eadf] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c5b18a]/70"
                >
                  <X size={24} />
                </button>
              </div>

              <div
                initial="hidden"
                animate="show"
                variants={{
                  hidden: {},
                  show: {
                    transition: {
                      staggerChildren: 0.08,
                    },
                  },
                }}
                className="flex flex-col p-6 gap-3"
              >
                {navLinks.map((link) => (
                  <NavLink
                    key={link.name}
                    to={link.path}
                    onClick={() => setMenuOpen(false)}
                    className={({ isActive }) =>
                      `px-5 py-4 rounded-2xl font-semibold transition-all duration-300 ${
                        isActive
                          ? "bg-cyan-300/[0.12] text-cyan-100 border border-cyan-300/20"
                          : "bg-white/[0.035] text-zinc-300 border border-white/[0.04] hover:bg-white/[0.07] hover:border-white/[0.08]"
                      }`
                    }
                  >
                    {link.name}
                  </NavLink>
                ))}

                {token ? (
                  <NavLink
                    to="/admin/dashboard"
                    onClick={() => setMenuOpen(false)}
                    className="mt-4 px-5 py-4 rounded-2xl border border-[#c5b18a]/30 bg-gradient-to-r from-[#c5b18a] to-[#948268] text-[#171510] font-semibold text-center shadow-[0_6px_24px_rgba(0,0,0,0.14)]"
                  >
                    Dashboard
                  </NavLink>
                ) : (
                  <Link
                    to="/admin/login"
                    onClick={() => setMenuOpen(false)}
                    className="mt-4 px-5 py-4 rounded-2xl border border-[#c5b18a]/30 bg-gradient-to-r from-[#c5b18a] to-[#948268] text-[#171510] font-semibold text-center shadow-[0_6px_24px_rgba(0,0,0,0.14)]"
                  >
                    Admin Login
                  </Link>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Spacer */}
      <div className="h-20" />
    </>
  );
};

export default Navbar;
