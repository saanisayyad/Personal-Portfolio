// pages/public/Gallery.jsx

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ImageIcon } from "lucide-react";

import { getGalleryImages } from "../../services/galleryService";

import PageHeader from "../../components/ui/PageHeader";
import GlassCard from "../../components/ui/GlassCard";
import ProgressiveImage from "../../components/ui/ProgressiveImage";
import DriftWall from "../../components/ui/DriftWall";

const Gallery = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null);

  const fetchImages = async () => {
    try {
      const data = await getGalleryImages();

      setImages(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  useEffect(() => {
    if (!selectedImage) return;

    const handleEsc = (e) => {
      if (e.key === "Escape") {
        setSelectedImage(null);
      }
    };

    window.addEventListener("keydown", handleEsc);

    return () => {
      window.removeEventListener("keydown", handleEsc);
    };
  }, [selectedImage]);

  return (
    <section className="min-h-screen text-white py-28 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <PageHeader
          badge="Visual Collection"
          title="Gallery"
          description="A visual collection of moments, memories and creative captures."
          icon={ImageIcon}
        />

        {loading ? (
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-5 space-y-5">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="w-full h-72 rounded-[2rem] border border-zinc-800 bg-zinc-900/40 animate-pulse"
              />
            ))}
          </div>
        ) : images.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-32 border border-dashed border-zinc-800 rounded-[2rem] text-zinc-500">
            <ImageIcon size={54} className="mb-5 opacity-30" />

            <h2 className="text-2xl font-bold mb-2">No Images Yet</h2>

            <p className="text-sm text-zinc-600">
              Gallery images will appear here.
            </p>
          </div>
        ) : (
          <>
            <div className="relative h-[380px] w-full overflow-hidden sm:h-[500px] lg:h-[560px]">
              <DriftWall
                items={images.map((item, index) => ({
                  image: item.imageUrl,
                  alt: `Gallery image ${index + 1}`,
                  galleryIndex: index,
                }))}
                columns={5}
                tileWidth={170}
                tileHeight={124}
                gap={12}
                radius={14}
                tilt={10}
                turn={-10}
                perspective={1350}
                depth={100}
                speed={16}
                direction="up"
                variance={0.22}
                parallax={0.12}
                pauseOnHover
                lift={32}
                fade={0.48}
                dim={0.68}
                grayscale={false}
                overlayColor="#09090b"
                onItemClick={(_, index) => setSelectedImage(images[index])}
                className="rounded-[2rem]"
              />
            </div>
          </>
        )}
      </div>

      {/* MODAL */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            exit={{
              opacity: 0,
            }}
            onClick={() => setSelectedImage(null)}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-xl flex items-center justify-center p-4"
          >
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-6 right-6 text-white bg-white/10 hover:bg-white/20 transition-all p-3 rounded-full z-50"
            >
              <X size={28} />
            </button>

            <motion.div
              initial={{
                scale: 0.85,
                opacity: 0,
              }}
              animate={{
                scale: 1,
                opacity: 1,
              }}
              exit={{
                scale: 0.85,
                opacity: 0,
              }}
              transition={{
                type: "spring",
                damping: 20,
              }}
              onClick={(e) => e.stopPropagation()}
              className="
  w-full
  max-w-7xl
  flex
  justify-center
"
            >
              <div className="overflow-hidden rounded-[2rem] border border-white/10 shadow-2xl">
                <ProgressiveImage
                  src={selectedImage.imageUrl}
                  alt={selectedImage.title}
                  width={1600}
                  className="
    w-full
    max-h-[85vh]
    object-contain
  "
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Gallery;
