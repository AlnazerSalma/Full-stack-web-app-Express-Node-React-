import React from "react";
import "./AnimatedSlider.css";

const isVideo = (url) => url.endsWith(".mp4");

const StarterPageSlider = ({ items }) => {
  return (
    <div className="slider-wrapper">
      
      <div className="slider-track">
        {items.map((item, index) => (
          <div className="slider-item" key={index}>
              <div className="slider-content">
              <h2>{item.name}</h2>
              <p>{item.desc}</p>
            </div>
            {isVideo(item.image) ? (
              <video src={item.image} autoPlay loop muted playsInline />
            ) : (
              <img src={item.image} alt={item.name} />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default StarterPageSlider;
