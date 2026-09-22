import { useState } from "react";

const ProgressiveImage = ({
  src,
  alt = "",
  className = "",
  priority = false,
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

  const isCloudinary = src.includes("res.cloudinary.com");

  const optimizedSrc = isCloudinary
    ? src.replace(
        "/upload/",
        "/upload/w_800,q_auto,f_auto,dpr_auto/"
      )
    : src;

  return (
    <div className="relative overflow-hidden w-full h-full bg-zinc-900">
      {!loaded && (
        <div className="absolute inset-0 bg-zinc-900 animate-pulse" />
      )}

      <img
        src={optimizedSrc}
        alt={alt}
        loading={priority ? "eager" : "lazy"}
        fetchPriority={priority ? "high" : "auto"}
        decoding="async"
        onLoad={() => setLoaded(true)}
        onError={() => setError(true)}
        className={`
          w-full
          h-full
          object-cover
          transition-opacity
          duration-500
          ${loaded ? "opacity-100" : "opacity-0"}
          ${className}
        `}
      />
    </div>
  );
};

export default ProgressiveImage;