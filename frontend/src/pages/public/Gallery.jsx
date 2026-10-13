import { useCallback, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  ImageIcon,
  Expand,
  ChevronLeft,
  ChevronRight,
  RefreshCw,
} from "lucide-react";

import { getGalleryImages } from "../../services/galleryService";
import PageHeader from "../../components/ui/PageHeader";
import ProgressiveImage from "../../components/ui/ProgressiveImage";

const tileAspectRatios = [
  "aspect-[4/5]",
  "aspect-[5/4]",
  "aspect-[3/4]",
  "aspect-square",
  "aspect-[3/5]",
  "aspect-[5/4]",
  "aspect-[4/5]",
  "aspect-[4/3]",
];

const Gallery = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(null);

  const fetchImages = useCallback(async () => {
    setLoading(true);
    setLoadError(false);

    try {
      const data = await getGalleryImages();
      setImages(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Unable to load gallery images:", error);
      setLoadError(true);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchImages();
  }, [fetchImages]);

  const selectedImage =
    selectedIndex === null ? null : images[selectedIndex] || null;

  const closePreview = useCallback(() => {
    setSelectedIndex(null);
  }, []);

  const showPreviousImage = useCallback(() => {
    setSelectedIndex((current) => {
      if (current === null || images.length < 2) return current;
      return (current - 1 + images.length) % images.length;
    });
  }, [images.length]);

  const showNextImage = useCallback(() => {
    setSelectedIndex((current) => {
      if (current === null || images.length < 2) return current;
      return (current + 1) % images.length;
    });
  }, [images.length]);

  useEffect(() => {
    if (selectedIndex === null) return undefined;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        closePreview();
      } else if (event.key === "ArrowLeft") {
        event.preventDefault();
        showPreviousImage();
      } else if (event.key === "ArrowRight") {
        event.preventDefault();
        showNextImage();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [selectedIndex, closePreview, showPreviousImage, showNextImage]);

  return (
    <section className="relative min-h-screen overflow-hidden px-4 py-28 text-white sm:px-6 lg:px-8">
      <div
        className="pointer-events-none absolute left-1/2 top-40 h-72 w-[min(80vw,700px)] -translate-x-1/2 rounded-full bg-cyan-500/[0.035] blur-[100px]"
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto max-w-7xl">
        <PageHeader
          badge="Visual Collection"
          title="Gallery"
          description="A visual collection of moments, memories and creative captures."
          icon={ImageIcon}
        />

        {loading ? (
          <div className="columns-2 gap-4 space-y-4 sm:gap-5 sm:space-y-5 lg:columns-3">
            {tileAspectRatios.slice(0, 6).map((aspect, index) => (
              <div
                key={index}
                className={`mb-4 ${aspect} break-inside-avoid animate-pulse rounded-[1.4rem] border border-white/[0.07] bg-zinc-900/55 sm:mb-5 sm:rounded-[1.8rem]`}
              />
            ))}
          </div>
        ) : loadError ? (
          <div className="flex flex-col items-center justify-center rounded-[2rem] border border-dashed border-zinc-800 px-6 py-20 text-center">
            <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl border border-cyan-300/15 bg-cyan-300/[0.06] text-cyan-200">
              <RefreshCw size={22} />
            </div>
            <h2 className="text-xl font-semibold text-zinc-100">
              Gallery couldn’t load
            </h2>
            <p className="mt-2 max-w-sm text-sm leading-6 text-zinc-400">
              There was a problem loading the images. Please try again.
            </p>
            <button
              type="button"
              onClick={fetchImages}
              className="mt-6 inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-cyan-300/20 bg-cyan-300/[0.08] px-4 py-2.5 text-sm font-medium text-cyan-100 transition-colors hover:border-cyan-200/40 hover:bg-cyan-300/[0.13] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-200"
            >
              <RefreshCw size={16} />
              Try again
            </button>
          </div>
        ) : images.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-[2rem] border border-dashed border-zinc-800 py-28 text-zinc-500">
            <ImageIcon size={48} className="mb-5 opacity-35" />
            <h2 className="mb-2 text-xl font-semibold text-zinc-300">
              No images yet
            </h2>
            <p className="text-sm text-zinc-500">
              Gallery images will appear here.
            </p>
          </div>
        ) : (
          <div className="columns-2 gap-4 space-y-4 sm:gap-5 sm:space-y-5 lg:columns-3">
            {images.map((item, index) => {
              const aspect = tileAspectRatios[index % tileAspectRatios.length];

              return (
                <motion.div
                  key={item._id}
                  initial={{ opacity: 0, y: 22 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.08 }}
                  transition={{
                    duration: 0.48,
                    ease: "easeOut",
                    delay: Math.min((index % 6) * 0.035, 0.18),
                  }}
                  className="mb-4 break-inside-avoid sm:mb-5"
                >
                  <button
                    type="button"
                    onClick={() => setSelectedIndex(index)}
                    aria-label={`Open gallery image ${index + 1}`}
                    className={`group relative block w-full overflow-hidden rounded-[1.4rem] border border-white/[0.07] bg-zinc-900/50 text-left shadow-[0_10px_35px_rgba(0,0,0,0.12)] transition-[border-color,box-shadow,transform] duration-500 hover:-translate-y-0.5 hover:border-cyan-200/25 hover:shadow-[0_18px_45px_rgba(0,0,0,0.22)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-200/80 sm:rounded-[1.8rem] ${aspect}`}
                  >
                    <ProgressiveImage
                      src={item.imageUrl}
                      alt={`Gallery image ${index + 1}`}
                      width={900}
                      priority={index < 2}
                      className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.045] group-focus-visible:scale-[1.02]"
                    />

                    <span
                      className="pointer-events-none absolute inset-0 bg-gradient-to-br from-cyan-300/[0.04] via-transparent to-violet-400/[0.06] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                      aria-hidden="true"
                    />

                    <span className="pointer-events-none absolute bottom-3 right-3 flex h-9 w-9 translate-y-1 items-center justify-center rounded-full border border-white/20 bg-zinc-950/65 text-white opacity-0 shadow-lg backdrop-blur-md transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100 sm:bottom-4 sm:right-4 sm:h-10 sm:w-10">
                      <Expand size={16} aria-hidden="true" />
                    </span>
                  </button>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>

      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closePreview}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-3 backdrop-blur-xl sm:p-6"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.975, y: 8 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.985, y: 6 }}
              transition={{ duration: 0.22, ease: "easeOut" }}
              onClick={(event) => event.stopPropagation()}
              role="dialog"
              aria-modal="true"
              aria-label={`Gallery image preview ${selectedIndex + 1} of ${images.length}`}
              className="relative flex h-full w-full max-w-7xl items-center justify-center"
            >
              <button
                type="button"
                onClick={closePreview}
                aria-label="Close image preview"
                className="absolute right-0 top-0 z-20 flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-zinc-950/75 text-white shadow-lg backdrop-blur-md transition-colors hover:border-white/30 hover:bg-white/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-200 sm:right-1 sm:top-1 sm:h-12 sm:w-12"
              >
                <X size={22} />
              </button>

              {images.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={showPreviousImage}
                    aria-label="Previous image"
                    className="absolute left-0 top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-zinc-950/75 text-white shadow-lg backdrop-blur-md transition-colors hover:border-cyan-200/40 hover:bg-cyan-200/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-200 sm:left-2 sm:h-12 sm:w-12"
                  >
                    <ChevronLeft size={24} />
                  </button>
                  <button
                    type="button"
                    onClick={showNextImage}
                    aria-label="Next image"
                    className="absolute right-0 top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-zinc-950/75 text-white shadow-lg backdrop-blur-md transition-colors hover:border-violet-200/40 hover:bg-violet-200/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-200 sm:right-2 sm:h-12 sm:w-12"
                  >
                    <ChevronRight size={24} />
                  </button>
                </>
              )}

              <div className="flex h-[min(86vh,1000px)] w-[calc(100%_-_5.5rem)] items-center justify-center overflow-hidden rounded-2xl border border-white/[0.12] bg-zinc-950/35 shadow-[0_24px_100px_rgba(0,0,0,0.55)] sm:w-[calc(100%_-_8rem)] sm:rounded-3xl">
                <ProgressiveImage
                  src={selectedImage.imageUrl}
                  alt={`Gallery image ${selectedIndex + 1}`}
                  width={1800}
                  priority
                  className="h-full w-full object-contain"
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
