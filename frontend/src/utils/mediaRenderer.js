import React from "react";
const MediaRenderer = ({ src, type, alt = "", className = "" }) => {
  if (!src) return null;

  const isVideo = type === "video" || src.endsWith(".mp4");

  return isVideo ? (
    <video
      src={src}
      autoPlay
      loop
      muted
      playsInline
      className={className}
    />
  ) : (
    <img src={src} alt={alt} className={className} />
  );
};

export default MediaRenderer;
