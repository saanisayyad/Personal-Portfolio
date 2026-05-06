import API from "./api"

/* GET */
export const getEducation =
  async () => {

    const res =
      await API.get(
        "/education"
      )

    return res.data
  }

/* CREATE */
export const createEducation =
  async (data) => {

    const token =
      localStorage.getItem(
        "token"
      )

    const res =
      await API.post(
        "/education",
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

/* UPDATE */
export const updateEducation =
  async (id, data) => {

    const token =
      localStorage.getItem(
        "token"
      )

    const res =
      await API.put(
        `/education/${id}`,
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

/* DELETE */
export const deleteEducation =
  async (id) => {

    const token =
      localStorage.getItem(
        "token"
      )

    const res =
      await API.delete(
        `/education/${id}`,
        {
          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        }
      )

    return res.data
  }