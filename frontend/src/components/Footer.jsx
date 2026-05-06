// components/layout/Footer.jsx

import {
  useEffect,
  useState,
} from "react"

import {
  FaGithub,
  FaLinkedin,
  FaInstagram,
  FaHeart,
} from "react-icons/fa"

import {
  getProfile,
} from "../services/profileService"

const Footer = () => {

  const currentYear =
    new Date().getFullYear()

  const [profile,
    setProfile] =
    useState(null)

  useEffect(() => {

    const fetchProfile =
      async () => {

        try {

          const data =
            await getProfile()

          setProfile(data)

        } catch (error) {

          console.log(error)
        }
      }

    fetchProfile()

  }, [])

  const socialButtonStyles = `
    w-12 h-12
    rounded-2xl
    border border-zinc-800
    bg-zinc-900/50
    flex items-center justify-center
    text-zinc-400
    hover:text-white
    hover:border-zinc-700
    hover:-translate-y-1
    transition-all duration-300
    backdrop-blur-xl
  `

  return (

    <footer className="
    relative
    mt-10
    border-t border-zinc-800
    overflow-hidden
    ">

      {/* BACKGROUND GLOW */}
      <div className="absolute inset-0 pointer-events-none">

        <div className="
        absolute
        left-1/2
        top-0
        -translate-x-1/2
        w-[500px]
        h-[250px]
        bg-pink-500/10
        blur-[120px]
        rounded-full
        " />

      </div>

      <div className="
      relative z-10
      max-w-7xl mx-auto
      px-4 sm:px-6 lg:px-8
      py-8
      ">

        <div className="
        flex flex-col lg:flex-row
        items-center justify-between
        gap-8
        ">

          {/* LEFT */}
          <div className="
          flex items-center gap-2
          text-sm text-zinc-500
          ">

            Built with

            <FaHeart
              size={14}
              className="
              text-pink-500
              animate-pulse
              "
            />

            using React & Node.js

          </div>

          {/* CENTER */}
          <div>

            <p className="
            text-sm
            text-zinc-600
            text-center
            whitespace-nowrap
            ">

              © {currentYear} Portfolio.
              All rights reserved.

            </p>

          </div>

          {/* RIGHT */}
          <div className="flex items-center gap-4">

            {profile?.github && (

              <a
                href={profile.github}
                target="_blank"
                rel="noreferrer"
                className={socialButtonStyles}
              >

                <FaGithub size={18} />

              </a>

            )}

            {profile?.linkedin && (

              <a
                href={profile.linkedin}
                target="_blank"
                rel="noreferrer"
                className={socialButtonStyles}
              >

                <FaLinkedin size={18} />

              </a>

            )}

            {profile?.instagram && (

              <a
                href={profile.instagram}
                target="_blank"
                rel="noreferrer"
                className={socialButtonStyles}
              >

                <FaInstagram size={18} />

              </a>

            )}

          </div>

        </div>

      </div>

    </footer>
  )
}

export default Footer