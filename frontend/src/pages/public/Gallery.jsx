import { useCallback, useEffect, useMemo, useState } from "react";
import { ImageIcon, RefreshCw } from "lucide-react";

import { getGalleryImages } from "../../services/galleryService";
import PageHeader from "../../components/ui/PageHeader";
import ProgressiveImage from "../../components/ui/ProgressiveImage";

const Gallery = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);
  const [galleryWidth, setGalleryWidth] = useState(1000);
  const [imageDimensions, setImageDimensions] = useState({});
  const [galleryNode, setGalleryNode] = useState(null);

  const galleryRef = useCallback((node) => {
    setGalleryNode(node);
  }, []);

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

  useEffect(() => {
    if (!galleryNode) return undefined;

    const updateWidth = () => {
      setGalleryWidth(Math.round(galleryNode.getBoundingClientRect().width) || 1000);
    };

    updateWidth();

    if (typeof ResizeObserver === "undefined") {
      window.addEventListener("resize", updateWidth);
      return () => window.removeEventListener("resize", updateWidth);
    }

    const observer = new ResizeObserver(updateWidth);
    observer.observe(galleryNode);
    return () => observer.disconnect();
  }, [galleryNode]);

  const targetRowHeight =
    galleryWidth < 520 ? 118 : galleryWidth < 900 ? 165 : 220;
  const gap = galleryWidth < 640 ? 8 : 12;

  const rows = useMemo(() => {
    const availableWidth = Math.max(galleryWidth, 1);
    const packedRows = [];
    let currentItems = [];
    let aspectSum = 0;

    images.forEach((item, index) => {
      const dimensions = imageDimensions[item._id];
      const ratio =
        dimensions?.width > 0 && dimensions?.height > 0
          ? dimensions.width / dimensions.height
          : 1.4;

      const estimatedNextWidth = (aspectSum + ratio) * targetRowHeight;
      const estimatedGapWidth = currentItems.length * gap;

      if (
        currentItems.length > 0 &&
        estimatedNextWidth + estimatedGapWidth > availableWidth
      ) {
        packedRows.push({ items: currentItems, aspectSum, isLast: false });
        currentItems = [];
        aspectSum = 0;
      }

      currentItems.push({ item, index, ratio });
      aspectSum += ratio;
    });

    if (currentItems.length > 0) {
      packedRows.push({ items: currentItems, aspectSum, isLast: true });
    }

    return packedRows.map((row) => {
      const availableGaps = gap * Math.max(row.items.length - 1, 0);
      const fittedHeight = (availableWidth - availableGaps) / row.aspectSum;
      const rowHeight =
        !row.isLast && row.items.length > 1
          ? fittedHeight
          : Math.min(targetRowHeight, fittedHeight);

      return {
        height: Math.max(1, rowHeight),
        items: row.items.map(({ item, index, ratio }) => ({
          item,
          index,
          width: Math.max(1, ratio * rowHeight),
        })),
      };
    });
  }, [images, imageDimensions, galleryWidth, targetRowHeight, gap]);

  const handleImageLoad = useCallback((id, dimensions) => {
    setImageDimensions((previous) => {
      const current = previous[id];
      if (
        current?.width === dimensions.naturalWidth &&
        current?.height === dimensions.naturalHeight
      ) {
        return previous;
      }

      return {
        ...previous,
        [id]: {
          width: dimensions.naturalWidth,
          height: dimensions.naturalHeight,
        },
      };
    });
  }, []);

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
          <div className="space-y-2 sm:space-y-3" aria-busy="true" aria-label="Loading gallery images">
            <div className="flex h-28 gap-2 sm:h-40 sm:gap-3">
              <div className="w-[34%] animate-pulse rounded-xl border border-white/[0.06] bg-zinc-900/50 sm:rounded-2xl" />
              <div className="flex-1 animate-pulse rounded-xl border border-white/[0.06] bg-zinc-900/50 sm:rounded-2xl" />
              <div className="w-[22%] animate-pulse rounded-xl border border-white/[0.06] bg-zinc-900/50 sm:rounded-2xl" />
            </div>
            <div className="flex h-28 gap-2 sm:h-40 sm:gap-3">
              <div className="w-[20%] animate-pulse rounded-xl border border-white/[0.06] bg-zinc-900/50 sm:rounded-2xl" />
              <div className="w-[32%] animate-pulse rounded-xl border border-white/[0.06] bg-zinc-900/50 sm:rounded-2xl" />
              <div className="flex-1 animate-pulse rounded-xl border border-white/[0.06] bg-zinc-900/50 sm:rounded-2xl" />
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
          <div ref={galleryRef} className="w-full" aria-label="Photo gallery">
            <div className="flex flex-col" style={{ gap }}>
              {rows.map((row, rowIndex) => (
                <div
                  key={`row-${rowIndex}`}
                  className="flex w-full items-stretch"
                  style={{ gap, height: row.height }}
                >
                  {row.items.map(({ item, index, width }) => (
                    <figure
                      key={item._id}
                      className="group relative m-0 min-w-0 overflow-hidden rounded-xl border border-white/[0.07] bg-zinc-900/50 transition-[border-color,box-shadow] duration-300 hover:border-cyan-200/25 hover:shadow-[0_12px_32px_rgba(0,0,0,0.22)] sm:rounded-2xl"
                      style={{ flex: `0 0 ${width}px`, height: row.height }}
                    >
                      <ProgressiveImage
                        src={item.imageUrl}
                        alt={`Gallery image ${index + 1}`}
                        width={900}
                        priority={index < 3}
                        onImageLoad={(dimensions) =>
                          handleImageLoad(item._id, dimensions)
                        }
                        className="h-full w-full transition-transform duration-500 ease-out group-hover:scale-[1.025]"
                      />
                    </figure>
                  ))}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Gallery;
