import { Link } from "react-router-dom";

const Dashboard = () => {
  return (
    <div>
      <h1 className="text-5xl font-bold mb-8">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <Link to="/admin/profile">
          <div className="bg-zinc-900 p-8 rounded-2xl">
            <h2 className="text-2xl font-semibold mb-3">Profile</h2>

            <p className="text-gray-400">Manage portfolio information</p>
          </div>
        </Link>

        <Link to="/admin/gallery">
          <div className="bg-zinc-900 p-8 rounded-2xl">
            <h2 className="text-2xl font-semibold mb-3">Gallery</h2>

            <p className="text-gray-400">Upload and manage images</p>
          </div>
        </Link>

        <Link to="/admin/notes">
          <div className="bg-zinc-900 p-8 rounded-2xl">
            <h2 className="text-2xl font-semibold mb-3">Notes</h2>

            <p className="text-gray-400">Create and manage notes</p>
          </div>
        </Link>

        <Link to="/admin/education">
          <div className="bg-zinc-900 p-8 rounded-2xl">
            <h2 className="text-2xl font-semibold mb-3">Education</h2>

            <p className="text-gray-400">Manage education records</p>
          </div>
        </Link>

        <Link to="/admin/skills">
          <div className="bg-zinc-900 p-8 rounded-2xl">
            <h2 className="text-2xl font-semibold mb-3">Skills</h2>

            <p className="text-gray-400">Manage skills and qualifications</p>
          </div>
        </Link>

        <Link to="/admin/languages">
          <div className="bg-zinc-900 p-8 rounded-2xl">
            <h2 className="text-2xl font-semibold mb-3">Languages</h2>

            <p className="text-gray-400">Manage language proficiencies</p>
          </div>
        </Link>

        <Link to="/admin/hobbies">
          <div className="bg-zinc-900 p-8 rounded-2xl">
            <h2 className="text-2xl font-semibold mb-3">Hobbies</h2>

            <p className="text-gray-400">Manage hobbies and interests</p>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Dashboard;
