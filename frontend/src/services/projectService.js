import API from "./api";

// GET ALL PROJECTS
export const getProjects = async () => {
  const res = await API.get("/projects");
  return res.data;
};

// GET SINGLE PROJECT
export const getProjectBySlug = async (slug) => {
  const res = await API.get(
    `/projects/${slug}`
  );

  return res.data;
};

// CREATE PROJECT
export const createProject = async (
  formData
) => {
  const token =
    localStorage.getItem("token");

  const res = await API.post(
    "/projects",
    formData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type":
          "multipart/form-data",
      },
    }
  );

  return res.data;
};

// UPDATE PROJECT
export const updateProject = async (
  id,
  formData
) => {
  const token =
    localStorage.getItem("token");

  const res = await API.put(
    `/projects/${id}`,
    formData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type":
          "multipart/form-data",
      },
    }
  );

  return res.data;
};

// DELETE PROJECT
export const deleteProject = async (
  id
) => {
  const token =
    localStorage.getItem("token");

  const res = await API.delete(
    `/projects/${id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return res.data;
};