// pages/public/Gallery.jsx

import {
  useEffect,
  useState,
} from "react"

import {
  motion,
  AnimatePresence,
} from "framer-motion"

import {
  X,
  ImageIcon,
} from "lucide-react"

import {
  getGalleryImages,
} from "../../services/galleryService"

import PageHeader
  from "../../components/ui/PageHeader"

import GlassCard
  from "../../components/ui/GlassCard"

const Gallery = () => {

  const [images, setImages] =
    useState([])

  const [loading,
    setLoading] =
    useState(true)

  const [selectedImage,
    setSelectedImage] =
    useState(null)

  const fetchImages =
    async () => {

      try {

        const data =
          await getGalleryImages()

        setImages(data)

      } catch (error) {

        console.log(error)

      } finally {

        setLoading(false)
      }
    }

  useEffect(() => {

    fetchImages()

  }, [])

  return (

    <section className="min-h-screen text-white py-28 px-4 sm:px-6 lg:px-8">

      <div className="max-w-7xl mx-auto">

        {/* HEADER */}
        <PageHeader
          badge="Visual Collection"
          title="Gallery"
          description="
          A visual collection of moments,
          memories and creative captures.
          "
          icon={ImageIcon}
        />

        {/* LOADING */}
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

          /* EMPTY STATE */
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

          /* GALLERY */
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-5 space-y-5">

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

                  <GlassCard
                    className="cursor-pointer"
                  >

                    <div
                      onClick={() =>
                        setSelectedImage(item)
                      }
                    >

                      {/* IMAGE */}
                      <div className="overflow-hidden">

                        <img
                          src={item.imageUrl}
                          alt={item.title}
                          loading="lazy"
                          className="w-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />

                      </div>

                      {/* OVERLAY */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-end p-6">

                        <div>

                          <h2 className="text-xl font-bold mb-1">

                            {item.title}

                          </h2>

                          <p className="text-zinc-300 text-sm">

                            Click to preview

                          </p>

                        </div>

                      </div>

                    </div>

                  </GlassCard>

                </motion.div>

              )
            )}

          </div>

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

            {/* CLOSE */}
            <button
              onClick={() =>
                setSelectedImage(null)
              }
              className="absolute top-6 right-6 text-white bg-white/10 hover:bg-white/20 transition-all p-3 rounded-full"
            >

              <X size={28} />

            </button>

            {/* IMAGE */}
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

              <img
                src={
                  selectedImage.imageUrl
                }
                alt={
                  selectedImage.title
                }
                className="w-full max-h-[85vh] object-contain rounded-[2rem] border border-white/10 shadow-2xl"
              />

              {/* CAPTION */}
              <div className="mt-6 text-center">

                <h2 className="text-2xl md:text-3xl font-bold">

                  {selectedImage.title}

                </h2>

              </div>

            </motion.div>

          </motion.div>

        )}

      </AnimatePresence>

    </section>
  )
}

export default Gallery