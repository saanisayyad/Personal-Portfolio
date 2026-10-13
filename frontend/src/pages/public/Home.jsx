import { useEffect, useState } from "react";

import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";

import { getProfile } from "../../services/profileService";

import { FaGithub, FaLinkedin, FaFile } from "react-icons/fa";

import TiltedCard from "../../components/ui/TiltedCard";

// --------------------------------------------------
// FALLBACK PROFILE
// --------------------------------------------------
// This is what visitors see immediately while the
// Render backend is waking up.
//
// If the API is unavailable, the portfolio still works.
const FALLBACK_PROFILE = {
  name: "Mohammadsaani Sayyad",

  title: "Data Analyst | Computer Engineering Graduate",

  bio: "Passionate about data analytics, SQL, Python, Power BI and building meaningful data-driven solutions.",

  github: "https://github.com/saanisayyad",

  linkedin: "",

  resume: "/Mohammadsaani_Resume.pdf",

  profileImage: "",
};

const Home = () => {
  // Start with fallback data instead of null.
  //
  // IMPORTANT:
  // The page can now render immediately without
  // waiting for Render.
  const [profile, setProfile] = useState(FALLBACK_PROFILE);

  // --------------------------------------------------
  // FETCH PROFILE IN BACKGROUND
  // --------------------------------------------------
  useEffect(() => {
    let mounted = true;

    const fetchProfile = async () => {
      try {
        const data = await getProfile();

        // Only update state if component still exists.
        if (mounted && data) {
          setProfile((previous) => ({
            ...previous,
            ...data,
          }));
        }
      } catch (error) {
        console.error("Profile API unavailable:", error);

        // DO NOTHING.
        //
        // The fallback profile is already displayed.
        // Therefore Render being asleep does not
        // block the homepage.
      }
    };

    fetchProfile();

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <section className="relative isolate min-h-[calc(100svh-5rem)] overflow-hidden text-white">
      <div className="relative z-10 mx-auto flex min-h-[calc(100svh-5rem)] max-w-7xl items-center px-5 py-24 sm:px-6 sm:py-28 lg:px-8 lg:py-32">
        <div className="grid w-full grid-cols-1 items-center gap-14 md:gap-16 lg:grid-cols-[1.08fr_0.92fr] lg:gap-16 xl:gap-24">
          {/* ==========================================
              LEFT CONTENT
          ========================================== */}

          <motion.div
            initial={{
              opacity: 0,
              y: 40,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.8,
            }}
            className="relative z-20 order-2 mx-auto w-full max-w-2xl text-center lg:order-1 lg:mx-0 lg:text-left"
          >
            {/* ------------------------------------------
                BADGE
            ------------------------------------------ */}

            <motion.div
              initial={{
                opacity: 0,
                y: 20,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                delay: 0.1,
              }}
              className="mb-7 inline-flex items-center gap-3 rounded-full border border-cyan-300/20 bg-cyan-300/[0.055] px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-cyan-200 shadow-[0_0_32px_rgba(34,211,238,0.045)] sm:text-[11px]"
            >
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
              Personal Portfolio
            </motion.div>

            {/* ------------------------------------------
                NAME
            ------------------------------------------ */}

            <motion.h1
              initial={{
                opacity: 0,
                y: 20,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                delay: 0.2,
                duration: 0.7,
              }}
              className="mb-6 text-4xl font-semibold leading-[1.04] tracking-[-0.055em] text-white sm:text-5xl md:text-6xl lg:text-[4.1rem] xl:text-[4.65rem]"
            >
              <span className="break-words bg-gradient-to-r from-white via-cyan-100 to-white bg-clip-text text-transparent">
                {profile.name}
              </span>
            </motion.h1>

            {/* ------------------------------------------
                TITLE
            ------------------------------------------ */}

            <motion.h2
              initial={{
                opacity: 0,
                y: 20,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                delay: 0.3,
                duration: 0.7,
              }}
              className="mx-auto mb-6 max-w-xl text-base font-medium leading-7 text-zinc-200 sm:text-lg sm:leading-8 md:text-xl lg:mx-0"
            >
              {profile.title}
            </motion.h2>

            {/* ------------------------------------------
                BIO
            ------------------------------------------ */}

            <motion.p
              initial={{
                opacity: 0,
                y: 20,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                delay: 0.4,
                duration: 0.7,
              }}
              className="mx-auto mb-9 max-w-xl text-sm leading-7 text-zinc-400 sm:text-base sm:leading-8 lg:mx-0"
            >
              {profile.bio}
            </motion.p>

            {/* ------------------------------------------
                BUTTONS
            ------------------------------------------ */}

            <motion.div
              initial={{
                opacity: 0,
                y: 20,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                delay: 0.5,
                duration: 0.7,
              }}
              className="flex flex-col justify-center gap-3 sm:flex-row sm:flex-wrap lg:justify-start"
            >
              <Link
                to="/projects"
                className="group inline-flex min-h-12 items-center justify-center gap-3 rounded-full bg-cyan-300 px-6 py-3.5 text-sm font-semibold text-zinc-950 shadow-[0_8px_32px_rgba(34,211,238,0.12)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-cyan-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-200 focus-visible:ring-offset-2 focus-visible:ring-offset-[#09090b]"
              >
                Explore projects
                <ArrowUpRight size={17} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>

              {profile.resume && (
                <a
                  href={profile.resume}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex min-h-12 items-center justify-center gap-2.5 rounded-full border border-white/10 bg-white/[0.035] px-6 py-3.5 text-sm font-semibold text-zinc-100 transition-all duration-200 hover:-translate-y-0.5 hover:border-cyan-300/30 hover:bg-white/[0.07] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-200"
                >
                  <FaFile size={15} className="text-cyan-200" />
                  View résumé
                </a>
              )}

              {profile.github && (
                <a
                  href={profile.github}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Open GitHub profile"
                  className="inline-flex min-h-12 items-center justify-center gap-2.5 rounded-full px-5 py-3.5 text-sm font-medium text-zinc-400 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-200"
                >
                  <FaGithub size={18} />
                  GitHub
                </a>
              )}

              {profile.linkedin && (
                <a
                  href={profile.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex min-h-12 items-center justify-center gap-2.5 rounded-full px-5 py-3.5 text-sm font-medium text-zinc-400 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-200"
                >
                  <FaLinkedin size={18} />
                  LinkedIn
                </a>
              )}
            </motion.div>
          </motion.div>

          {/* ==========================================
              RIGHT IMAGE
          ========================================== */}

          <motion.div
            initial={{
              opacity: 0,
              scale: 0.9,
            }}
            animate={{
              opacity: 1,
              scale: 1,
            }}
            transition={{
              duration: 0.9,
            }}
            className="order-1 flex justify-center lg:order-2"
          >
            <div className="relative isolate">
              {/* Glow */}

              <div aria-hidden="true" className="absolute -inset-5 -z-10 rounded-full bg-gradient-to-br from-cyan-400/15 via-transparent to-violet-500/15 blur-2xl sm:-inset-8" />

              {/* Ring */}

              <div aria-hidden="true" className="absolute -inset-3 rounded-full border border-white/[0.09] sm:-inset-5" />

              {/* Image */}

              {profile.profileImage ? (
                <TiltedCard
                  imageSrc={profile.profileImage}
                  altText={profile.name}
                  captionText={profile.name}
                  containerHeight="min(80vw, 420px)"
                  containerWidth="min(80vw, 420px)"
                  imageHeight="min(80vw, 420px)"
                  imageWidth="min(80vw, 420px)"
                  rotateAmplitude={12}
                  scaleOnHover={1.05}
                  showMobileWarning={false}
                  showTooltip={true}
                  displayOverlayContent={false}
                  overlayContent={null}
                  priority={true}
                />
              ) : (
                <div className="h-[min(72vw,390px)] w-[min(72vw,390px)] rounded-full border border-white/[0.08] bg-gradient-to-br from-zinc-800/70 to-zinc-950 shadow-[0_30px_100px_rgba(0,0,0,0.35)] sm:h-[min(58vw,420px)] sm:w-[min(58vw,420px)]" />
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Home;
