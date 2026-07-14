import { BrowserRouter, Routes, Route } from "react-router-dom";

import MainLayout from "./layouts/MainLayout";
import ProtectedRoute from "./components/ProtectedRoutes";
// Public Pages
import Home from "./pages/public/Home";
import Gallery from "./pages/public/Gallery";
import Notes from "./pages/public/Notes";
import NoteDetails from "./pages/public/NoteDetails";
import Qualifications from "./pages/public/Qualifications";

// Admin Pages
import Login from "./pages/admin/Login";
import Dashboard from "./pages/admin/Dashboard";
import ManageGallery from "./pages/admin/ManageGallery";
import ManageNotes from "./pages/admin/ManageNotes";
import ManageProfile from "./pages/admin/ManageProfile";
import AdminLayout from "./layouts/AdminLayout";
import ManageEducation from "./pages/admin/ManageEducation";
import ManageLanguages from "./pages/admin/ManageLanguages";
import ManageSkills from "./pages/admin/ManageSkills";
import ManageHobbies from "./pages/admin/ManageHobbies";
import ScrollToTop from "./components/utils/ScrollToTop";
import Projects from "./pages/public/Projects";
import ManageProjects from "./pages/admin/ManageProjects";
import ProjectDetails from "./pages/public/ProjectDetails";
// import ChatBot from "./components/ChatBot";

const App = () => {
  return (
    <BrowserRouter>
      <ScrollToTop />
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
      {/* <ChatBot /> */}
    </BrowserRouter>
  );
};

export default App;
