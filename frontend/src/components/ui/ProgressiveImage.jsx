import { useState } from "react";

const ProgressiveImage = ({
  src,
  alt,
  className = "",
}) => {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  if (!src || error) {
    return (
      <div
        className={`
          w-full
          h-full
          bg-zinc-900
          flex
          items-center
          justify-center
          text-zinc-500
          text-sm
          rounded-xl
          ${className}
        `}
      >
        No Image
      </div>
    );
  }

  const isCloudinary = src.includes(
    "res.cloudinary.com"
  );

  const blurSrc = isCloudinary
    ? src.replace(
        "/upload/",
        "/upload/w_50,q_10,f_auto/"
      )
    : src;

  const optimizedSrc = isCloudinary
    ? src.replace(
        "/upload/",
        "/upload/w_800,q_auto:good,f_auto,dpr_auto/"
      )
    : src;

  return (
    <div className="relative overflow-hidden w-full h-full">
      {/* BLUR PLACEHOLDER */}
      <img
        src={blurSrc}
        alt={alt}
        aria-hidden="true"
        className={`
          absolute
          inset-0
          w-full
          h-full
          object-cover
          scale-110
          blur-2xl
          transition-opacity
          duration-500
          ${
            loaded
              ? "opacity-0"
              : "opacity-100"
          }
        `}
      />

      {/* MAIN IMAGE */}
      <img
        src={optimizedSrc}
        alt={alt}
        loading="lazy"
        decoding="async"
        onLoad={() => setLoaded(true)}
        onError={() => setError(true)}
        className={`
          w-full
          h-full
          object-cover
          transition-all
          duration-700
          ${
            loaded
              ? "opacity-100 scale-100"
              : "opacity-0 scale-105"
          }
          ${className}
        `}
      />
    </div>
  );
};

export default ProgressiveImage;