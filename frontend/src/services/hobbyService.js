import API from "./api"

export const getHobbies =
  async () => {

    const res =
      await API.get(
        "/hobbies"
      )

    return res.data
  }

export const createHobby =
  async (data) => {

    const token =
      localStorage.getItem(
        "token"
      )

    const res =
      await API.post(
        "/hobbies",
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

export const updateHobby =
  async (id, data) => {

    const token =
      localStorage.getItem(
        "token"
      )

    const res =
      await API.put(
        `/hobbies/${id}`,
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

export const deleteHobby =
  async (id) => {

    const token =
      localStorage.getItem(
        "token"
      )

    const res =
      await API.delete(
        `/hobbies/${id}`,
        {
          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        }
      )

    return res.data
  }