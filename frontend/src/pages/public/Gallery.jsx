import { useCallback, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  ImageIcon,
  ChevronLeft,
  ChevronRight,
  RefreshCw,
} from "lucide-react";

import { getGalleryImages } from "../../services/galleryService";
import PageHeader from "../../components/ui/PageHeader";
import ProgressiveImage from "../../components/ui/ProgressiveImage";
import CircularCarousel from "../../components/ui/CircularCarousel";

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

  const carouselItems = images.map((item, index) => ({
    src: item.imageUrl,
    alt: `Gallery image ${index + 1}`,
  }));

  return (
    <section className="relative min-h-screen overflow-hidden px-4 py-28 text-white sm:px-6 lg:px-8">
      <div
        className="pointer-events-none absolute left-1/2 top-36 h-80 w-[min(80vw,720px)] -translate-x-1/2 rounded-full bg-cyan-500/[0.055] blur-[115px]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute bottom-12 right-0 h-72 w-72 rounded-full bg-violet-500/[0.045] blur-[105px]"
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
          <div
            className="flex h-[420px] items-center justify-center sm:h-[500px] lg:h-[560px]"
            aria-busy="true"
            aria-label="Loading gallery images"
          >
            <div className="relative flex h-56 w-56 items-center justify-center rounded-full border border-dashed border-cyan-300/20 sm:h-72 sm:w-72">
              <div className="absolute inset-5 animate-pulse rounded-full border border-violet-300/15" />
              <div className="h-28 w-20 animate-pulse rounded-xl border border-white/10 bg-zinc-800/65 sm:h-36 sm:w-24" />
            </div>
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
          <div className="relative h-[420px] w-full sm:h-[500px] lg:h-[560px]">
            <CircularCarousel
              items={carouselItems}
              preset="cylinder"
              intro="rise"
              cardWidth={220}
              aspectRatio={0.78}
              gap={28}
              autoplay="drift"
              speed={7}
              direction="left"
              draggable
              momentum={0.55}
              snap
              pauseOnHover
              focusOnClick
              parallax={0.16}
              stretch={0.16}
              depthFade={0.62}
              fadeColor="#09090b"
              innerShade={0.72}
              cornerRadius={14}
              captions={false}
              onItemClick={(_, index) => setSelectedIndex(index)}
              className="rounded-[2rem]"
            />
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
              initial={{ opacity: 0, scale: 0.97, y: 8 }}
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
