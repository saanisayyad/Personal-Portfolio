import { useEffect, useState } from "react";
import { getProfile, updateProfile } from "../../services/profileService";

const ManageProfile = () => {
  const [formData, setFormData] = useState({
    name: "",
    title: "",
    bio: "",
    profileImage: null,
    github: "",
    linkedin: "",
    instagram: "",
    resume: null,
  });

  const fetchProfile = async () => {
    try {
      const data = await getProfile();
      if (data) setFormData(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const profileFormData = new FormData();
      profileFormData.append("name", formData.name);
      profileFormData.append("title", formData.title);
      profileFormData.append("bio", formData.bio);
      profileFormData.append("github", formData.github);
      profileFormData.append("linkedin", formData.linkedin);
      profileFormData.append("instagram", formData.instagram);
      if (formData.profileImage)
        profileFormData.append("profileImage", formData.profileImage);
      if (formData.resume) profileFormData.append("resume", formData.resume);

      await updateProfile(profileFormData);
      alert("Profile Updated Successfully ✨");
    } catch (error) {
      console.log(error);
      alert("Update Failed");
    }
  };

  const inputStyles =
    "w-full p-3 rounded-lg bg-zinc-800/50 border border-zinc-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all placeholder:text-zinc-500 text-white";
  const labelStyles = "block text-sm font-medium text-zinc-400 mb-2 ml-1";

  return (
    <div className="max-w-5xl mx-auto pb-20">
      <header className="mb-12">
        <h1 className="text-4xl font-extrabold tracking-tight text-white">
          Manage Profile
        </h1>
        <p className="text-zinc-400 mt-2">
          Update your personal information and public links.
        </p>
      </header>

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-3 gap-8"
      >
        {/* Left Column: Essential Info */}
        <div className="md:col-span-2 space-y-8">
          <section className="bg-zinc-900/40 border border-zinc-800 p-6 rounded-2xl space-y-6">
            <h2 className="text-xl font-semibold text-white border-b border-zinc-800 pb-4">
              Basic Information
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className={labelStyles}>Full Name</label>
                <input
                  type="text"
                  name="name"
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={handleChange}
                  className={inputStyles}
                />
              </div>
              <div>
                <label className={labelStyles}>Professional Title</label>
                <input
                  type="text"
                  name="title"
                  placeholder="Full Stack Developer"
                  value={formData.title}
                  onChange={handleChange}
                  className={inputStyles}
                />
              </div>
            </div>

            <div>
              <label className={labelStyles}>Short Bio</label>
              <textarea
                rows="5"
                name="bio"
                placeholder="Tell the world about yourself..."
                value={formData.bio}
                onChange={handleChange}
                className={inputStyles}
              />
            </div>
          </section>

          <section className="bg-zinc-900/40 border border-zinc-800 p-6 rounded-2xl space-y-6">
            <h2 className="text-xl font-semibold text-white border-b border-zinc-800 pb-4">
              Social Links
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className={labelStyles}>GitHub URL</label>
                <input
                  type="text"
                  name="github"
                  placeholder="https://github.com/..."
                  value={formData.github}
                  onChange={handleChange}
                  className={inputStyles}
                />
              </div>
              <div>
                <label className={labelStyles}>LinkedIn URL</label>
                <input
                  type="text"
                  name="linkedin"
                  placeholder="https://linkedin.com/in/..."
                  value={formData.linkedin}
                  onChange={handleChange}
                  className={inputStyles}
                />
              </div>
              <div>
                <label className={labelStyles}>Instagram URL</label>

                <input
                  type="text"
                  name="instagram"
                  placeholder="https://instagram.com/..."
                  value={formData.instagram}
                  onChange={handleChange}
                  className={inputStyles}
                />
              </div>
            </div>
          </section>
        </div>

        {/* Right Column: Files & Actions */}
        <div className="space-y-8">
          <section className="bg-zinc-900/40 border border-zinc-800 p-6 rounded-2xl space-y-6">
            <h2 className="text-xl font-semibold text-white border-b border-zinc-800 pb-4">
              Media & Documents
            </h2>

            <div>
              <label className={labelStyles}>Profile Picture</label>
              <div className="relative group">
                <input
                  type="file"
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      profileImage: e.target.files[0],
                    })
                  }
                  className="block w-full text-sm text-zinc-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-zinc-800 file:text-white hover:file:bg-zinc-700 cursor-pointer"
                />
              </div>
            </div>

            <div>
              <label className={labelStyles}>Resume (PDF)</label>
              <input
                type="file"
                accept=".pdf"
                onChange={(e) =>
                  setFormData({ ...formData, resume: e.target.files[0] })
                }
                className="block w-full text-sm text-zinc-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-zinc-800 file:text-white hover:file:bg-zinc-700 cursor-pointer"
              />
            </div>
          </section>

          {/* Floating Save Button Mobile / Sticky Desktop */}
          <div className="sticky top-6">
            <button
  disabled={
    !formData.name.trim() ||
    !formData.title.trim() ||
    !formData.bio.trim()
  }
  className={`
    w-full
    px-8 py-4
    rounded-xl
    font-bold
    shadow-lg shadow-white/5
    flex items-center justify-center gap-2
    transition-all duration-300

    ${
      !formData.name.trim() ||
      !formData.title.trim() ||
      !formData.bio.trim()

        ? `
          bg-zinc-800
          text-zinc-500
          cursor-not-allowed
          animate-pulse
        `

        : `
          bg-white
          text-black
          hover:bg-zinc-200
          hover:scale-[1.02]
          active:scale-[0.98]
          cursor-pointer
        `
    }
  `}
>
              <span>Save Profile Changes</span>
            </button>
            <p className="text-center text-xs text-zinc-500 mt-4 px-4">
              Changes will be reflected immediately on your public portfolio
              page.
            </p>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ManageProfile;
