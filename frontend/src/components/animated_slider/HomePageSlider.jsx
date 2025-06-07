import React, { lazy, Suspense, useRef } from "react";
import "./AnimatedSlider.css";
import useFetch from "../../utils/useFetch";
import useRightSlidePanel from "../../hooks/useRightSlidePanel";
import useSliderAnimation from "../../hooks/useSliderAnimation";
import mediaRenderer from "../../utils/mediaRenderer";

const WorksSliderPanel = lazy(() =>
  import("../right_slider_panel/WorksRightSlidePanel")
);

const HomePageSlider = () => {
  const sliderTrackRef = useRef(null);
  const {
    data: works,
    loading,
    error,
  } = useFetch("http://localhost:5000/api/works");
  const slideDuration = 40;
  const { isOpen, selectedItem, openPanel, closePanel } = useRightSlidePanel();

  useSliderAnimation(sliderTrackRef, works, slideDuration);

  if (loading) {
    return <div className="loading-message">{loading}</div>;
  }

  if (error) {
    return <p className="error-message">Failed to fetch slider data.</p>;
  }

  return (
    <div className="slider-wrapper">
      <div className="slider-track" ref={sliderTrackRef}>
        {works.map((work, index) => (
          <div
            className="slider-item"
            key={index}
            onClick={() => openPanel(work)}
          >
            <div className="slider-content">
              <h3>{work.title || work.name}</h3>
              <p>{work.desc}</p>
            </div>
            {mediaRenderer({
              src: work.media?.[0]?.src,
              type: work.media?.[0]?.type,
              alt: work.title || work.name,
              className: "media-class-name",
            })}
          </div>
        ))}
      </div>
      {selectedItem && (
        <Suspense
          fallback={<div>Loading details...</div>}
        >
          <WorksSliderPanel
            isOpen={isOpen}
            onClose={closePanel}
            role={selectedItem}
          />
        </Suspense>
      )}
    </div>
  );
};

export default HomePageSlider;
