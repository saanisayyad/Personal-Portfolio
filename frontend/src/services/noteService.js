import API from "./api"

export const getNotes =
  async () => {

    const res =
      await API.get(
        "/notes"
      )

    return res.data
  }

export const getNoteById =
  async (id) => {

    const res =
      await API.get(
        `/notes/${id}`
      )

    return res.data
  }

export const createNote =
  async (data) => {

    const token =
      localStorage.getItem(
        "token"
      )

    const res =
      await API.post(
        "/notes",
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

export const updateNote =
  async (id, data) => {

    const token =
      localStorage.getItem(
        "token"
      )

    const res =
      await API.put(
        `/notes/${id}`,
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

export const deleteNote =
  async (id) => {

    const token =
      localStorage.getItem(
        "token"
      )

    const res =
      await API.delete(
        `/notes/${id}`,
        {
          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        }
      )

    return res.data
  }