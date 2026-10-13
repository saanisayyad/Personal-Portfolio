import { useEffect, useState } from "react";

import { motion } from "framer-motion";

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
    <section className="relative min-h-screen overflow-hidden text-white">
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 min-h-screen flex items-center py-16 sm:py-20 md:py-20">
        <div className="grid lg:grid-cols-2 gap-10 md:gap-14 lg:gap-20 items-center w-full">
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
            className="text-center lg:text-left order-2 lg:order-1 relative z-20"
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
              className="inline-flex items-center gap-3 px-5 py-2 rounded-full border border-cyan-500/20 bg-white/5 backdrop-blur-md text-cyan-300 text-xs uppercase tracking-[0.25em] mb-8"
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
              className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight leading-none mb-6"
            >
              <span className="bg-gradient-to-r from-white via-cyan-100 to-violet-300 bg-clip-text text-transparent break-words">
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
              className="text-lg sm:text-xl md:text-2xl lg:text-2xl text-zinc-300 font-medium max-w-xl md:max-w-2xl mx-auto lg:mx-0 mb-8 leading-relaxed text-justify"
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
              className="text-zinc-400 text-sm sm:text-base md:text-lg leading-relaxed max-w-xl md:max-w-2xl mx-auto lg:mx-0 mb-10 text-justify"
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
              className="flex flex-col sm:flex-row flex-wrap justify-center lg:justify-start gap-4"
            >
              {/* GitHub */}

              {profile.github && (
                <a
                  href={profile.github}
                  target="_blank"
                  rel="noreferrer"
                  className="group inline-flex items-center justify-center gap-3 px-7 py-4 rounded-full bg-white text-black font-semibold hover:scale-105 transition-all duration-300"
                >
                  <FaGithub size={20} />
                  GitHub
                </a>
              )}

              {/* LinkedIn */}

              {profile.linkedin && (
                <a
                  href={profile.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="group inline-flex items-center justify-center gap-3 px-7 py-4 rounded-full border border-zinc-700 bg-zinc-900/70 hover:scale-105 transition-all duration-300"
                >
                  <FaLinkedin size={20} className="text-cyan-300" />
                  LinkedIn
                </a>
              )}

              {/* Resume */}

              {profile.resume && (
                <a
                  href={profile.resume}
                  target="_blank"
                  rel="noreferrer"
                  className="group inline-flex items-center justify-center gap-3 px-7 py-4 rounded-full bg-gradient-to-r from-cyan-500 to-violet-500 font-semibold hover:scale-105 transition-all duration-300 shadow-lg shadow-cyan-500/20"
                >
                  <FaFile size={18} />
                  Resume
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
            className="flex justify-center order-1 lg:order-2"
          >
            <div className="relative">
              {/* Glow */}

              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-violet-500 to-violet-500 blur-3xl opacity-20 rounded-full scale-110" />

              {/* Ring */}

              <div className="absolute inset-0 rounded-full border border-white/10 scale-110" />

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
                <div className="w-[min(80vw,420px)] h-[min(80vw,420px)] rounded-full bg-zinc-900/50 border border-zinc-800" />
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Home;
