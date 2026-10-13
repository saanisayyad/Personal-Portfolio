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
import GlassCard from "../../components/ui/GlassCard";
import ProgressiveImage from "../../components/ui/ProgressiveImage";

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
    <section className="min-h-screen px-4 py-28 text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <PageHeader
          badge="Visual Collection"
          title="Gallery"
          description="A visual collection of moments, memories and creative captures."
          icon={ImageIcon}
        />

        {loading ? (
          <div className="columns-2 gap-4 space-y-4 sm:gap-5 sm:space-y-5 lg:columns-3">
            {[...Array(6)].map((_, index) => (
              <div
                key={index}
                className="mb-4 h-56 w-full break-inside-avoid animate-pulse rounded-[1.5rem] border border-white/[0.06] bg-zinc-900/50 sm:mb-5 sm:h-72 sm:rounded-[2rem]"
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
              className="mt-6 inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-cyan-300/20 bg-cyan-300/[0.08] px-4 py-2.5 text-sm font-medium text-cyan-100 transition hover:border-cyan-200/40 hover:bg-cyan-300/[0.13] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-200"
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
            {images.map((item, index) => (
              <motion.div
                key={item._id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.08 }}
                transition={{ duration: 0.45, delay: Math.min(index * 0.035, 0.2) }}
                className="mb-4 break-inside-avoid sm:mb-5"
              >
                <GlassCard className="group overflow-hidden">
                  <button
                    type="button"
                    onClick={() => setSelectedIndex(index)}
                    aria-label={`Open gallery image ${index + 1}`}
                    className="relative block w-full cursor-zoom-in overflow-hidden rounded-[1.5rem] text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-cyan-200 sm:rounded-[2rem]"
                  >
                    <ProgressiveImage
                      src={item.imageUrl}
                      alt={`Gallery image ${index + 1}`}
                      width={800}
                      priority={index < 2}
                      className="w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.035] group-focus-visible:scale-[1.02]"
                    />

                    <span className="pointer-events-none absolute inset-0 flex items-center justify-center bg-black/0 transition-colors duration-300 group-hover:bg-black/15 group-focus-visible:bg-black/15">
                      <span className="flex h-11 w-11 translate-y-2 items-center justify-center rounded-full border border-white/20 bg-zinc-950/65 text-white opacity-0 shadow-xl backdrop-blur-md transition duration-300 group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100 sm:h-12 sm:w-12">
                        <Expand size={19} aria-hidden="true" />
                      </span>
                    </span>
                  </button>
                </GlassCard>
              </motion.div>
            ))}
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
            role="presentation"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 8 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.97, y: 8 }}
              transition={{ duration: 0.22, ease: "easeOut" }}
              onClick={(event) => event.stopPropagation()}
              role="dialog"
              aria-modal="true"
              aria-label={`Gallery image preview ${selectedIndex + 1} of ${images.length}`}
              className="relative flex h-full max-h-[92vh] w-full max-w-7xl items-center justify-center"
            >
              <button
                type="button"
                onClick={closePreview}
                aria-label="Close image preview"
                className="absolute right-0 top-0 z-20 flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-zinc-950/75 text-white shadow-lg backdrop-blur-md transition hover:border-white/30 hover:bg-white/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-200 sm:right-1 sm:top-1 sm:h-12 sm:w-12"
              >
                <X size={22} />
              </button>

              {images.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={showPreviousImage}
                    aria-label="Previous image"
                    className="absolute left-0 top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-zinc-950/75 text-white shadow-lg backdrop-blur-md transition hover:border-cyan-200/40 hover:bg-cyan-200/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-200 sm:left-2 sm:h-12 sm:w-12"
                  >
                    <ChevronLeft size={24} />
                  </button>
                  <button
                    type="button"
                    onClick={showNextImage}
                    aria-label="Next image"
                    className="absolute right-0 top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-zinc-950/75 text-white shadow-lg backdrop-blur-md transition hover:border-violet-200/40 hover:bg-violet-200/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-200 sm:right-2 sm:h-12 sm:w-12"
                  >
                    <ChevronRight size={24} />
                  </button>
                </>
              )}

              <div className="flex h-full max-h-[85vh] w-full max-w-[calc(100%-5.5rem)] items-center justify-center overflow-hidden rounded-2xl border border-white/[0.12] bg-zinc-950/35 shadow-[0_24px_100px_rgba(0,0,0,0.55)] sm:max-w-[calc(100%-8rem)] sm:rounded-3xl">
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
