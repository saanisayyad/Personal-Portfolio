import API from "./api"

export const getSkills =
  async () => {

    const res =
      await API.get(
        "/skills"
      )

    return res.data
  }

export const createSkill =
  async (data) => {

    const token =
      localStorage.getItem(
        "token"
      )

    const res =
      await API.post(
        "/skills",
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

export const updateSkill =
  async (id, data) => {

    const token =
      localStorage.getItem(
        "token"
      )

    const res =
      await API.put(
        `/skills/${id}`,
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

export const deleteSkill =
  async (id) => {

    const token =
      localStorage.getItem(
        "token"
      )

    const res =
      await API.delete(
        `/skills/${id}`,
        {
          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        }
      )

    return res.data
  }