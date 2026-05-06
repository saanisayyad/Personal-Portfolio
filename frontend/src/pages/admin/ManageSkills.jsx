import { useEffect, useState } from "react";

import {
  getSkills,
  createSkill,
  updateSkill,
  deleteSkill,
} from "../../services/skillService";

const ManageSkills = () => {
  const [skills, setSkills] = useState([]);

  const [formData, setFormData] = useState({
    name: "",

    description: "",
  });

  const [editingId, setEditingId] = useState(null);

  const fetchSkills = async () => {
    try {
      const data = await getSkills();

      setSkills(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchSkills();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,

      [e.target.name]: e.target.value,
    });
  };

  const resetForm = () => {
    setFormData({
      name: "",

      description: "",
    });

    setEditingId(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editingId) {
        await updateSkill(
          editingId,

          formData,
        );
      } else {
        await createSkill(formData);
      }

      resetForm();

      fetchSkills();
    } catch (error) {
      console.log(error);
    }
  };

  const handleEdit = (skill) => {
    setEditingId(skill._id);

    setFormData({
      name: skill.name,

      description: skill.description,
    });

    window.scrollTo({
      top: 0,

      behavior: "smooth",
    });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this skill?")) return;

    try {
      await deleteSkill(id);

      fetchSkills();
    } catch (error) {
      console.log(error);
    }
  };

  const inputStyles =
    "w-full p-3 rounded-lg bg-zinc-800/50 border border-zinc-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all placeholder:text-zinc-500 text-white";

  const labelStyles = "block text-sm font-medium text-zinc-400 mb-2 ml-1";

  return (
    <div className="max-w-5xl mx-auto pb-20">
      {/* HEADER */}
      <header className="mb-12">
        <h1 className="text-4xl font-extrabold tracking-tight text-white">
          Manage Skills
        </h1>

        <p className="text-zinc-400 mt-2">
          Add and manage your technical skills.
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
              {editingId ? "Edit Skill" : "Add Skill"}
            </h2>

            <div>
              <label className={labelStyles}>Skill Name</label>

              <input
                type="text"
                name="name"
                placeholder="React.js"
                value={formData.name}
                onChange={handleChange}
                className={inputStyles}
              />
            </div>

            <div>
              <label className={labelStyles}>Description</label>

              <textarea
                rows="5"
                name="description"
                placeholder="Describe your experience..."
                value={formData.description}
                onChange={handleChange}
                className={inputStyles}
              />
            </div>

            <div className="flex gap-3">
              <button
                disabled={!formData.name.trim() || !formData.description.trim()}
                className={`
    flex-1
    px-6
    py-3
    rounded-xl
    font-bold
    transition-all
    duration-300
    cursor-pointer

    ${
      !formData.name.trim() || !formData.description.trim()
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
        `
    }
  `}
              >
                {editingId ? "Update" : "Add Skill"}
              </button>

              {editingId && (
                <button
                  type="button"
                  onClick={resetForm}
                  className="px-5 py-3 rounded-xl bg-zinc-800 hover:bg-zinc-700 transition"
                >
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>

        {/* LIST */}
        <div className="lg:col-span-2 space-y-5">
          {skills.map((skill) => (
            <div
              key={skill._id}
              className="bg-zinc-900/40 border border-zinc-800 p-6 rounded-2xl"
            >
              <div className="flex items-start justify-between gap-6">
                <div>
                  <h2 className="text-2xl font-bold text-white mb-3">
                    {skill.name}
                  </h2>

                  <p className="text-zinc-400 leading-relaxed">
                    {skill.description}
                  </p>
                </div>

                <div className="flex gap-3 shrink-0">
                  <button
                    onClick={() => handleEdit(skill)}
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
                    onClick={() => handleDelete(skill._id)}
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
          ))}
        </div>
      </div>
    </div>
  );
};

export default ManageSkills;
