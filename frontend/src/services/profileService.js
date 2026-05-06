import API from "./api"

export const getProfile =
  async () => {

    const res =
      await API.get(
        "/profile"
      )

    return res.data
  }

export const updateProfile =
  async (data) => {

    const token =
      localStorage.getItem(
        "token"
      )

    const res =
      await API.put(
        "/profile",
        data,
        {
          headers: {
            Authorization:
              `Bearer ${token}`,
            "Content-Type":
              "multipart/form-data",
          },
        }
      )

    return res.data
  }