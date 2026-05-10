import API from "./api";

export const getGalleryImages = async () => {
  const res = await API.get("/gallery");
  return res.data;
};

export const uploadGalleryImage = async (formData) => {
  const token = localStorage.getItem("token");

  const res = await API.post(
    "/gallery",
    formData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return res.data;
};

export const deleteGalleryImage = async (id) => {
  const token = localStorage.getItem("token");

  const res = await API.delete(
    `/gallery/${id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return res.data;
};