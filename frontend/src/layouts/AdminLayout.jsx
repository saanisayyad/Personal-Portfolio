import {
  useState,
} from "react"

import {
  Outlet,
  Link,
  useNavigate,
} from "react-router-dom"

import {
  MenuIcon,
  XIcon
} from "lucide-react"

const AdminLayout = () => {

  const navigate =
    useNavigate()

  const [menuOpen, setMenuOpen] =
    useState(false)

  const handleLogout = () => {

    localStorage.removeItem(
      "token"
    )

    navigate("/admin/login")
  }

  return (
    <div className="min-h-screen bg-black text-white">

      {/* Navbar */}
      <nav className="bg-zinc-900 border-b border-zinc-800">

        <div className="max-w-7xl mx-auto px-6 py-5 flex justify-between items-center">

          <Link
            to="/admin/dashboard"
            className="text-2xl font-bold"
          >
            Admin Panel
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex gap-6 items-center">

            <Link
              to="/admin/dashboard"
              className="hover:text-gray-300"
            >
              Dashboard
            </Link>

            <Link
              to="/admin/profile"
              className="hover:text-gray-300"
            >
              Profile
            </Link>

            <Link
              to="/admin/education"
              className="hover:text-gray-300"
            >
              Education
            </Link>

            <Link
              to="/admin/languages"
              className="hover:text-gray-300"
            >
              Languages
            </Link>
            
            <Link
              to="/admin/skills"
              className="hover:text-gray-300"
            >
              Skills
            </Link>

            <Link
              to="/admin/hobbies"
              className="hover:text-gray-300"
            >
              Hobbies
            </Link>

            <Link
              to="/admin/gallery"
              className="hover:text-gray-300"
            >
              Gallery
            </Link>

            <Link
              to="/admin/notes"
              className="hover:text-gray-300"
            >
              Notes
            </Link>

            <button
              onClick={handleLogout}
              className="bg-white text-black px-5 py-2 rounded-xl font-semibold"
            >
              Logout
            </button>

          </div>

          {/* Mobile Hamburger */}
          <button
            onClick={() =>
              setMenuOpen(!menuOpen)
            }
            className="md:hidden"
          >

            {menuOpen ? (
              <XIcon size={32} />
            ) : (
              <MenuIcon size={32} />
            )}

          </button>

        </div>

        {/* Mobile Menu */}
        {/* Mobile Sidebar Overlay */}
<div
  className={`
    fixed top-0 right-0 h-full w-72
    bg-zinc-900 border-l border-zinc-800
    z-50 transform transition-transform duration-300 ease-in-out
    md:hidden
    ${menuOpen
      ? "translate-x-0"
      : "translate-x-full"
    }
  `}
>

  <div className="flex justify-between items-center p-6 border-b border-zinc-800">

    <h2 className="text-2xl font-bold">
      Menu
    </h2>

    <button
      onClick={() =>
        setMenuOpen(false)
      }
    >
      <XIcon size={32} />
    </button>

  </div>

  <div className="flex flex-col gap-6 p-6 text-lg">

    <Link
      to="/admin/dashboard"
      onClick={() =>
        setMenuOpen(false)
      }
    >
      Dashboard
    </Link>

    <Link
      to="/admin/profile"
      onClick={() =>
        setMenuOpen(false)
      }
    >
      Profile
    </Link>

      <Link
      to="/admin/education"
      onClick={() =>
        setMenuOpen(false)
      }
    >
      Education
    </Link>

    <Link
      to="/admin/languages"
      onClick={() =>
        setMenuOpen(false)
      }
    >
      Languages
    </Link>

    <Link
      to="/admin/skills"
      onClick={() =>
        setMenuOpen(false)
      }
    >
      Skills
    </Link>

    <Link
      to="/admin/hobbies"
      onClick={() =>
        setMenuOpen(false)
      }
    >
      Hobbies
    </Link>
    
    <Link
      to="/admin/gallery"
      onClick={() =>
        setMenuOpen(false)
      }
    >
      Gallery
    </Link>

    <Link
      to="/admin/notes"
      onClick={() =>
        setMenuOpen(false)
      }
    >
      Notes
    </Link>

    <button
      onClick={handleLogout}
      className="bg-white text-black px-5 py-3 rounded-xl font-semibold mt-4"
    >
      Logout
    </button>

  </div>

</div>

      </nav>
{menuOpen && (

  <div
    onClick={() =>
      setMenuOpen(false)
    }
    className="fixed inset-0 backdrop-blur-xs z-40 md:hidden"
  />

)}
      {/* Main Content */}
      <main className="max-w-7xl mx-auto p-6 md:p-10">

        <Outlet />

      </main>

    </div>
  )
}

export default AdminLayout