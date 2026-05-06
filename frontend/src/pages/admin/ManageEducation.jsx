// pages/admin/ManageEducation.jsx

import {
  useEffect,
  useState,
} from "react"

import {

  getEducation,

  createEducation,

  updateEducation,

  deleteEducation,

} from "../../services/educationService"

const ManageEducation = () => {

  const [education,
    setEducation] =
    useState([])

  const [formData,
    setFormData] =
    useState({

      degree: "",

      institution: "",

      year: "",

      score: "",
    })

  const [editingId,
    setEditingId] =
    useState(null)

  const fetchEducation =
    async () => {

      try {

        const data =
          await getEducation()

        setEducation(data)

      } catch (error) {

        console.log(error)
      }
    }

  useEffect(() => {

    fetchEducation()

  }, [])

  const handleChange =
    (e) => {

      setFormData({

        ...formData,

        [e.target.name]:
          e.target.value,
      })
    }

  const resetForm =
    () => {

      setFormData({

        degree: "",

        institution: "",

        year: "",

        score: "",
      })

      setEditingId(null)
    }

  const handleSubmit =
    async (e) => {

      e.preventDefault()

      try {

        if (editingId) {

          await updateEducation(
            editingId,
            formData
          )

        } else {

          await createEducation(
            formData
          )
        }

        resetForm()

        fetchEducation()

      } catch (error) {

        console.log(error)
      }
    }

  const handleEdit =
    (item) => {

      setEditingId(
        item._id
      )

      setFormData({

        degree:
          item.degree,

        institution:
          item.institution,

        year:
          item.year,

        score:
          item.score,
      })

      window.scrollTo({

        top: 0,

        behavior:
          "smooth",
      })
    }

  const handleDelete =
    async (id) => {

      if (
        !window.confirm(
          "Delete this education entry?"
        )
      ) return

      try {

        await deleteEducation(id)

        fetchEducation()

      } catch (error) {

        console.log(error)
      }
    }

  const inputStyles =
    "w-full p-3 rounded-lg bg-zinc-800/50 border border-zinc-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all placeholder:text-zinc-500 text-white"

  const labelStyles =
    "block text-sm font-medium text-zinc-400 mb-2 ml-1"

  const disabledCondition =

    !formData.degree.trim() ||

    !formData.institution.trim() ||

    !formData.year.trim()

  return (

    <div className="max-w-5xl mx-auto pb-20">

      <header className="mb-12">

        <h1 className="text-4xl font-extrabold tracking-tight text-white">

          Manage Education

        </h1>

        <p className="text-zinc-400 mt-2">

          Add and manage your educational background.

        </p>

      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* FORM */}
        <div className="lg:col-span-1">

          <form
            onSubmit={handleSubmit}
            className="bg-zinc-900/40 border border-zinc-800 p-6 rounded-2xl space-y-6 sticky top-6"
          >

            <h2 className="text-xl font-semibold text-white border-b border-zinc-800 pb-4">

              {editingId
                ? "Edit Education"
                : "Add Education"}

            </h2>

            <div>

              <label className={labelStyles}>

                Degree

              </label>

              <input
                type="text"
                name="degree"
                placeholder="B.E Computer Engineering"
                value={formData.degree}
                onChange={handleChange}
                className={inputStyles}
              />

            </div>

            <div>

              <label className={labelStyles}>

                Institution

              </label>

              <input
                type="text"
                name="institution"
                placeholder="ABC University"
                value={formData.institution}
                onChange={handleChange}
                className={inputStyles}
              />

            </div>

            <div>

              <label className={labelStyles}>

                Year

              </label>

              <input
                type="text"
                name="year"
                placeholder="2022 - 2026"
                value={formData.year}
                onChange={handleChange}
                className={inputStyles}
              />

            </div>

            <div>

              <label className={labelStyles}>

                Score / CGPA

              </label>

              <input
                type="text"
                name="score"
                placeholder="7.5 CGPA"
                value={formData.score}
                onChange={handleChange}
                className={inputStyles}
              />

            </div>

            <div className="flex gap-3">

              <button
                disabled={disabledCondition}
                className={`
                  flex-1
                  px-6
                  py-3
                  rounded-xl
                  font-bold
                  transition-all
                  duration-300

                  ${
                    disabledCondition

                      ? `
                        bg-zinc-800
                        text-zinc-500
                        cursor-not-allowed
                        animate-pulse
                      `

                      : `
                        bg-white
                        text-black
                        hover:bg-zinc-200
                        hover:scale-[1.02]
                        active:scale-[0.98]
                        cursor-pointer
                      `
                  }
                `}
              >

                {editingId
                  ? "Update"
                  : "Add Education"}

              </button>

            </div>

          </form>

        </div>

        {/* LIST */}
        <div className="lg:col-span-2 space-y-5">

          {education.map(
            (item) => (

              <div
                key={item._id}
                className="bg-zinc-900/40 border border-zinc-800 p-6 rounded-2xl"
              >

                <div className="flex items-start justify-between gap-6">

                  <div>

                    <h2 className="text-2xl font-bold text-white mb-2">

                      {item.degree}

                    </h2>

                    <p className="text-zinc-400 mb-4">

                      {item.institution}

                    </p>

                    <div className="flex gap-3 flex-wrap">

                      <span className="px-3 py-1 rounded-full bg-zinc-800 text-sm text-zinc-300">

                        {item.year}

                      </span>

                      <span className="px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 text-sm">

                        {item.score}

                      </span>

                    </div>

                  </div>

                  <div className="flex gap-3 shrink-0">

                    <button
                      onClick={() =>
                        handleEdit(item)
                      }
                      className="
                      px-4 py-2
                      rounded-lg
                      bg-zinc-800
                      hover:bg-zinc-700
                      hover:scale-105
                      active:scale-95
                      transition-all
                      duration-300
                      text-sm
                      cursor-pointer
                      "
                    >

                      Edit

                    </button>

                    <button
                      onClick={() =>
                        handleDelete(item._id)
                      }
                      className="
                      px-4 py-2
                      rounded-lg
                      bg-red-500/10
                      hover:bg-red-500/20
                      hover:scale-105
                      active:scale-95
                      text-red-400
                      transition-all
                      duration-300
                      text-sm
                      cursor-pointer
                      "
                    >

                      Delete

                    </button>

                  </div>

                </div>

              </div>

            )
          )}

        </div>

      </div>

    </div>
  )
}

export default ManageEducation