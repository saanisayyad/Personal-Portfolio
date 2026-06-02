import { useEffect, useState } from "react";
import {
  Plus,
  Trash2,
  Image as ImageIcon,
  UploadCloud,
  Loader2,
} from "lucide-react";

import {
  getGalleryImages,
  uploadGalleryImage,
  deleteGalleryImage,
} from "../../services/galleryService";
import ProgressiveImage from "../../components/ui/ProgressiveImage";

const ManageGallery = () => {
  const [images, setImages] = useState([]);
  const [previews, setPreviews] = useState([]);
  const [gallery, setGallery] = useState([]);
  const [isUploading, setIsUploading] = useState(false);

  const fetchGallery = async () => {
    try {
      const data = await getGalleryImages();
      setGallery(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchGallery();
  }, []);

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);

    setImages(files);

    const previewUrls = files.map((file) =>
      URL.createObjectURL(file)
    );

    setPreviews(previewUrls);
  };

  const handleUpload = async (e) => {
    e.preventDefault();

    if (images.length === 0) return;

    setIsUploading(true);

    try {
      const formData = new FormData();

      images.forEach((file) => {
        formData.append("images", file);
      });

      await uploadGalleryImage(formData);

      setImages([]);
      setPreviews([]);

      fetchGallery();
    } catch (error) {
      alert("Upload Failed");
    } finally {
      setIsUploading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this image?")) return;

    try {
      await deleteGalleryImage(id);
      setGallery(
        gallery.filter(
          (item) => item._id !== id
        )
      );
    } catch (error) {
      alert("Delete Failed");
    }
  };

  return (
    <div className="min-h-screen bg-[#09090b] text-zinc-100 pb-20">
      <div className="max-w-7xl mx-auto px-6 pt-12">
        {/* HEADER */}
        <header className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <h1 className="text-5xl font-black tracking-tighter bg-gradient-to-r from-white to-zinc-500 bg-clip-text text-transparent">
              Curation Studio
            </h1>
            <p className="text-zinc-500 text-lg mt-2 font-medium">
              Manage and showcase your visuals.
            </p>
          </div>

          <div className="flex items-center gap-2 px-4 py-2 bg-zinc-900/50 border border-zinc-800 rounded-full text-sm font-medium text-zinc-400">
            <ImageIcon size={16} />
            {gallery.length} Items
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* UPLOAD PANEL */}
          <div className="lg:col-span-4">
            <form
              onSubmit={handleUpload}
              className="bg-zinc-900/40 border border-zinc-800/50 backdrop-blur-xl p-8 rounded-3xl sticky top-8 space-y-6"
            >
              <div>
                <h2 className="text-xl font-bold">
                  Upload Images
                </h2>
                <p className="text-sm text-zinc-500">
                  Select multiple images at once.
                </p>
              </div>

              <div className="relative group overflow-hidden border-2 border-dashed border-zinc-800 rounded-2xl hover:border-zinc-600 transition-all aspect-video flex flex-col items-center justify-center bg-black/20">
                {previews.length > 0 ? (
                  <div className="grid grid-cols-3 gap-2 p-3 w-full h-full overflow-hidden">
                    {previews
                      .slice(0, 6)
                      .map((preview, index) => (
                        <img
                          key={index}
                          src={preview}
                          alt="Preview"
                          className="w-full h-20 object-cover rounded-lg"
                        />
                      ))}
                  </div>
                ) : (
                  <div className="flex flex-col items-center gap-3 text-zinc-500 group-hover:text-zinc-300">
                    <UploadCloud
                      size={32}
                      strokeWidth={1.5}
                    />
                    <div className="text-center">
                      <p className="text-sm font-semibold">
                        Drop or Click
                      </p>
                      <p className="text-[10px]">
                        Select multiple images
                      </p>
                    </div>
                  </div>
                )}

                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleImageChange}
                  className="absolute inset-0 opacity-0 cursor-pointer"
                />
              </div>

              <button
                type="submit"
                disabled={
                  isUploading ||
                  images.length === 0
                }
                className="w-full bg-white hover:bg-zinc-200 disabled:bg-zinc-800 disabled:text-zinc-600 text-black h-12 rounded-xl font-bold flex items-center justify-center gap-2 transition-all"
              >
                {isUploading ? (
                  <Loader2
                    className="animate-spin"
                    size={20}
                  />
                ) : (
                  <>
                    <Plus
                      size={20}
                      strokeWidth={3}
                    />
                    Upload {images.length} Images
                  </>
                )}
              </button>
            </form>
          </div>

          {/* GALLERY */}
          <div className="lg:col-span-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              {gallery.map((item) => (
                <div
                  key={item._id}
                  className="group bg-zinc-900/40 border border-zinc-800/50 rounded-3xl overflow-hidden"
                >
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <ProgressiveImage
                      src={
                              item.imageUrl.replace(
                                "/upload/",
                                "/upload/f_auto,q_auto,w_800/"
                              )
                            }
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
                      <button
                        onClick={() =>
                          handleDelete(item._id)
                        }
                        className="bg-red-500/10 hover:bg-red-500 text-red-500 hover:text-white p-3 rounded-2xl transition-all"
                      >
                        <Trash2 size={20} />
                      </button>
                    </div>
                  </div>

                  <div className="p-4 text-sm text-zinc-500">
  Uploaded successfully
</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageGallery;