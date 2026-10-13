import { useCallback, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, RefreshCw } from "lucide-react";
import { FaGithub, FaLinkedin, FaFile } from "react-icons/fa";

import { getProfile } from "../../services/profileService";
import TiltedCard from "../../components/ui/TiltedCard";

const Home = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const loadProfile = useCallback(async () => {
    setLoading(true);
    setError(false);

    try {
      const data = await getProfile();

      if (!data) {
        throw new Error("No profile data was returned.");
      }

      setProfile(data);
    } catch (fetchError) {
      console.error("Profile API unavailable:", fetchError);
      setProfile(null);
      setError(true);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadProfile();
  }, [loadProfile]);

  const initials = (profile?.name || "")
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();

  const shellClass =
    "relative isolate min-h-screen overflow-hidden text-white";

  const backdrop = (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_40%,rgba(34,211,238,0.07),transparent_55%)]" />
      <div className="absolute inset-0 opacity-[0.035] [background-image:linear-gradient(rgba(255,255,255,0.18)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.18)_1px,transparent_1px)] [background-size:56px_56px]" />
      <div className="absolute -left-40 top-[12%] h-80 w-80 rounded-full bg-cyan-500/10 blur-[110px]" />
      <div className="absolute -right-36 bottom-[6%] h-96 w-96 rounded-full bg-violet-500/10 blur-[120px]" />
    </div>
  );

  if (loading) {
    return (
      <section className={shellClass} aria-busy="true" aria-label="Loading profile">
        {backdrop}
        <div className="relative z-10 mx-auto flex min-h-screen max-w-7xl items-center px-4 pb-16 pt-32 sm:px-6 sm:pb-20 lg:px-8">
          <div className="grid w-full items-center gap-12 lg:grid-cols-[minmax(0,1.1fr)_minmax(320px,0.9fr)] lg:gap-16">
            <div className="order-2 space-y-6 lg:order-1">
              <div className="h-8 w-52 animate-pulse rounded-full bg-white/[0.06]" />
              <div className="space-y-3">
                <div className="h-12 w-full max-w-xl animate-pulse rounded-xl bg-white/[0.07] sm:h-16" />
                <div className="h-12 w-4/5 max-w-lg animate-pulse rounded-xl bg-white/[0.05] sm:h-16" />
              </div>
              <div className="space-y-3 pt-2">
                <div className="h-4 w-full max-w-lg animate-pulse rounded bg-white/[0.05]" />
                <div className="h-4 w-11/12 max-w-md animate-pulse rounded bg-white/[0.05]" />
                <div className="h-4 w-3/4 max-w-sm animate-pulse rounded bg-white/[0.05]" />
              </div>
              <div className="flex gap-3 pt-3">
                <div className="h-12 w-32 animate-pulse rounded-2xl bg-white/[0.07]" />
                <div className="h-12 w-28 animate-pulse rounded-2xl bg-white/[0.05]" />
              </div>
            </div>
            <div className="order-1 mx-auto aspect-square w-[min(72vw,390px)] animate-pulse rounded-full border border-white/[0.08] bg-white/[0.035] lg:order-2" />
          </div>
        </div>
      </section>
    );
  }

  if (error || !profile) {
    return (
      <section className={shellClass} aria-live="polite">
        {backdrop}
        <div className="relative z-10 mx-auto flex min-h-screen max-w-7xl items-center justify-center px-4 pb-16 pt-32 sm:px-6 lg:px-8">
          <div className="w-full max-w-md rounded-3xl border border-white/10 bg-zinc-950/60 p-8 text-center shadow-2xl shadow-black/20 backdrop-blur-xl">
            <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl border border-cyan-300/20 bg-cyan-300/[0.08] text-cyan-200">
              <RefreshCw size={22} />
            </div>
            <h1 className="text-2xl font-semibold tracking-tight">Profile unavailable</h1>
            <p className="mt-3 text-sm leading-6 text-zinc-400">
              The profile details could not be loaded. Please try again.
            </p>
            <button
              type="button"
              onClick={loadProfile}
              className="mt-6 inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-400 to-violet-500 px-5 py-3 text-sm font-semibold text-zinc-950 transition duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-cyan-500/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-200 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950"
            >
              <RefreshCw size={16} />
              Try again
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className={shellClass} aria-label="Profile introduction">
      {backdrop}

      <div className="relative z-10 mx-auto flex min-h-screen max-w-7xl items-center px-4 pb-16 pt-32 sm:px-6 sm:pb-20 lg:px-8">
        <div className="grid w-full items-center gap-12 lg:grid-cols-[minmax(0,1.1fr)_minmax(320px,0.9fr)] lg:gap-16 xl:gap-20">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: "easeOut" }}
            className="relative z-20 order-2 text-center lg:order-1 lg:text-left"
          >
            {profile.title && (
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.55 }}
                className="mb-6 inline-flex max-w-full items-center gap-3 rounded-full border border-cyan-300/15 bg-white/[0.035] px-4 py-2.5 text-left text-xs font-medium leading-relaxed tracking-wide text-cyan-100 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] backdrop-blur-xl sm:text-sm"
              >
                <span className="relative flex h-2 w-2 shrink-0">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-300 opacity-50" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-cyan-300" />
                </span>
                <span>{profile.title}</span>
              </motion.div>
            )}

            {profile.name && (
              <motion.h1
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.16, duration: 0.65, ease: "easeOut" }}
                className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight leading-none mb-6"
              >
                <span className="bg-gradient-to-r from-white via-cyan-100 to-violet-300 bg-clip-text text-transparent break-words">
                  {profile.name}
                </span>
              </motion.h1>
            )}


            {profile.bio && (
              <motion.p
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="text-zinc-400 text-sm sm:text-base md:text-lg leading-relaxed max-w-xl md:max-w-2xl mx-auto lg:mx-0 mb-10 text-justify"
              >
                {profile.bio}
              </motion.p>
            )}

            {(profile.resume || profile.github || profile.linkedin) && (
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.32, duration: 0.55 }}
                className="flex flex-col justify-center gap-3 sm:flex-row sm:flex-wrap lg:justify-start"
              >
                {profile.resume && (
                  <a
                    href={profile.resume}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex min-h-12 items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-cyan-300 to-violet-400 px-6 py-3.5 font-semibold text-zinc-950 shadow-lg shadow-cyan-500/[0.12] transition duration-200 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-violet-500/[0.16] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-200 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950"
                  >
                    <FaFile size={17} />
                    Resume
                    <ArrowUpRight size={16} className="transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </a>
                )}

                {profile.github && (
                  <a
                    href={profile.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Visit GitHub profile"
                    className="group inline-flex min-h-12 items-center justify-center gap-3 rounded-2xl border border-white/[0.12] bg-white/[0.035] px-6 py-3.5 font-medium text-zinc-100 backdrop-blur-xl transition duration-200 hover:-translate-y-0.5 hover:border-cyan-200/35 hover:bg-cyan-200/[0.06] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-200 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950"
                  >
                    <FaGithub size={19} className="text-cyan-200" />
                    GitHub
                    <ArrowUpRight size={15} className="text-zinc-500 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-cyan-100" />
                  </a>
                )}

                {profile.linkedin && (
                  <a
                    href={profile.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Visit LinkedIn profile"
                    className="group inline-flex min-h-12 items-center justify-center gap-3 rounded-2xl border border-white/[0.12] bg-white/[0.035] px-6 py-3.5 font-medium text-zinc-100 backdrop-blur-xl transition duration-200 hover:-translate-y-0.5 hover:border-violet-200/35 hover:bg-violet-200/[0.06] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-200 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950"
                  >
                    <FaLinkedin size={18} className="text-violet-200" />
                    LinkedIn
                    <ArrowUpRight size={15} className="text-zinc-500 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-violet-100" />
                  </a>
                )}
              </motion.div>
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.12, ease: "easeOut" }}
            className="order-1 flex justify-center lg:order-2"
          >
            <div className="relative mx-auto w-full max-w-[440px]">
              <div className="absolute inset-[7%] rounded-full bg-gradient-to-br from-cyan-500/20 via-transparent to-violet-500/20 blur-2xl" />
              <div className="absolute inset-[3%] rounded-full border border-white/[0.08]" />
              <div className="absolute inset-0 rounded-full border border-dashed border-cyan-200/[0.16] [transform:rotate(-12deg)]" />
              <div className="absolute right-[13%] top-[8%] h-3 w-3 rounded-full bg-violet-200 shadow-[0_0_24px_rgba(167,139,250,0.65)]" />
              <div className="absolute bottom-[15%] left-[5%] h-2.5 w-2.5 rounded-full bg-cyan-200 shadow-[0_0_22px_rgba(103,232,249,0.65)]" />

              <div className="relative m-[5%] aspect-square overflow-hidden rounded-full border border-white/[0.12] bg-zinc-950/50 p-2 shadow-[0_24px_100px_rgba(0,0,0,0.4)]">
                {profile.profileImage ? (
                  <TiltedCard
                    imageSrc={profile.profileImage}
                    altText={profile.name || "Profile image"}
                    captionText={profile.name || ""}
                    containerHeight="100%"
                    containerWidth="100%"
                    imageHeight="100%"
                    imageWidth="100%"
                    rotateAmplitude={7}
                    scaleOnHover={1.025}
                    showMobileWarning={false}
                    showTooltip={false}
                    displayOverlayContent={false}
                    overlayContent={null}
                    priority={true}
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center rounded-full bg-gradient-to-br from-cyan-400/20 via-zinc-900 to-violet-500/25">
                    <span className="bg-gradient-to-br from-white to-cyan-100 bg-clip-text text-6xl font-bold tracking-tight text-transparent sm:text-7xl">
                      {initials}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Home;
