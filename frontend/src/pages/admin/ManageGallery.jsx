import { useEffect, useState } from "react";
import { Plus, Trash2, Image as ImageIcon, UploadCloud, Loader2 } from "lucide-react";
import {
  getGalleryImages,
  uploadGalleryImage,
  deleteGalleryImage
} from "../../services/galleryService";

const ManageGallery = () => {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [gallery, setGallery] = useState([]);
  const [isUploading, setIsUploading] = useState(false);

  const fetchGallery = async () => {
    try {
      const data = await getGalleryImages();
      setGallery(data);
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };

  useEffect(() => {
    fetchGallery();
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!image) return;

    setIsUploading(true);
    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("image", image);

      await uploadGalleryImage(formData);
      setTitle("");
      setImage(null);
      setPreview(null);
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
      setGallery(gallery.filter(item => item._id !== id));
    } catch (error) {
      alert("Delete Failed");
    }
  };

  return (
    <div className="min-h-screen bg-[#09090b] text-zinc-100 pb-20">
      <div className="max-w-7xl mx-auto px-6 pt-12">
        {/* Header Section */}
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
          
          {/* Action Sidebar */}
          <div className="lg:col-span-4">
            <form
              onSubmit={handleUpload}
              className="bg-zinc-900/40 border border-zinc-800/50 backdrop-blur-xl p-8 rounded-3xl sticky top-8 space-y-6"
            >
              <div className="space-y-1">
                <h2 className="text-xl font-bold">Upload Asset</h2>
                <p className="text-sm text-zinc-500">Add a new high-resolution image to your feed.</p>
              </div>
              
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-[0.2em]">Asset Title</label>
                  <input
                    type="text"
                    placeholder="e.g. Cinematic Dusk"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full bg-black/40 border border-zinc-800 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all placeholder:text-zinc-700"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-[0.2em]">Image File</label>
                  <div className="relative group overflow-hidden border-2 border-dashed border-zinc-800 rounded-2xl hover:border-zinc-600 transition-all aspect-video flex flex-col items-center justify-center bg-black/20">
                    {preview ? (
                      <>
                        <img src={preview} alt="Preview" className="absolute inset-0 w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-sm">
                          <p className="text-white text-xs font-bold">Replace Image</p>
                        </div>
                      </>
                    ) : (
                      <div className="flex flex-col items-center gap-3 text-zinc-500 group-hover:text-zinc-300">
                        <UploadCloud size={32} strokeWidth={1.5} />
                        <div className="text-center">
                          <p className="text-sm font-semibold">Drop or Click</p>
                          <p className="text-[10px]">PNG, JPG up to 10MB</p>
                        </div>
                      </div>
                    )}
                    <input
                      type="file"
                      onChange={handleImageChange}
                      className="absolute inset-0 opacity-0 cursor-pointer"
                      accept="image/*"
                    />
                  </div>
                </div>
              </div>

              <button 
                disabled={isUploading || !image}
                className="w-full bg-white hover:bg-zinc-200 disabled:bg-zinc-800 disabled:text-zinc-600 text-black h-12 rounded-xl font-bold flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
              >
                {isUploading ? (
                  <Loader2 className="animate-spin" size={20} />
                ) : (
                  <><Plus size={20} strokeWidth={3} /> Publish Asset</>
                )}
              </button>
            </form>
          </div>

          {/* Gallery Main View */}
          <div className="lg:col-span-8">
            {gallery.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-32 border-2 border-dashed border-zinc-900 rounded-[3rem] bg-zinc-900/10">
                <div className="p-4 bg-zinc-900 rounded-full mb-4">
                  <ImageIcon className="text-zinc-700" size={40} />
                </div>
                <h3 className="text-xl font-semibold text-zinc-400">The gallery is empty</h3>
                <p className="text-zinc-600 text-sm mt-1">Ready to showcase your first piece?</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-2 gap-8">
                {gallery.map((item) => (
                  <div
                    key={item._id}
                    className="group bg-zinc-900/40 border border-zinc-800/50 rounded-3xl overflow-hidden hover:border-zinc-700 transition-all duration-500"
                  >
                    <div className="relative aspect-[16/10] overflow-hidden">
                      <img
                        src={item.imageUrl}
                        alt={item.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                        <button
                          onClick={() => handleDelete(item._id)}
                          className="bg-red-500/10 hover:bg-red-500 text-red-500 hover:text-white p-3 rounded-2xl transition-all backdrop-blur-md border border-red-500/20"
                        >
                          <Trash2 size={20} />
                        </button>
                      </div>
                    </div>
                    <div className="p-5">
                      <p className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest mb-1">Title</p>
                      <h2 className="font-bold text-zinc-100 truncate text-lg">
                        {item.title || "Untitled Fragment"}
                      </h2>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};

export default ManageGallery;