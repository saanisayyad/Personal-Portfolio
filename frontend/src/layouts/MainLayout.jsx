import { Outlet } from "react-router-dom"
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"

const MainLayout = () => {
  return (
    <div className="relative min-h-screen bg-[#09090b] text-white overflow-hidden">

  {/* Global Glow */}
  <div className="absolute inset-0 pointer-events-none">

    <div className="absolute top-[-10%] left-[-10%] w-[400px] h-[400px] bg-pink-500/10 blur-3xl rounded-full" />

    <div className="absolute bottom-[-10%] right-[-10%] w-[400px] h-[400px] bg-orange-500/10 blur-3xl rounded-full" />

    <div className="absolute top-[40%] left-[50%] -translate-x-1/2 w-[300px] h-[300px] bg-fuchsia-500/5 blur-3xl rounded-full" />

  </div>

  <div className="relative z-10">

    <Navbar />

    <main>

      <Outlet />

    </main>
    <Footer />

  </div>

</div>
  )
}

export default MainLayout