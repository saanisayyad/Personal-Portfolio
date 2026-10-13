import { useState } from "react";

import { Link, NavLink } from "react-router-dom";

import { Menu, X } from "lucide-react";

import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
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
    border-white/[0.09]
    bg-[#0b0c10]/75
    backdrop-blur-3xl
    shadow-[0_16px_50px_rgba(0,0,0,0.36)]
    transition-all
    duration-300
    hover:border-white/[0.14]"
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
                className="absolute inset-0 animate-spin"
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
                    <stop offset="0%" stopColor="#06B6D4" />
                    <stop offset="50%" stopColor="#3B82F6" />
                    <stop offset="100%" stopColor="#8B5CF6" />
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

            {/* Right Side */}
            <div className="flex flex-col justify-center">
              {/* Animated Line Chart */}
              <svg
                width="55"
                height="18"
                viewBox="0 0 55 18"
                className="overflow-visible"
              >
                <polyline
                  fill="none"
                  stroke="#22d3ee"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  points="2,14 12,10 22,13 34,5 52,8"
                >
                  <animate
                    attributeName="points"
                    dur="2.5s"
                    repeatCount="indefinite"
                    values="
            2,14 12,10 22,13 34,5 52,8;
            2,13 12,7 22,11 34,3 52,6;
            2,14 12,10 22,13 34,5 52,8"
                  />
                </polyline>

                {/* Pulsing Last Point */}
                <circle cx="52" cy="8" r="2.5" fill="#22d3ee">
                  <animate
                    attributeName="r"
                    values="2.5;4;2.5"
                    dur="2s"
                    repeatCount="indefinite"
                  />
                </circle>
              </svg>

              {/* Subtitle */}
              <span className="mt-1 text-[10px] md:text-xs uppercase tracking-[0.35em] text-gray-400">
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
                    isActive ? "text-white" : "text-zinc-400 hover:text-zinc-100"
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
                          bg-cyan-300/[0.08]
                          border
                          border-cyan-300/[0.18]
                          shadow-[0_0_20px_rgba(34,211,238,0.08)]
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
text-white
shadow-[0_4px_18px_rgba(59,130,246,0.12)]
bg-gradient-to-r
from-cyan-500
via-blue-500
to-violet-500
bg-[length:200%]
transition-all
duration-300
hover:scale-[1.03]
hover:shadow-[0_6px_24px_rgba(34,211,238,0.16)]
"
              >
                <span className="relative z-10">Dashboard</span>

                <motion.div
                  animate={{
                    backgroundPosition: ["0%", "100%", "0%"],
                  }}
                  transition={{
                    repeat: Infinity,
                    duration: 5,
                  }}
                  className="
    absolute
    inset-0
    bg-gradient-to-r
    from-cyan-500
    via-blue-500
    to-violet-500
    bg-[length:200%]
  "
                />
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
text-white
shadow-[0_4px_18px_rgba(59,130,246,0.12)]
bg-gradient-to-r
from-cyan-500
via-blue-500
to-violet-500
bg-[length:200%]
transition-all
duration-300
hover:scale-[1.03]
hover:shadow-[0_6px_24px_rgba(34,211,238,0.16)]
"
              >
                <span className="relative z-10">Admin</span>

                <motion.div
                  animate={{
                    backgroundPosition: ["0%", "100%", "0%"],
                  }}
                  transition={{
                    repeat: Infinity,
                    duration: 5,
                  }}
                  className="
    absolute
    inset-0
    bg-gradient-to-r
    from-cyan-500
    via-blue-500
    to-violet-500
    bg-[length:200%]
  "
                />
              </NavLink>
            )}
          </div>

          {/* Mobile Button */}
          <motion.button
            whileTap={{
              scale: 0.9,
            }}
            onClick={() => setMenuOpen(!menuOpen)}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/[0.09] bg-white/[0.045] text-white transition-colors hover:border-cyan-300/25 hover:bg-cyan-300/[0.07] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300/60 md:hidden"
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
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden"
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
              className="fixed top-0 right-0 w-[85%] max-w-sm h-screen bg-[#0c0d12]/95 backdrop-blur-3xl border-l border-white/[0.10] shadow-[-20px_0_70px_rgba(0,0,0,0.32)] z-50 md:hidden"
            >
              <div className="flex items-center justify-between p-6 border-b border-zinc-800">
                <h2 className="text-2xl font-black bg-gradient-to-r from-white to-zinc-500 bg-clip-text text-transparent">
                  Navigation
                </h2>

                <button onClick={() => setMenuOpen(false)}>
                  <X size={30} />
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
                    className="mt-4 px-5 py-4 rounded-2xl border border-cyan-300/20 bg-gradient-to-r from-cyan-500/90 to-violet-500/90 text-white font-semibold text-center shadow-[0_6px_24px_rgba(34,211,238,0.08)]"
                  >
                    Dashboard
                  </NavLink>
                ) : (
                  <Link
                    to="/admin/login"
                    onClick={() => setMenuOpen(false)}
                    className="mt-4 px-5 py-4 rounded-2xl border border-cyan-300/20 bg-gradient-to-r from-cyan-500/90 to-violet-500/90 text-white font-semibold text-center shadow-[0_6px_24px_rgba(34,211,238,0.08)]"
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
