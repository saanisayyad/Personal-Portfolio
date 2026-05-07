import {
  useEffect,
  useState,
  useCallback,
} from "react";

import Cropper from "react-easy-crop";

import {
  Loader2,
} from "lucide-react";

import {
  getProfile,
  updateProfile,
} from "../../services/profileService";

import getCroppedImg
from "../../components/utils/cropImage";

const ManageProfile = () => {

  const [formData, setFormData] =
    useState({
      name: "",
      title: "",
      bio: "",
      profileImage: null,
      github: "",
      linkedin: "",
      instagram: "",
      resume: "",
    });

  const [loading, setLoading] =
    useState(false);

  // Cropper States
  const [imageSrc, setImageSrc] =
    useState(null);

  const [crop, setCrop] =
    useState({
      x: 0,
      y: 0,
    });

  const [zoom, setZoom] =
    useState(1);

  const [
    croppedAreaPixels,
    setCroppedAreaPixels,
  ] = useState(null);

  const [
    showCropper,
    setShowCropper,
  ] = useState(false);

  const fetchProfile =
    async () => {

      try {

        const data =
          await getProfile();

        if (data)
          setFormData(data);

      } catch (error) {

        console.log(error);
      }
    };

  useEffect(() => {

    fetchProfile();

  }, []);

  const handleChange =
    (e) => {

      setFormData({
        ...formData,
        [e.target.name]:
          e.target.value,
      });
    };

  const onCropComplete =
    useCallback(
      (
        croppedArea,
        croppedAreaPixels
      ) => {

        setCroppedAreaPixels(
          croppedAreaPixels
        );

      },
      []
    );

  const handleCropSave =
    async () => {

      try {

        const croppedImage =
          await getCroppedImg(
            imageSrc,
            croppedAreaPixels
          );

        const croppedFile =
          new File(
            [croppedImage],
            "profile.jpg",
            {
              type:
                "image/jpeg",
            }
          );

        setFormData({
          ...formData,
          profileImage:
            croppedFile,
        });

        setShowCropper(false);

      } catch (error) {

        console.log(error);
      }
    };

  const handleSubmit =
    async (e) => {

      e.preventDefault();

      try {

        setLoading(true);

        const profileFormData =
          new FormData();

        profileFormData.append(
          "name",
          formData.name
        );

        profileFormData.append(
          "title",
          formData.title
        );

        profileFormData.append(
          "bio",
          formData.bio
        );

        profileFormData.append(
          "github",
          formData.github
        );

        profileFormData.append(
          "linkedin",
          formData.linkedin
        );

        profileFormData.append(
          "instagram",
          formData.instagram
        );

        profileFormData.append(
          "resume",
          formData.resume
        );

        if (
          formData.profileImage
        ) {

          profileFormData.append(
            "profileImage",
            formData.profileImage
          );
        }

        await updateProfile(
          profileFormData
        );

        alert(
          "Profile Updated Successfully ✨"
        );

      } catch (error) {

        console.log(error);

        alert("Update Failed");

      } finally {

        setLoading(false);
      }
    };

  const inputStyles =
    `
      w-full
      p-3
      rounded-lg
      bg-zinc-800/50
      border
      border-zinc-700
      focus:border-blue-500
      focus:ring-1
      focus:ring-blue-500
      outline-none
      transition-all
      placeholder:text-zinc-500
      text-white
    `;

  const labelStyles =
    `
      block
      text-sm
      font-medium
      text-zinc-400
      mb-2
      ml-1
    `;

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

        {/* Left Column */}
        <div className="md:col-span-2 space-y-8">

          {/* Basic Information */}
          <section className="bg-zinc-900/40 border border-zinc-800 p-6 rounded-2xl space-y-6">

            <h2 className="text-xl font-semibold text-white border-b border-zinc-800 pb-4">
              Basic Information
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

              <div>

                <label className={labelStyles}>
                  Full Name
                </label>

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

                <label className={labelStyles}>
                  Professional Title
                </label>

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

              <label className={labelStyles}>
                Short Bio
              </label>

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

          {/* Social Links */}
          <section className="bg-zinc-900/40 border border-zinc-800 p-6 rounded-2xl space-y-6">

            <h2 className="text-xl font-semibold text-white border-b border-zinc-800 pb-4">
              Social Links
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

              <div>

                <label className={labelStyles}>
                  GitHub URL
                </label>

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

                <label className={labelStyles}>
                  LinkedIn URL
                </label>

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

                <label className={labelStyles}>
                  Instagram URL
                </label>

                <input
                  type="text"
                  name="instagram"
                  placeholder="https://instagram.com/..."
                  value={formData.instagram}
                  onChange={handleChange}
                  className={inputStyles}
                />

              </div>

              <div>

                <label className={labelStyles}>
                  Resume URL
                </label>

                <input
                  type="text"
                  name="resume"
                  placeholder="https://your-resume-link.com"
                  value={formData.resume}
                  onChange={handleChange}
                  className={inputStyles}
                />

              </div>

            </div>

          </section>

        </div>

        {/* Right Column */}
        <div className="space-y-8">

          {/* Media */}
          <section className="bg-zinc-900/40 border border-zinc-800 p-6 rounded-2xl space-y-6">

            <h2 className="text-xl font-semibold text-white border-b border-zinc-800 pb-4">
              Media & Documents
            </h2>

            <div>

              <label className={labelStyles}>
                Profile Picture
              </label>

              <div className="relative group">

                <input
                  type="file"
                  accept="image/*"
                  onChange={async (e) => {

                    const file =
                      e.target.files[0];

                    if (!file) return;

                    const imageDataUrl =
                      URL.createObjectURL(file);

                    setImageSrc(
                      imageDataUrl
                    );

                    setShowCropper(true);
                  }}
                  className="block w-full text-sm text-zinc-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-zinc-800 file:text-white hover:file:bg-zinc-700 cursor-pointer"
                />

              </div>

            </div>

          </section>

          {/* Save Button */}
          <div className="sticky top-6">

            <button
              disabled={
                loading ||
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
                  loading ||
                  !formData.name.trim() ||
                  !formData.title.trim() ||
                  !formData.bio.trim()

                    ? `
                      bg-zinc-800
                      text-zinc-500
                      cursor-not-allowed
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

              {
                loading ? (

                  <>
                    <Loader2
                      size={20}
                      className="animate-spin"
                    />

                    Updating...
                  </>

                ) : (

                  <span>
                    Save Profile Changes
                  </span>
                )
              }

            </button>

            <p className="text-center text-xs text-zinc-500 mt-4 px-4">
              Changes will be reflected immediately on your public portfolio
              page.
            </p>

          </div>

        </div>

      </form>

      {/* Cropper Modal */}
      {
        showCropper && (

          <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center">

            <div className="bg-zinc-900 p-6 rounded-3xl w-[95%] max-w-xl">

              <div className="relative w-full h-[400px] bg-black rounded-2xl overflow-hidden">

                <Cropper
                  image={imageSrc}
                  crop={crop}
                  zoom={zoom}
                  aspect={1}
                  cropShape="round"
                  onCropChange={setCrop}
                  onZoomChange={setZoom}
                  onCropComplete={onCropComplete}
                />

              </div>

              <div className="mt-6">

                <input
                  type="range"
                  min={1}
                  max={3}
                  step={0.1}
                  value={zoom}
                  onChange={(e) =>
                    setZoom(
                      e.target.value
                    )
                  }
                  className="w-full"
                />

              </div>

              <div className="flex justify-end gap-4 mt-6">

                <button
                  onClick={() =>
                    setShowCropper(false)
                  }
                  className="px-5 py-2 rounded-xl bg-zinc-800"
                >
                  Cancel
                </button>

                <button
                  onClick={handleCropSave}
                  className="px-5 py-2 rounded-xl bg-white text-black font-semibold"
                >
                  Save Crop
                </button>

              </div>

            </div>

          </div>
        )
      }

    </div>
  );
};

export default ManageProfile;