import { useEffect, useState } from "react";
import {
  Plus,
  Trash2,
  UploadCloud,
  Loader2,
  FolderKanban,
  Star,
  Pencil,
} from "lucide-react";

import {
  getProjects,
  createProject,
  updateProject,
  deleteProject,
} from "../../services/projectService";

const ManageProjects = () => {
  const [projects, setProjects] = useState([]);
  const [images, setImages] = useState([]);
  const [previews, setPreviews] = useState([]);
  const [isSubmitting, setIsSubmitting] =
    useState(false);

  const [editingId, setEditingId] =
    useState(null);

  const [formData, setFormData] =
    useState({
      title: "",
      shortDescription: "",
      description: "",
      liveUrl: "",
      githubUrl: "",
      techStack: "",
      featured: false,
    });

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const data = await getProjects();
      setProjects(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (e) => {
    const {
      name,
      value,
      type,
      checked,
    } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox"
          ? checked
          : value,
    }));
  };

  const handleImageChange = (e) => {
    const files = Array.from(
      e.target.files
    );

    setImages(files);

    const urls = files.map((file) =>
      URL.createObjectURL(file)
    );

    setPreviews(urls);
  };

  const resetForm = () => {
    setEditingId(null);

    setFormData({
      title: "",
      shortDescription: "",
      description: "",
      liveUrl: "",
      githubUrl: "",
      techStack: "",
      featured: false,
    });

    setImages([]);
    setPreviews([]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsSubmitting(true);

    try {
      const data = new FormData();

      data.append(
        "title",
        formData.title
      );

      data.append(
        "shortDescription",
        formData.shortDescription
      );

      data.append(
        "description",
        formData.description
      );

      data.append(
        "liveUrl",
        formData.liveUrl
      );

      data.append(
        "githubUrl",
        formData.githubUrl
      );

      data.append(
        "techStack",
        formData.techStack
      );

      data.append(
        "featured",
        formData.featured
      );

      images.forEach((image) => {
        data.append("images", image);
      });

      if (editingId) {
        await updateProject(
          editingId,
          data
        );
      } else {
        await createProject(data);
      }

      resetForm();
      fetchProjects();
    } catch (error) {
      console.error(error);
      alert(
        editingId
          ? "Project update failed"
          : "Project creation failed"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEdit = (project) => {
    setEditingId(project._id);

    setFormData({
      title: project.title || "",
      shortDescription:
        project.shortDescription || "",
      description:
        project.description || "",
      liveUrl: project.liveUrl || "",
      githubUrl:
        project.githubUrl || "",
      techStack:
        project.techStack?.join(", ") ||
        "",
      featured:
        project.featured || false,
    });

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleDelete = async (id) => {
    if (
      !window.confirm(
        "Delete this project?"
      )
    )
      return;

    try {
      await deleteProject(id);

      setProjects((prev) =>
        prev.filter(
          (project) =>
            project._id !== id
        )
      );
    } catch (error) {
      console.error(error);
      alert("Delete failed");
    }
  };

  return (
    <div className="min-h-screen bg-[#09090b] text-zinc-100 pb-20">
      <div className="max-w-7xl mx-auto px-6 pt-12">
        {/* HEADER */}
        <header className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <h1 className="text-5xl font-black tracking-tighter bg-gradient-to-r from-white to-zinc-500 bg-clip-text text-transparent">
              Project Studio
            </h1>

            <p className="text-zinc-500 text-lg mt-2 font-medium">
              Manage and showcase
              portfolio projects.
            </p>
          </div>

          <div className="flex items-center gap-2 px-4 py-2 bg-zinc-900/50 border border-zinc-800 rounded-full text-sm font-medium text-zinc-400">
            <FolderKanban size={16} />
            {projects.length} Projects
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* FORM */}
          <div className="lg:col-span-4">
            <form
              onSubmit={handleSubmit}
              className="bg-zinc-900/40 border border-zinc-800/50 backdrop-blur-xl p-8 rounded-3xl sticky top-8 space-y-5"
            >
              <div>
                <h2 className="text-xl font-bold">
                  {editingId
                    ? "Update Project"
                    : "Create Project"}
                </h2>

                <p className="text-sm text-zinc-500">
                  Add and manage your
                  portfolio projects.
                </p>
              </div>

              <input
                type="text"
                name="title"
                placeholder="Project Title"
                value={formData.title}
                onChange={
                  handleChange
                }
                required
                className="w-full h-12 px-4 rounded-xl bg-zinc-950 border border-zinc-800 outline-none focus:border-white"
              />

              <input
                type="text"
                name="shortDescription"
                placeholder="Short Description"
                value={
                  formData.shortDescription
                }
                onChange={
                  handleChange
                }
                required
                className="w-full h-12 px-4 rounded-xl bg-zinc-950 border border-zinc-800 outline-none focus:border-white"
              />

              <textarea
                rows={5}
                name="description"
                placeholder="Full Description"
                value={
                  formData.description
                }
                onChange={
                  handleChange
                }
                required
                className="w-full p-4 rounded-xl bg-zinc-950 border border-zinc-800 resize-none outline-none focus:border-white"
              />

              <input
                type="text"
                name="techStack"
                placeholder="React, Node, MongoDB"
                value={
                  formData.techStack
                }
                onChange={
                  handleChange
                }
                className="w-full h-12 px-4 rounded-xl bg-zinc-950 border border-zinc-800 outline-none focus:border-white"
              />

              <input
                type="url"
                name="liveUrl"
                placeholder="Live URL"
                value={
                  formData.liveUrl
                }
                onChange={
                  handleChange
                }
                className="w-full h-12 px-4 rounded-xl bg-zinc-950 border border-zinc-800 outline-none focus:border-white"
              />

              <input
                type="url"
                name="githubUrl"
                placeholder="GitHub URL"
                value={
                  formData.githubUrl
                }
                onChange={
                  handleChange
                }
                className="w-full h-12 px-4 rounded-xl bg-zinc-950 border border-zinc-800 outline-none focus:border-white"
              />

              <label className="flex items-center justify-between bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3">
                <span className="text-sm">
                  Featured Project
                </span>

                <input
                  type="checkbox"
                  name="featured"
                  checked={
                    formData.featured
                  }
                  onChange={
                    handleChange
                  }
                />
              </label>

              {/* IMAGE UPLOAD */}
              <div className="relative group overflow-hidden border-2 border-dashed border-zinc-800 rounded-2xl hover:border-zinc-600 transition-all aspect-video flex flex-col items-center justify-center bg-black/20">
                {previews.length >
                0 ? (
                  <div className="grid grid-cols-3 gap-2 p-3 w-full h-full overflow-hidden">
                    {previews.map(
                      (
                        preview,
                        index
                      ) => (
                        <img
                          key={index}
                          src={preview}
                          alt=""
                          className="w-full h-20 object-cover rounded-lg"
                        />
                      )
                    )}
                  </div>
                ) : (
                  <div className="flex flex-col items-center gap-3 text-zinc-500">
                    <UploadCloud
                      size={32}
                    />
                    <p className="text-sm font-semibold">
                      Upload Images
                    </p>
                  </div>
                )}

                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={
                    handleImageChange
                  }
                  className="absolute inset-0 opacity-0 cursor-pointer"
                />
              </div>

              <button
                type="submit"
                disabled={
                  isSubmitting
                }
                className="w-full bg-white hover:bg-zinc-200 text-black h-12 rounded-xl font-bold flex items-center justify-center gap-2 transition-all"
              >
                {isSubmitting ? (
                  <Loader2
                    className="animate-spin"
                    size={20}
                  />
                ) : (
                  <>
                    <Plus
                      size={20}
                    />

                    {editingId
                      ? "Update Project"
                      : "Create Project"}
                  </>
                )}
              </button>
            </form>
          </div>

          {/* PROJECTS GRID */}
          <div className="lg:col-span-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              {projects.map(
                (project) => (
                  <div
                    key={
                      project._id
                    }
                    className="group bg-zinc-900/40 border border-zinc-800/50 rounded-3xl overflow-hidden"
                  >
                    <div className="relative aspect-[16/10] overflow-hidden">
                      <img
                        src={
                          project
                            .images?.[0]
                            ?.imageUrl
                        }
                        alt={
                          project.title
                        }
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />

                      <div className="absolute top-4 right-4 flex gap-2">
                        {project.featured && (
                          <div className="bg-yellow-500 text-black p-2 rounded-full">
                            <Star
                              size={
                                16
                              }
                            />
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="p-5">
                      <h3 className="font-bold text-lg">
                        {
                          project.title
                        }
                      </h3>

                      <p className="text-zinc-500 text-sm mt-2 line-clamp-2">
                        {
                          project.shortDescription
                        }
                      </p>

                      <div className="flex flex-wrap gap-2 mt-4">
                        {project.techStack?.map(
                          (
                            tech
                          ) => (
                            <span
                              key={
                                tech
                              }
                              className="text-xs bg-zinc-800 px-2 py-1 rounded-full"
                            >
                              {
                                tech
                              }
                            </span>
                          )
                        )}
                      </div>

                      <div className="flex gap-3 mt-5">
                        <button
                          onClick={() =>
                            handleEdit(
                              project
                            )
                          }
                          className="flex-1 bg-zinc-800 hover:bg-zinc-700 rounded-xl h-11 flex items-center justify-center gap-2"
                        >
                          <Pencil
                            size={
                              16
                            }
                          />
                          Edit
                        </button>

                        <button
                          onClick={() =>
                            handleDelete(
                              project._id
                            )
                          }
                          className="flex-1 bg-red-500/10 hover:bg-red-500 text-red-500 hover:text-white rounded-xl h-11 flex items-center justify-center gap-2 transition-all"
                        >
                          <Trash2
                            size={
                              16
                            }
                          />
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
      </div>
    </div>
  );
};

export default ManageProjects;

