
import React, { useRef } from "react";
import useSliderAnimation from "../../hooks/useSliderAnimation";
import "./AnimatedSlider.css";
import mediaRenderer from "../../utils/mediaRenderer";

const StarterPageSlider = ({ items }) => {
  const sliderTrackRef = useRef(null);
  useSliderAnimation(sliderTrackRef, items, 40);
  return (
    <div className="slider-wrapper">
      
      <div className="slider-track" ref={sliderTrackRef}>
        {items.map((item, index) => (
          <div className="slider-item" key={index}>
              <div className="slider-content">
              <h2>{item.name}</h2>
              <p>{item.desc}</p>
            </div>
           {mediaRenderer({
              src: item.image,
              type: item.type,
              alt: item.name,
              className: "media-class-name",

            })}
          </div>
        ))}
      </div>
    </div>
  );
};

export default StarterPageSlider;
