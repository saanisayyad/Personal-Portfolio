const Dashboard = () => {
  return (
    <div>

      <h1 className="text-5xl font-bold mb-8">
        Dashboard
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

        <div className="bg-zinc-900 p-8 rounded-2xl">
          <h2 className="text-2xl font-semibold mb-3">
            Profile
          </h2>

          <p className="text-gray-400">
            Manage portfolio information
          </p>
        </div>

        <div className="bg-zinc-900 p-8 rounded-2xl">
          <h2 className="text-2xl font-semibold mb-3">
            Gallery
          </h2>

          <p className="text-gray-400">
            Upload and manage images
          </p>
        </div>

        <div className="bg-zinc-900 p-8 rounded-2xl">
          <h2 className="text-2xl font-semibold mb-3">
            Notes
          </h2>

          <p className="text-gray-400">
            Create and manage notes
          </p>
        </div>

      </div>

    </div>
  )
}

export default Dashboard