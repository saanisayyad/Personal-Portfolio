import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";
import {
  FaGithub,
  FaLinkedin,
  FaInstagram,
  FaHeart,
} from "react-icons/fa";

import { getProfile } from "../services/profileService";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await getProfile();
        setProfile(data);
      } catch (error) {
        console.error("Unable to load footer profile links:", error);
      }
    };

    fetchProfile();
  }, []);

  const socialButtonStyles =
    "inline-flex h-11 w-11 items-center justify-center rounded-xl border border-white/[0.09] bg-white/[0.035] text-zinc-400 transition-all duration-200 hover:-translate-y-0.5 hover:border-cyan-300/25 hover:bg-cyan-300/[0.07] hover:text-cyan-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300/60";

  return (
    <footer
      id="footer"
      className="relative mt-10 overflow-hidden border-t border-white/[0.07]"
    >
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute left-1/2 top-0 h-56 w-[min(500px,90vw)] -translate-x-1/2 rounded-full bg-cyan-500/[0.07] blur-[110px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 py-7 sm:px-6 lg:px-8">
        <div>
          <div className="flex flex-col items-center justify-between gap-5 sm:flex-row">
            <div className="text-center sm:text-left">
              <p className="text-lg font-semibold tracking-tight text-zinc-100">
                Portfolio
              </p>
              <p className="mt-1 text-sm text-zinc-500">
                Turning data into insights.
              </p>
            </div>

            <div className="flex items-center gap-2.5">
              {profile?.github && (
                <a
                  href={profile.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub profile"
                  className={socialButtonStyles}
                >
                  <FaGithub size={18} aria-hidden="true" />
                </a>
              )}

              {profile?.linkedin && (
                <a
                  href={profile.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn profile"
                  className={socialButtonStyles}
                >
                  <FaLinkedin size={18} aria-hidden="true" />
                </a>
              )}

              {profile?.instagram && (
                <a
                  href={profile.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram profile"
                  className={socialButtonStyles}
                >
                  <FaInstagram size={18} aria-hidden="true" />
                </a>
              )}
            </div>
          </div>

          <div className="my-5 h-px w-full bg-gradient-to-r from-transparent via-white/[0.09] to-transparent" />

          <div className="grid grid-cols-1 items-center gap-4 text-center sm:grid-cols-3 sm:gap-4 sm:text-left">
            <p className="inline-flex flex-wrap items-center justify-center gap-1.5 text-xs text-zinc-500 sm:justify-start sm:justify-self-start">
              <span>Built with</span>
              <FaHeart
                size={12}
                className="text-cyan-300"
                aria-label="love"
                role="img"
              />
              <span>using React &amp; Node.js</span>
            </p>

            <p className="text-xs text-zinc-600 sm:justify-self-center sm:whitespace-nowrap">
              © {currentYear} Portfolio. All rights reserved.
            </p>

            <button
              type="button"
              onClick={() =>
                window.scrollTo({ top: 0, behavior: "smooth" })
              }
              aria-label="Back to top"
              title="Back to top"
              className="inline-flex h-9 w-9 items-center justify-center justify-self-center rounded-full border border-white/[0.09] bg-white/[0.035] text-zinc-400 transition-all duration-200 hover:-translate-y-0.5 hover:border-cyan-300/25 hover:bg-cyan-300/[0.08] hover:text-cyan-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300/60 sm:justify-self-end"
            >
              <ArrowUp size={16} aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
