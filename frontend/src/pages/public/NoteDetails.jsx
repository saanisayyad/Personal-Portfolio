import {
  useEffect,
  useState,
} from "react"

import {
  useParams,
  Link,
} from "react-router-dom"

import {
  motion,
} from "framer-motion"

import {
  ArrowLeft,
  CalendarDays,
  FileText,
} from "lucide-react"

import {
  getNoteBySlug,
} from "../../services/noteService"

const NoteDetails = () => {

  const { slug } =
    useParams()

  const [note, setNote] =
    useState(null)

  const [loading,
    setLoading] =
    useState(true)

  const fetchNote =
    async () => {

      try {

        const data =
          await getNoteBySlug(slug)

        setNote(data)

      } catch (error) {

        console.log(error)

      } finally {

        setLoading(false)
      }
    }

  useEffect(() => {

    fetchNote()

  }, [])

  /* Loading */
  if (loading) {

    return (

      <div className="min-h-screen flex justify-center items-center text-white">

        <div className="w-14 h-14 border-4 border-t-pink-500 border-zinc-800 rounded-full animate-spin" />

      </div>

    )
  }

  if (!note) return null

  return (

    <section className="relative min-h-screen text-white py-28 px-4 sm:px-6 lg:px-8">

      <div className="max-w-5xl mx-auto">

        {/* Back Button */}
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
            duration: 0.5,
          }}
          className="mb-10"
        >

          <Link
            to="/notes"
            className="inline-flex items-center gap-3 text-zinc-400 hover:text-white transition-colors duration-300"
          >

            <ArrowLeft size={18} />

            Back to Notes

          </Link>

        </motion.div>

        {/* Article Card */}
        <motion.article
          initial={{
            opacity: 0,
            y: 40,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.7,
          }}
          className="relative overflow-hidden rounded-[2.5rem] border border-zinc-800 bg-zinc-900/40 backdrop-blur-xl p-6 sm:p-10 lg:p-14"
        >

          {/* Glow */}
          <div className="absolute inset-0 bg-gradient-to-br from-pink-500/5 via-transparent to-orange-500/5 pointer-events-none" />

          {/* Top Meta */}
          <div className="relative z-10 flex flex-wrap items-center gap-4 mb-8">

            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-zinc-800/70 border border-zinc-700 text-pink-400 text-xs uppercase tracking-[0.2em]">

              <FileText size={14} />

              Article

            </div>

            <div className="inline-flex items-center gap-2 text-zinc-500 text-sm">

              <CalendarDays size={16} />

              {new Date(
                note.createdAt
              ).toLocaleDateString()}

            </div>

          </div>

          {/* Title */}
          <h1 className="relative z-10 text-4xl sm:text-5xl lg:text-6xl font-black leading-tight tracking-tight bg-gradient-to-r from-white via-pink-200 to-orange-300 bg-clip-text text-transparent mb-10">

            {note.title}

          </h1>

          {/* Divider */}
          <div className="relative z-10 h-px w-full bg-gradient-to-r from-pink-500/30 via-zinc-800 to-orange-500/30 mb-10" />

          {/* Content */}
          <div className="relative z-10">

            <p className="text-zinc-300 leading-[2.1] whitespace-pre-wrap text-base sm:text-lg lg:text-xl text-justify">

              {note.content}

            </p>

          </div>

        </motion.article>

      </div>

    </section>
  )
}

export default NoteDetails