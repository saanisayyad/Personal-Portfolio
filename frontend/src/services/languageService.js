import API from "./api"

export const getLanguages =
  async () => {

    const res =
      await API.get(
        "/languages"
      )

    return res.data
  }

export const createLanguage =
  async (data) => {

    const token =
      localStorage.getItem(
        "token"
      )

    const res =
      await API.post(
        "/languages",
        data,
        {
          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        }
      )

    return res.data
  }

export const updateLanguage =
  async (id, data) => {

    const token =
      localStorage.getItem(
        "token"
      )

    const res =
      await API.put(
        `/languages/${id}`,
        data,
        {
          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        }
      )

    return res.data
  }

export const deleteLanguage =
  async (id) => {

    const token =
      localStorage.getItem(
        "token"
      )

    const res =
      await API.delete(
        `/languages/${id}`,
        {
          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        }
      )

    return res.data
  }