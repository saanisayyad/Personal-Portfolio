import axios from "axios";


const API = axios.create({

  baseURL:
    import.meta.env.VITE_API_URL,

  // Never allow an API request to hang forever.
  timeout: 15000,

});


API.interceptors.response.use(

  (response) => response,

  (error) => {

    // ------------------------------------------
    // AUTH ERROR
    // ------------------------------------------

    if (
      error.response?.status === 401
    ) {

      localStorage.removeItem(
        "token"
      );

      window.location.href =
        "/admin/login";

    }


    // ------------------------------------------
    // TIMEOUT
    // ------------------------------------------

    if (
      error.code === "ECONNABORTED"
    ) {

      console.warn(
        "API request timed out."
      );

    }


    // ------------------------------------------
    // NETWORK ERROR
    // ------------------------------------------

    if (
      !error.response
    ) {

      console.warn(
        "Backend unavailable."
      );

    }


    return Promise.reject(error);

  }

);


export default API;