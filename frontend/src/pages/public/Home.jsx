import { useEffect, useState } from "react"

import { motion } from "framer-motion"

import { getProfile }
  from "../../services/profileService"

import {
  FaGithub,
  FaLinkedin,
  FaFile,
  FaInstagram,
  FaArrowRight,
} from "react-icons/fa"

const Home = () => {

  const [profile,
    setProfile] =
    useState(null)

  const [loading,
    setLoading] =
    useState(true)

  const fetchProfile =
    async () => {

      try {

        const data =
          await getProfile()

        setProfile(data)

      } catch (error) {

        console.error(error)

      } finally {

        setLoading(false)
      }
    }

  useEffect(() => {

    fetchProfile()

  }, [])

  if (loading) {

    return (

      <div className="flex justify-center items-center min-h-screen bg-[#09090b]">

        <div className="w-14 h-14 border-4 border-t-pink-500 border-zinc-800 rounded-full animate-spin" />

      </div>

    )
  }

  if (!profile) return null

  return (

    <section className="relative min-h-screen overflow-hidden text-white">

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 min-h-screen flex items-center py-28 md:py-20">

        <div className="grid lg:grid-cols-2 gap-12 md:gap-16 lg:gap-20 xl:gap-28 items-center w-full">

          {/* LEFT CONTENT */}
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

            {/* Badge */}
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
              className="inline-flex items-center gap-3 px-5 py-2 rounded-full border border-pink-500/20 bg-white/5 backdrop-blur-md text-pink-400 text-xs uppercase tracking-[0.25em] mb-8"
            >

              <span className="w-2 h-2 rounded-full bg-pink-500 animate-pulse" />

              Personal Portfolio

            </motion.div>

            {/* Name */}
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

              <span className="bg-gradient-to-r from-white via-pink-200 to-orange-300 bg-clip-text text-transparent break-words">

                {profile.name}

              </span>

            </motion.h1>

            {/* Title */}
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
              className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-zinc-300 font-medium mb-8 leading-relaxed"
            >

              {profile.title}

            </motion.h2>

            {/* Bio */}
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
              className="text-zinc-400 text-sm sm:text-base md:text-lg leading-relaxed max-w-xl md:max-w-2xl mx-auto lg:mx-0 mb-10"
            >

              {profile.bio}

            </motion.p>

            {/* Buttons */}
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

              {profile.linkedin && (

                <a
                  href={profile.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="group inline-flex items-center justify-center gap-3 px-7 py-4 rounded-full border border-zinc-700 bg-zinc-900/70 hover:bg-zinc-800 transition-all duration-300"
                >

                  <FaLinkedin
                    size={20}
                    className="text-pink-400"
                  />

                  LinkedIn

                </a>

              )}

              {profile.resume && (

                <a
                  href={profile.resume}
                  target="_blank"
                  rel="noreferrer"
                  className="group inline-flex items-center justify-center gap-3 px-7 py-4 rounded-full bg-gradient-to-r from-pink-500 to-orange-500 font-semibold hover:scale-105 transition-all duration-300 shadow-lg shadow-pink-500/20"
                >

                  <FaFile size={18} />

                  Resume

                </a>

              )}

            </motion.div>

          </motion.div>

          {/* RIGHT IMAGE */}
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
              <div className="absolute inset-0 bg-gradient-to-r from-pink-500 via-fuchsia-500 to-orange-500 blur-3xl opacity-20 rounded-full scale-110" />

              {/* Ring */}
              <div className="absolute inset-0 rounded-full border border-white/10 scale-110" />

              {/* Image */}
              <img
                src={profile.profileImage}
                alt={profile.name}
                className="relative object-cover rounded-full border border-white/10 shadow-2xl
                w-44 h-44
                sm:w-56 sm:h-56
                md:w-75 md:h-75
                lg:w-90 lg:h-90
                xl:w-105 xl:h-105"
              />

            </div>

          </motion.div>

        </div>

      </div>

    </section>
    
      
  )
}

export default Home