import { Outlet } from "react-router-dom"
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"

const MainLayout = () => {
  return (
    <div className="public-portfolio relative min-h-screen bg-[#11110f] text-[#f0eadf] overflow-hidden">

  {/* Global Glow */}
  <div className="absolute inset-0 pointer-events-none">

    <div className="absolute top-[-10%] left-[-10%] w-[400px] h-[400px] bg-[#c5b18a]/[0.055] blur-3xl rounded-full" />

    <div className="absolute bottom-[-10%] right-[-10%] w-[400px] h-[400px] bg-[#948268]/[0.045] blur-3xl rounded-full" />

    <div className="absolute top-[40%] left-[50%] -translate-x-1/2 w-[300px] h-[300px] bg-[#c5b18a]/[0.025] blur-3xl rounded-full" />

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