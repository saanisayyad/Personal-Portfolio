import { useEffect, useState } from "react"

import {
  Plus,
  Trash2,
  FileText,
  Hash,
  AlertCircle,
  X,
  Check,
} from "lucide-react"

import {
  getNotes,
  createNote,
  deleteNote,
  updateNote,
} from "../../services/noteService"

const ManageNotes = () => {

  const [title, setTitle] =
    useState("")

  const [content, setContent] =
    useState("")

  const [notes, setNotes] =
    useState([])

  const [isSubmitting,
    setIsSubmitting] =
    useState(false)

  const [confirmDeleteId,
    setConfirmDeleteId] =
    useState(null)

  const [editingNoteId,
    setEditingNoteId] =
    useState(null)

  const fetchNotes =
    async () => {

      try {

        const data =
          await getNotes()

        setNotes(data)

      } catch (error) {

        console.error(
          "Failed to fetch notes:",
          error
        )
      }
    }

  useEffect(() => {

    fetchNotes()

  }, [])

  const handleCreate =
    async (e) => {

      e.preventDefault()

      if (
        !title.trim() ||
        !content.trim()
      ) return

      setIsSubmitting(true)

      try {

        // UPDATE MODE
        if (editingNoteId) {

          await updateNote(
            editingNoteId,
            {
              title,
              content,
            }
          )

        } else {

          // CREATE MODE
          await createNote({
            title,
            content,
          })
        }

        setTitle("")
        setContent("")

        setEditingNoteId(
          null
        )

        fetchNotes()

      } catch (error) {

        console.log(error)

        alert(
          "Operation Failed"
        )

      } finally {

        setIsSubmitting(false)
      }
    }

  const handleDelete =
    async (id) => {

      try {

        await deleteNote(id)

        setNotes(
          notes.filter(
            (n) =>
              n._id !== id
          )
        )

        setConfirmDeleteId(
          null
        )

      } catch (error) {

        alert(
          "Delete Failed"
        )
      }
    }

  const handleEdit =
    (note) => {

      setEditingNoteId(
        note._id
      )

      setTitle(
        note.title
      )

      setContent(
        note.content
      )

      window.scrollTo({
        top: 0,
        behavior: "smooth",
      })
    }

  return (
    <div className="min-h-screen bg-[#09090b] text-zinc-100 pb-20">

      <div className="max-w-7xl mx-auto px-4 md:px-6 pt-8 md:pt-12">

        {/* Header */}
        <header className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between mb-12">

          <div>

            <h1 className="text-3xl md:text-5xl font-black tracking-tight bg-gradient-to-br from-white to-zinc-500 bg-clip-text text-transparent">

              Notes Workspace

            </h1>

            <p className="text-zinc-500 mt-2 font-medium italic text-sm md:text-base">

              Capture your thoughts instantly.

            </p>

          </div>

          <div className="flex items-center gap-3 bg-zinc-900/50 border border-zinc-800 px-5 py-3 rounded-2xl shadow-xl backdrop-blur-md w-fit">

            <div className="bg-blue-500/10 p-2 rounded-lg text-blue-400">

              <Hash size={20} />

            </div>

            <div>

              <p className="text-[10px] uppercase tracking-widest text-zinc-500 font-bold">

                Total Notes

              </p>

              <p className="text-xl font-mono font-bold leading-none">

                {notes.length}

              </p>

            </div>

          </div>

        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-10 items-start">

          {/* Left Form */}
          <aside className="lg:col-span-4 lg:sticky lg:top-8">

            <form
              onSubmit={handleCreate}
              className="bg-zinc-900/40 border border-zinc-800 p-5 md:p-8 rounded-3xl md:rounded-[2.5rem] space-y-5 backdrop-blur-xl"
            >

              <div className="flex items-center gap-2 mb-2">

                <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />

                <h2 className="text-xs md:text-sm font-bold uppercase tracking-widest text-zinc-400">

                  {editingNoteId
                    ? "Edit Note"
                    : "Draft New Note"
                  }

                </h2>

              </div>

              <input
                type="text"
                placeholder="Brief title..."
                value={title}
                onChange={(e) =>
                  setTitle(
                    e.target.value
                  )
                }
                className="w-full bg-black/40 border border-zinc-800 rounded-2xl px-4 md:px-5 py-4 outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all placeholder:text-zinc-700 text-sm md:text-base"
              />

              <div className="relative">

                <textarea
                  rows="6"
                  placeholder="Start typing your ideas..."
                  value={content}
                  onChange={(e) =>
                    setContent(
                      e.target.value
                    )
                  }
                  className="w-full bg-black/40 border border-zinc-800 rounded-2xl px-4 md:px-5 py-4 outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all placeholder:text-zinc-700 resize-none text-sm md:text-base"
                />

                <div className="absolute bottom-4 right-4 text-[10px] font-mono text-zinc-600">

                  {content.length} chars

                </div>

              </div>

              <button
                disabled={
                  isSubmitting ||
                  !title.trim()
                }
                className="w-full bg-white hover:bg-zinc-200 disabled:bg-zinc-800 disabled:text-zinc-600 text-black py-4 rounded-2xl font-black flex items-center justify-center gap-2 transition-all active:scale-95 shadow-lg shadow-white/5 text-sm md:text-base"
              >

                {isSubmitting ? (

                  <span className="animate-pulse">

                    Saving...

                  </span>

                ) : (

                  <>
                    <Plus
                      size={18}
                      strokeWidth={3}
                    />

                    {editingNoteId
                      ? "Update Note"
                      : "Create Note"
                    }

                  </>

                )}

              </button>

              {editingNoteId && (

                <button
                  type="button"
                  onClick={() => {

                    setEditingNoteId(
                      null
                    )

                    setTitle("")

                    setContent("")
                  }}
                  className="w-full bg-zinc-800 hover:bg-zinc-700 py-4 rounded-2xl font-bold transition-all text-sm md:text-base"
                >

                  Cancel Editing

                </button>

              )}

            </form>

          </aside>

          {/* Notes */}
          <main className="lg:col-span-8 space-y-6">

            {notes.length === 0 ? (

              <div className="flex flex-col items-center justify-center py-20 md:py-32 border-2 border-dashed border-zinc-900 rounded-3xl md:rounded-[3rem] text-zinc-600">

                <FileText
                  size={48}
                  className="mb-4 opacity-20"
                />

                <p className="font-medium text-sm md:text-base">

                  Your canvas is empty.

                </p>

              </div>

            ) : (

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                {notes.map((note) => (

                  <div
                    key={note._id}
                    className="group relative bg-zinc-900/30 border border-zinc-800/60 p-5 md:p-7 rounded-3xl md:rounded-[2rem] hover:bg-zinc-900/60 hover:border-zinc-700 transition-all duration-300 overflow-hidden"
                  >

                    {/* Delete Overlay */}
                    {confirmDeleteId === note._id ? (

                      <div className="absolute inset-0 z-10 bg-red-950/90 backdrop-blur-md flex flex-col items-center justify-center p-6 text-center">

                        <AlertCircle
                          size={32}
                          className="text-red-400 mb-2"
                        />

                        <p className="font-bold text-white mb-4 leading-tight text-sm">

                          Permanently delete this note?

                        </p>

                        <div className="flex gap-3 w-full">

                          <button
                            onClick={() =>
                              handleDelete(
                                note._id
                              )
                            }
                            className="flex-1 bg-red-500 hover:bg-red-400 text-white py-2 rounded-xl text-xs font-bold flex items-center justify-center gap-2"
                          >

                            <Check size={14} />

                            Yes

                          </button>

                          <button
                            onClick={() =>
                              setConfirmDeleteId(
                                null
                              )
                            }
                            className="flex-1 bg-white/10 hover:bg-white/20 text-white py-2 rounded-xl text-xs font-bold flex items-center justify-center gap-2"
                          >

                            <X size={14} />

                            Cancel

                          </button>

                        </div>

                      </div>

                    ) : null}

                    <div className="flex justify-between items-start mb-4">

                      <div className="bg-zinc-800/50 p-2 rounded-lg text-zinc-400 group-hover:text-blue-400 transition-colors">

                        <FileText size={18} />

                      </div>

                      <button
                        onClick={() =>
                          setConfirmDeleteId(
                            note._id
                          )
                        }
                        className="text-zinc-700 hover:text-red-500 transition-colors p-1"
                      >

                        <Trash2 size={18} />

                      </button>

                    </div>

                    <h2 className="text-lg md:text-xl font-bold mb-3 text-zinc-200 leading-tight">

                      {note.title}

                    </h2>

                    <p className="text-zinc-500 text-sm leading-relaxed line-clamp-4">

                      {note.content}

                    </p>

                    <div className="mt-6 pt-6 border-t border-zinc-800/50 flex justify-between items-center opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity">

                      <span className="text-[10px] font-mono text-zinc-600 uppercase tracking-widest">

                        Saved to cloud

                      </span>

                      <button
                        onClick={() =>
                          handleEdit(
                            note
                          )
                        }
                        className="text-zinc-500 hover:text-white text-xs font-bold"
                      >

                        Edit Note

                      </button>

                    </div>

                  </div>

                ))}

              </div>

            )}

          </main>

        </div>

      </div>

    </div>
  )
}

export default ManageNotes