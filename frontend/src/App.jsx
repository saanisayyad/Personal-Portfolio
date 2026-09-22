import { BrowserRouter, Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import MainLayout from "./layouts/MainLayout";
import ProtectedRoute from "./components/ProtectedRoutes";

// Public Pages
const Home = lazy(() => import("./pages/public/Home"));
const Gallery = lazy(() => import("./pages/public/Gallery"));
const Notes = lazy(() => import("./pages/public/Notes"));
const NoteDetails = lazy(
  () => import("./pages/public/NoteDetails")
);
const Qualifications = lazy(
  () => import("./pages/public/Qualifications")
);
const Projects = lazy(
  () => import("./pages/public/Projects")
);
const ProjectDetails = lazy(
  () => import("./pages/public/ProjectDetails")
);
import ScrollToTop from "./components/utils/ScrollToTop";

// Admin Pages
const Login = lazy(() => import("./pages/admin/Login"));
const Dashboard = lazy(() => import("./pages/admin/Dashboard"));
const ManageGallery = lazy(
  () => import("./pages/admin/ManageGallery")
);
const ManageNotes = lazy(
  () => import("./pages/admin/ManageNotes")
);
const ManageProfile = lazy(
  () => import("./pages/admin/ManageProfile")
);
import AdminLayout from "./layouts/AdminLayout";
const ManageEducation = lazy(
  () => import("./pages/admin/ManageEducation")
);
const ManageLanguages = lazy(
  () => import("./pages/admin/ManageLanguages")
);
const ManageSkills = lazy(
  () => import("./pages/admin/ManageSkills")
);
const ManageHobbies = lazy(
  () => import("./pages/admin/ManageHobbies")
);
const ManageProjects = lazy(
  () => import("./pages/admin/ManageProjects")
);

const PageLoader = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#09090b] text-white">
      <div className="flex flex-col items-center gap-4">
        <div className="w-10 h-10 border-4 border-zinc-800 border-t-cyan-400 rounded-full animate-spin" />

        <p className="text-sm text-zinc-500">
          Loading...
        </p>
      </div>
    </div>
  );
};

const App = () => {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Suspense fallback={<PageLoader />}>
  <Routes>
        {/* Public Layout Routes */}
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />

          <Route path="projects" element={<Projects />} />

          <Route path="projects/:slug" element={<ProjectDetails />} />

          <Route path="/qualifications" element={<Qualifications />} />

          <Route path="gallery" element={<Gallery />} />

          <Route path="notes" element={<Notes />} />

          <Route path="notes/:slug" element={<NoteDetails />} />
        </Route>

        {/* Admin Routes */}
        <Route path="/admin/login" element={<Login />} />

        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route path="dashboard" element={<Dashboard />} />

          <Route path="profile" element={<ManageProfile />} />
          
          <Route path="projects" element={<ManageProjects />} />

          <Route path="education" element={<ManageEducation />} />

          <Route path="languages" element={<ManageLanguages />} />

          <Route path="skills" element={<ManageSkills />} />

          <Route path="hobbies" element={<ManageHobbies />} />

          <Route path="gallery" element={<ManageGallery />} />

          <Route path="notes" element={<ManageNotes />} />
        </Route>
      </Routes>
</Suspense>
      
    </BrowserRouter>
  );
};

export default App;
