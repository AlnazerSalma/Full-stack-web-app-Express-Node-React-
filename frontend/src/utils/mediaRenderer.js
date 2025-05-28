import React from "react";

const mediaRenderer = ({ src, type, alt = "", className = "" }) => {
  if (!src) return null;

  if (type === "video" || src.endsWith(".mp4")) {
    return (
      <video
        src={src}
        autoPlay
        loop
        muted
        playsInline
        className={className}
      />
    );
  }

  return <img src={src} alt={alt} className={className} />;
};

export default mediaRenderer;
