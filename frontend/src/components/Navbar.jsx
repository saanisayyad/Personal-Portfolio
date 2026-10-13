import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

const NAV_LINKS = [
  { name: "Home", path: "/" },
  { name: "Projects", path: "/projects" },
  { name: "Qualifications", path: "/qualifications" },
  { name: "Notes", path: "/notes" },
  { name: "Gallery", path: "/gallery" },
];

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const token = localStorage.getItem("token");

  const adminPath = token ? "/admin/dashboard" : "/admin/login";
  const adminLabel = token ? "Dashboard" : "Admin";

  const closeMenu = () => setMenuOpen(false);

  const desktopLinkClass = ({ isActive }) =>
    `relative isolate rounded-full px-3 py-2.5 text-[13px] font-medium transition-colors duration-200 lg:px-3.5 lg:text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-200 ${
      isActive ? "text-white" : "text-zinc-400 hover:text-zinc-100"
    }`;

  return (
    <>
      <header className="fixed left-1/2 top-3 z-50 w-[calc(100%-24px)] max-w-7xl -translate-x-1/2 sm:top-4 sm:w-[95%]">
        <nav
          aria-label="Main navigation"
          className="relative flex h-[64px] items-center justify-between rounded-full border border-white/[0.10] bg-[#0b0c10]/80 px-3 shadow-[0_14px_45px_rgba(0,0,0,0.32)] backdrop-blur-2xl transition-colors duration-300 hover:border-white/[0.14] sm:h-[68px] sm:px-5 lg:px-6"
        >
          {/* Brand */}
          <Link
            to="/"
            aria-label="Mohammadsaani Sayyad — home"
            onClick={closeMenu}
            className="group/brand flex min-w-0 shrink-0 items-center gap-2.5 rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-200 sm:gap-3"
          >
            <span className="relative flex h-11 w-11 shrink-0 items-center justify-center sm:h-12 sm:w-12">
              <svg
                aria-hidden="true"
                className="absolute inset-0 animate-spin opacity-80 motion-reduce:animate-none"
                viewBox="0 0 100 100"
                style={{
                  animationDuration: "16s",
                  animationTimingFunction: "linear",
                }}
              >
                <defs>
                  <linearGradient id="analyticsRing" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#22D3EE" />
                    <stop offset="55%" stopColor="#3B82F6" />
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
              <img
                src="/logo.webp"
                alt=""
                width="40"
                height="40"
                className="relative h-9 w-9 rounded-full object-cover sm:h-10 sm:w-10"
              />
            </span>

            <span className="flex flex-col justify-center">
              <span className="whitespace-nowrap text-[13px] font-semibold tracking-[-0.025em] text-zinc-100 sm:text-sm">
                Saani Sayyad
              </span>
              <span className="mt-0.5 flex items-center gap-1.5 text-[9px] font-medium uppercase tracking-[0.17em] text-zinc-400 sm:text-[10px] sm:tracking-[0.20em]">
                <span className="h-1.5 w-1.5 rounded-full bg-cyan-300 shadow-[0_0_8px_rgba(34,211,238,0.5)]" />
                Data Analyst
              </span>
            </span>
          </Link>

          {/* Desktop navigation */}
          <div className="hidden items-center gap-0.5 lg:flex xl:gap-1">
            {NAV_LINKS.map((link) => (
              <NavLink key={link.name} to={link.path} end={link.path === "/"} className={desktopLinkClass}>
                {({ isActive }) => (
                  <>
                    {isActive && (
                      <motion.span
                        layoutId="navbar-active-link"
                        transition={{ type: "spring", stiffness: 380, damping: 32 }}
                        className="absolute inset-0 -z-10 rounded-full border border-cyan-300/[0.16] bg-cyan-300/[0.085] shadow-[inset_0_1px_rgba(255,255,255,0.035)]"
                      />
                    )}
                    <span className="relative z-10">{link.name}</span>
                  </>
                )}
              </NavLink>
            ))}
          </div>

          {/* Quiet, non-looping admin action */}
          <div className="hidden shrink-0 lg:block">
            <NavLink
              to={adminPath}
              className="inline-flex min-h-10 items-center justify-center rounded-full border border-cyan-300/20 bg-gradient-to-r from-cyan-300/[0.12] to-violet-400/[0.12] px-4 text-[13px] font-semibold text-zinc-100 shadow-sm transition-all duration-200 hover:-translate-y-px hover:border-cyan-200/35 hover:from-cyan-300/[0.18] hover:to-violet-400/[0.18] hover:shadow-[0_5px_22px_rgba(34,211,238,0.08)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-200 lg:px-5 lg:text-sm"
            >
              {adminLabel}
            </NavLink>
          </div>

          {/* Tablet and mobile menu toggle */}
          <button
            type="button"
            aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation-panel"
            onClick={() => setMenuOpen((open) => !open)}
            className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/[0.08] bg-white/[0.04] text-zinc-100 transition-colors hover:border-cyan-300/25 hover:bg-cyan-300/[0.07] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-200 lg:hidden"
          >
            <AnimatePresence mode="wait" initial={false}>
              {menuOpen ? (
                <motion.span
                  key="close"
                  initial={{ opacity: 0, rotate: -45, scale: 0.85 }}
                  animate={{ opacity: 1, rotate: 0, scale: 1 }}
                  exit={{ opacity: 0, rotate: 45, scale: 0.85 }}
                  transition={{ duration: 0.15 }}
                  className="flex"
                >
                  <X size={20} />
                </motion.span>
              ) : (
                <motion.span
                  key="menu"
                  initial={{ opacity: 0, rotate: 45, scale: 0.85 }}
                  animate={{ opacity: 1, rotate: 0, scale: 1 }}
                  exit={{ opacity: 0, rotate: -45, scale: 0.85 }}
                  transition={{ duration: 0.15 }}
                  className="flex"
                >
                  <Menu size={20} />
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        </nav>
      </header>

      {/* Mobile / tablet navigation */}
      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.button
              type="button"
              aria-label="Close navigation menu"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeMenu}
              className="fixed inset-0 z-[60] cursor-default bg-black/65 backdrop-blur-sm lg:hidden"
            />

            <motion.aside
              id="mobile-navigation-panel"
              role="dialog"
              aria-modal="true"
              aria-label="Navigation menu"
              initial={{ opacity: 0, x: 24, scale: 0.985 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 20, scale: 0.985 }}
              transition={{ type: "spring", damping: 28, stiffness: 260 }}
              className="fixed right-3 top-3 z-[70] flex max-h-[calc(100dvh-24px)] w-[min(360px,calc(100vw-24px))] flex-col overflow-y-auto rounded-[28px] border border-white/[0.10] bg-[#0d0e12]/95 p-5 shadow-[0_28px_90px_rgba(0,0,0,0.55)] backdrop-blur-3xl sm:right-4 sm:top-4 sm:max-h-[calc(100dvh-32px)] lg:hidden"
            >
              <div className="flex items-center justify-between border-b border-white/[0.08] pb-5">
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-cyan-200/80">
                    Portfolio
                  </p>
                  <h2 className="mt-1 text-xl font-semibold tracking-tight text-white">
                    Navigation
                  </h2>
                </div>
                <button
                  type="button"
                  onClick={closeMenu}
                  aria-label="Close navigation menu"
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/[0.08] bg-white/[0.04] text-zinc-300 transition-colors hover:bg-white/[0.09] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-200"
                >
                  <X size={19} />
                </button>
              </div>

              <nav aria-label="Mobile navigation" className="flex flex-col gap-2 py-5">
                {NAV_LINKS.map((link) => (
                  <NavLink
                    key={link.name}
                    to={link.path}
                    end={link.path === "/"}
                    onClick={closeMenu}
                    className={({ isActive }) =>
                      `flex min-h-12 items-center justify-between rounded-2xl border px-4 py-3 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-200 ${
                        isActive
                          ? "border-cyan-300/20 bg-cyan-300/[0.09] text-cyan-100"
                          : "border-transparent bg-white/[0.025] text-zinc-300 hover:border-white/[0.07] hover:bg-white/[0.055] hover:text-white"
                      }`
                    }
                  >
                    {({ isActive }) => (
                      <>
                        <span>{link.name}</span>
                        {isActive && <span className="h-1.5 w-1.5 rounded-full bg-cyan-300" />}
                      </>
                    )}
                  </NavLink>
                ))}

                <NavLink
                  to={adminPath}
                  onClick={closeMenu}
                  className="mt-2 inline-flex min-h-12 items-center justify-center rounded-2xl border border-cyan-300/20 bg-gradient-to-r from-cyan-300/[0.12] to-violet-400/[0.12] px-4 py-3 text-sm font-semibold text-white transition-colors hover:border-cyan-200/35 hover:from-cyan-300/[0.18] hover:to-violet-400/[0.18] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-200"
                >
                  {token ? "Open dashboard" : "Admin login"}
                </NavLink>
              </nav>

              <p className="mt-auto border-t border-white/[0.07] pt-4 text-xs text-zinc-500">
                Mohammadsaani Sayyad <span className="px-1 text-zinc-700">·</span> Data Analyst
              </p>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      <div className="h-20" aria-hidden="true" />
    </>
  );
};

export default Navbar;
