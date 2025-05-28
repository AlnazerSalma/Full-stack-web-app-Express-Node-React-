import React from "react";

const YouTubeEmbed = ({ videoUrl, title }) => {
  const embedUrl = videoUrl.includes("youtu.be")
    ? videoUrl.replace("youtu.be", "www.youtube.com/embed")
    : videoUrl;

  return (
    <div className="video-container rounded-video">
      <iframe
        src={`${embedUrl}?controls=1&modestbranding=1&rel=0&showinfo=0`}
        title={title}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </div>
  );
};

export default YouTubeEmbed;
