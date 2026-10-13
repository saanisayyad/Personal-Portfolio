import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const MainLayout = () => {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[#09090b] text-white selection:bg-cyan-300/25 selection:text-white">
      {/* Restrained ambient light: enough depth without washing out content. */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-48 -top-40 h-[30rem] w-[30rem] rounded-full bg-cyan-500/[0.07] blur-[120px]" />
        <div className="absolute -right-52 top-[30%] h-[32rem] w-[32rem] rounded-full bg-violet-500/[0.055] blur-[130px]" />
        <div className="absolute -bottom-48 left-[18%] h-[28rem] w-[28rem] rounded-full bg-blue-500/[0.035] blur-[130px]" />
        <div className="absolute inset-0 opacity-[0.14] [background-image:linear-gradient(rgba(161,161,170,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(161,161,170,0.08)_1px,transparent_1px)] [background-size:76px_76px] [mask-image:linear-gradient(to_bottom,black,transparent_78%)]" />
      </div>

      <div className="relative z-10">
        <Navbar />
        <main>
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default MainLayout;
