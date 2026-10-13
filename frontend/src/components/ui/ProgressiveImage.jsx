import { useState } from "react";

const getCloudinaryUrl = (url, width = 600) => {
  if (!url) return "";

  // Not a Cloudinary URL
  if (!url.includes("res.cloudinary.com")) {
    return url;
  }

  const uploadMarker = "/upload/";
  const uploadIndex = url.indexOf(uploadMarker);

  if (uploadIndex === -1) {
    return url;
  }

  const beforeUpload =
    url.slice(0, uploadIndex + uploadMarker.length);

  const afterUpload =
    url.slice(uploadIndex + uploadMarker.length);

  const firstSegment =
    afterUpload.split("/")[0];

  // Check whether the URL already contains
  // Cloudinary transformations.
  const transformationPrefixes = [
    "w_",
    "h_",
    "c_",
    "f_",
    "q_",
    "dpr_",
    "ar_",
    "g_",
    "e_",
  ];

  const alreadyTransformed =
    transformationPrefixes.some((prefix) =>
      firstSegment.startsWith(prefix)
    );

  if (alreadyTransformed) {
    return url;
  }

  return (
    beforeUpload +
    `w_${width},q_auto,f_auto,dpr_auto/` +
    afterUpload
  );
};


const ProgressiveImage = ({
  src,
  alt = "",
  className = "",
  priority = false,
  width = 600,
  objectFit = "cover",
  onImageLoad,
}) => {

  const [loaded, setLoaded] =
    useState(false);

  const [error, setError] =
    useState(false);


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


  const optimizedSrc =
    getCloudinaryUrl(src, width);


  return (

    <div
      className="
        relative
        overflow-hidden
        w-full
        h-full
        bg-zinc-900
      "
    >

      {!loaded && (

        <div
          className="
            absolute
            inset-0
            bg-zinc-900
            animate-pulse
          "
        />

      )}


      <img

        src={optimizedSrc}

        alt={alt}

        loading={
          priority
            ? "eager"
            : "lazy"
        }

        fetchPriority={
          priority
            ? "high"
            : "auto"
        }

        decoding="async"

        onLoad={(event) => {
          setLoaded(true);
          onImageLoad?.({
            naturalWidth: event.currentTarget.naturalWidth,
            naturalHeight: event.currentTarget.naturalHeight,
          });
        }}

        onError={() =>
          setError(true)
        }

        className={`
          w-full
          h-full
          ${objectFit === "contain" ? "object-contain" : "object-cover"}
          transition-opacity
          duration-500
          ${loaded
            ? "opacity-100"
            : "opacity-0"
          }
          ${className}
        `}
      />

    </div>
  );
};


export default ProgressiveImage;