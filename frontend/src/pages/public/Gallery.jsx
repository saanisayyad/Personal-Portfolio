// pages/public/Gallery.jsx

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ImageIcon } from "lucide-react";

import { getGalleryImages } from "../../services/galleryService";

import PageHeader from "../../components/ui/PageHeader";
import GlassCard from "../../components/ui/GlassCard";
import ProgressiveImage from "../../components/ui/ProgressiveImage";

const Gallery = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] =
    useState(null);

  const fetchImages = async () => {
    try {
      const data = await getGalleryImages();

      // preload first few images
      data.slice(0, 4).forEach((img) => {
        const image = new Image();
        image.src = img.imageUrl;
      });

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
            <ImageIcon
              size={54}
              className="mb-5 opacity-30"
            />

            <h2 className="text-2xl font-bold mb-2">
              No Images Yet
            </h2>

            <p className="text-sm text-zinc-600">
              Gallery images will appear here.
            </p>
          </div>
        ) : (
          <>
            {/* MOBILE LAYOUT */}
            <div className="block sm:hidden">
              <div className="grid grid-cols-2 gap-3 auto-rows-[140px]">
                {images.map((item, index) => {
                  let cardClass =
                    "col-span-1 row-span-1";

                  const patternIndex =
                    index % 6;

                  if (patternIndex === 0) {
                    cardClass =
                      "col-span-2 row-span-2";
                  } else if (
                    patternIndex === 3 ||
                    patternIndex === 4
                  ) {
                    cardClass =
                      "col-span-1 row-span-2";
                  } else if (
                    patternIndex === 5
                  ) {
                    cardClass =
                      "col-span-2 row-span-1";
                  }

                  return (
                    <motion.div
                      key={item._id}
                      initial={{
                        opacity: 0,
                        y: 20,
                      }}
                      whileInView={{
                        opacity: 1,
                        y: 0,
                      }}
                      viewport={{
                        once: true,
                      }}
                      transition={{
                        duration: 0.5,
                        delay:
                          index * 0.04,
                      }}
                      className={cardClass}
                    >
                      <div
                        onClick={() =>
                          setSelectedImage(
                            item
                          )
                        }
                        className="
                          relative
                          w-full
                          h-full
                          rounded-3xl
                          overflow-hidden
                          cursor-pointer
                          group
                          shadow-xl
                          active:scale-[0.98]
                          transition-transform
                          duration-300
                        "
                      >
                        <ProgressiveImage
                          src={
                            item.imageUrl
                          }
                          alt={item.title}
                          className="
                            w-full
                            h-full
                            object-cover
                            transition-transform
                            duration-700
                            group-hover:scale-110
                          "
                        />

                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

                        {patternIndex ===
                          0 && (
                          <div className="absolute top-3 left-3">
                            <span className="px-3 py-1 rounded-full bg-cyan-500/90 text-white text-[10px] font-semibold uppercase tracking-wider">
                              Featured
                            </span>
                          </div>
                        )}

                        <div className="absolute bottom-0 left-0 right-0 p-3">
                          <p
                            className={`text-white font-semibold line-clamp-2 ${
                              patternIndex ===
                              0
                                ? "text-lg"
                                : "text-xs"
                            }`}
                          >
                            {item.title}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>

            {/* DESKTOP LAYOUT */}
            <div className="hidden sm:block sm:columns-2 lg:columns-3 gap-5 space-y-5">
              {images.map(
                (item, index) => (
                  <motion.div
                    key={item._id}
                    initial={{
                      opacity: 0,
                      y: 40,
                    }}
                    whileInView={{
                      opacity: 1,
                      y: 0,
                    }}
                    viewport={{
                      once: true,
                    }}
                    transition={{
                      duration: 0.7,
                      delay:
                        index * 0.05,
                    }}
                    className="break-inside-avoid"
                  >
                    <GlassCard className="cursor-pointer group">
                      <div
                        onClick={() =>
                          setSelectedImage(
                            item
                          )
                        }
                        className="relative"
                      >
                        <div className="overflow-hidden rounded-[2rem]">
                          <ProgressiveImage
                            src={
                              item.imageUrl
                            }
                            alt={
                              item.title
                            }
                            className="
                              w-full
                              object-cover
                              transition-transform
                              duration-700
                              group-hover:scale-110
                            "
                          />
                        </div>

                        <div className="absolute inset-0 rounded-[2rem] bg-gradient-to-t from-black/80 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-end p-6">
                          <div>
                            <h2 className="text-xl font-bold mb-1">
                              {
                                item.title
                              }
                            </h2>

                            <p className="text-zinc-300 text-sm">
                              Click to
                              preview
                            </p>
                          </div>
                        </div>
                      </div>
                    </GlassCard>
                  </motion.div>
                )
              )}
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
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-xl flex items-center justify-center p-4"
          >
            <button
              onClick={() =>
                setSelectedImage(null)
              }
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
              className="max-w-6xl w-full"
            >
              <div className="overflow-hidden rounded-[2rem] border border-white/10 shadow-2xl">
                <ProgressiveImage
                  src={
                    selectedImage.imageUrl
                  }
                  alt={
                    selectedImage.title
                  }
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