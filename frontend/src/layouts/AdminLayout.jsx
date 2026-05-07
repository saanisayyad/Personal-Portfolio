import {
  Link,
  Outlet,
  useNavigate,
} from "react-router-dom"

import {
  useEffect,
} from "react"

import {
  jwtDecode,
} from "jwt-decode"

const AdminLayout = () => {

  const navigate =
    useNavigate()

  useEffect(() => {

    const checkAuth = () => {

      const token =
        localStorage.getItem("token")

      if (!token) {

        navigate(
          "/admin/login",
          { replace: true }
        )

        return
      }

      try {

        const decoded =
          jwtDecode(token)

        const currentTime =
          Date.now() / 1000

        if (
          decoded.exp <
          currentTime
        ) {

          localStorage.removeItem(
            "token"
          )

          navigate(
            "/admin/login",
            { replace: true }
          )
        }

      } catch {

        localStorage.removeItem(
          "token"
        )

        navigate(
          "/admin/login",
          { replace: true }
        )
      }
    }

    // Run immediately
    checkAuth()

    // Check every second
    const interval =
      setInterval(
        checkAuth,
        1000
      )

    return () =>
      clearInterval(interval)

  }, [navigate])

  const handleLogout = () => {

    localStorage.removeItem(
      "token"
    )

    navigate("/")
  }

  return (

    <div className="min-h-screen bg-black text-white">

      {/* Navbar */}
      <nav className="bg-zinc-900 border-b border-zinc-800">

        <div className="max-w-7xl mx-auto px-6 py-5 flex justify-between items-center">

          <h1 className="text-2xl font-bold">
            <Link to="/admin/dashboard">Admin Panel</Link>
          </h1>

          <button
            onClick={handleLogout}
            className="
              bg-white
              text-black
              px-5 py-2
              rounded-xl
              font-semibold
            "
          >
            Logout
          </button>

        </div>

      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto p-6 md:p-10">

        <Outlet />

      </main>

    </div>
  )
}

export default AdminLayout