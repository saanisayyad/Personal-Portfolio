// pages/public/Notes.jsx

import {
  useEffect,
  useState,
} from "react"

import {
  Link,
} from "react-router-dom"

import {
  motion,
} from "framer-motion"

import {
  FileText,
  ArrowUpRight,
} from "lucide-react"

import {
  getNotes,
} from "../../services/noteService"

import PageHeader
  from "../../components/ui/PageHeader"

import GlassCard
  from "../../components/ui/GlassCard"

const Notes = () => {

  const [notes, setNotes] =
    useState([])

  const [loading,
    setLoading] =
    useState(true)

  const fetchNotes =
    async () => {

      try {

        const data =
          await getNotes()

        setNotes(data)

      } catch (error) {

        console.log(error)

      } finally {

        setLoading(false)
      }
    }

  useEffect(() => {

    fetchNotes()

  }, [])

  return (

    <section className="min-h-screen text-white py-28 px-4 sm:px-6 lg:px-8">

      <div className="max-w-7xl mx-auto">

        <PageHeader
          badge="Thoughts & Articles"
          title="Notes"
          description="
          A collection of thoughts,
          learnings, development notes
          and technical articles.
          "
        />

        {loading ? (

          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">

            {[...Array(6)].map((_, i) => (

              <div
                key={i}
                className="h-72 rounded-3xl border border-zinc-800 bg-zinc-900/40 animate-pulse"
              />

            ))}

          </div>

        ) : notes.length === 0 ? (

          <div className="flex flex-col items-center justify-center py-32 border border-dashed border-zinc-800 rounded-[2rem] text-zinc-500">

            <FileText
              size={54}
              className="mb-5 opacity-30"
            />

            <h2 className="text-2xl font-bold mb-2">

              No Notes Yet

            </h2>

            <p className="text-sm text-zinc-600">

              Notes will appear here once added.

            </p>

          </div>

        ) : (

          <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-6">

            {notes.map(
              (note, index) => (

                <motion.div
                  key={note._id}
                  initial={{
                    opacity: 0,
                    y: 40,
                  }}
                  whileInView={{
                    opacity: 1,
                    y: 0,
                  }}
                  viewport={{
                    once: true,
                  }}
                  transition={{
                    duration: 0.7,
                    delay:
                      index * 0.05,
                  }}
                >

                  <Link
                    to={`/notes/${note.slug}`}
                  >

                    <GlassCard className="h-full p-7">

                      {/* Top */}
                      <div className="flex items-center justify-between mb-6">

                        <div className="w-14 h-14 rounded-2xl bg-zinc-800/70 border border-zinc-700 flex items-center justify-center text-pink-400">

                          <FileText size={20} />

                        </div>

                        <div className="text-zinc-600 group-hover:text-white transition-colors duration-300">

                          <ArrowUpRight size={20} />

                        </div>

                      </div>

                      {/* Title */}
                      <h2 className="text-2xl font-bold text-white leading-tight mb-4 group-hover:text-pink-200 transition-colors duration-300">

                        {note.title}

                      </h2>

                      {/* Content */}
                      <p className="text-zinc-500 leading-relaxed text-sm line-clamp-4 mb-8 text-justify">

                        {note.content}

                      </p>

                      {/* Footer */}
                      <div className="mt-auto pt-6 border-t border-zinc-800 flex items-center justify-between">

                        <span className="text-xs uppercase tracking-[0.2em] text-zinc-600">

                          Read Article

                        </span>

                        <span className="text-xs text-zinc-500">

                          {new Date(
                            note.createdAt
                          ).toLocaleDateString()}

                        </span>

                      </div>

                    </GlassCard>

                  </Link>

                </motion.div>

              )
            )}

          </div>

        )}

      </div>

    </section>
  )
}

export default Notes