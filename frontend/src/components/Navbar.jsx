import { useState } from "react"

import {
  Link,
  NavLink,
} from "react-router-dom"

import {
  Menu,
  X,
} from "lucide-react"

import {
  motion,
  AnimatePresence,
} from "framer-motion"

const Navbar = () => {

  const [menuOpen,
    setMenuOpen] =
    useState(false)

  const token =
    localStorage.getItem("token")

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
  ]

  return (
    <>

      {/* Navbar */}
      <header className="fixed top-0 left-0 w-full z-50 border-b border-white/5 bg-black/40 backdrop-blur-2xl">

        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">

          {/* Logo */}
          <NavLink
            to="/"
            className="relative group"
          >

            <h1 className="text-2xl md:text-3xl font-black tracking-tight bg-gradient-to-r from-white via-pink-300 to-orange-300 bg-clip-text text-transparent">
              MDS
            </h1>

            <div className="absolute -bottom-1 left-0 w-0 h-[2px] bg-gradient-to-r from-pink-500 to-orange-500 transition-all duration-300 group-hover:w-full" />

          </NavLink>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-2">

            {navLinks.map((link) => (

              <NavLink
                key={link.name}
                to={link.path}
                className={({ isActive }) =>
                  `relative px-5 py-3 rounded-full text-sm font-semibold transition-all duration-300 ${
                    isActive
                      ? "text-white"
                      : "text-zinc-400 hover:text-white"
                  }`
                }
              >

                {({ isActive }) => (
                  <>

                    {isActive && (
                      <motion.div
                        layoutId="navbar-pill"
                        transition={{
                          type: "spring",
                          duration: 0.6,
                        }}
                        className="absolute inset-0 rounded-full bg-white/10 border border-white/10"
                      />
                    )}

                    <span className="relative z-10">
                      {link.name}
                    </span>

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
                className="group relative overflow-hidden px-6 py-3 rounded-full font-semibold text-sm bg-white text-black transition-all duration-300 hover:scale-105 active:scale-95"
              >

                <span className="relative z-10">
                  Dashboard
                </span>

                <div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-orange-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              </NavLink>

            ) : (

              <NavLink
                to="/admin/login"
                className="group relative overflow-hidden px-6 py-3 rounded-full font-semibold text-sm bg-white text-black transition-all duration-300 hover:scale-105 active:scale-95"
              >

                <span className="relative z-10">
                  Admin
                </span>

                <div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-orange-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              </NavLink>

            )}

          </div>

          {/* Mobile Button */}
          <button
            onClick={() =>
              setMenuOpen(!menuOpen)
            }
            className="md:hidden text-white"
          >

            {menuOpen ? (
              <X size={32} />
            ) : (
              <Menu size={32} />
            )}

          </button>

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
              onClick={() =>
                setMenuOpen(false)
              }
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
              className="fixed top-0 right-0 w-[85%] max-w-sm h-screen bg-[#09090b] border-l border-zinc-800 z-50 md:hidden"
            >

              <div className="flex items-center justify-between p-6 border-b border-zinc-800">

                <h2 className="text-2xl font-black bg-gradient-to-r from-white to-zinc-500 bg-clip-text text-transparent">
                  Navigation
                </h2>

                <button
                  onClick={() =>
                    setMenuOpen(false)
                  }
                >
                  <X size={30} />
                </button>

              </div>

              <div className="flex flex-col p-6 gap-3">

                {navLinks.map((link) => (

                  <NavLink
                    key={link.name}
                    to={link.path}
                    onClick={() =>
                      setMenuOpen(false)
                    }
                    className={({ isActive }) =>
                      `px-5 py-4 rounded-2xl font-semibold transition-all duration-300 ${
                        isActive
                          ? "bg-white text-black"
                          : "bg-zinc-900 text-zinc-300 hover:bg-zinc-800"
                      }`
                    }
                  >
                    {link.name}
                  </NavLink>

                ))}

                {token ? (

                  <NavLink
                    to="/admin/dashboard"
                    onClick={() =>
                      setMenuOpen(false)
                    }
                    className="mt-4 px-5 py-4 rounded-2xl bg-gradient-to-r from-pink-500 to-orange-500 text-white font-bold text-center"
                  >
                    Dashboard
                  </NavLink>

                ) : (

                  <Link
                    to="/admin/login"
                    onClick={() =>
                      setMenuOpen(false)
                    }
                    className="mt-4 px-5 py-4 rounded-2xl bg-gradient-to-r from-pink-500 to-orange-500 text-white font-bold text-center"
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
  )
}

export default Navbar