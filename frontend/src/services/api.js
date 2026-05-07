import axios from "axios"

const API = axios.create({

  baseURL:
    import.meta.env.VITE_API_URL,

})

API.interceptors.response.use(

  (response) => response,

  (error) => {

    if (
      error.response?.status === 401
    ) {

      localStorage.removeItem(
        "token"
      )

      window.location.href =
        "/admin/login"
    }

    return Promise.reject(error)
  }
)

export default API