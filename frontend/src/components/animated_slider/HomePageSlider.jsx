import React, { useRef, useState } from "react";
import "./AnimatedSlider.css";
import WorksSliderPanel from "../right_slider_panel/WorksCareerRightSlidePanel";
import useFetchData from "../../utils/useFetchData";

const HomePageSlider = () => {
  const sliderTrackRef = useRef(null);
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const {
    data: works,
    loading,
    error,
  } = useFetchData("http://localhost:5000/api/works");
  const slideDuration = 40;

  const handleItemClick = (work) => {
    setSelectedItem(work);
    setIsPanelOpen(true);
  };

  const handleClosePanel = () => {
    setIsPanelOpen(false);
  };

  if (works && sliderTrackRef.current) {
    sliderTrackRef.current.style.animation = `${slideDuration}s linear infinite slideAnimation`;
  }



  if (loading) {
    return <div className="loading-message">Loading ...</div>;
  }

  if (error) {
    return  <p className="error-message">Failed to fitch slider data.</p>
  }

  return (
    <div className="slider-wrapper">
      <div className="slider-track" ref={sliderTrackRef}>
        {works.map((work, index) => (
          <div
            className="slider-item"
            key={index}
            onClick={() => handleItemClick(work)}
          >
            <div className="slider-content">
              <h3>{work.title || work.name}</h3>
              <p>{work.desc}</p>
            </div>
            {work.media?.[0]?.type === "video" ? (
              <video src={work.media[0]?.src} autoPlay loop muted playsInline />
            ) : (
              <img src={work.media?.[0]?.src} alt={work.title || work.name} />
            )}
          </div>
        ))}
      </div>
      {isPanelOpen && (
        <WorksSliderPanel
          isOpen={isPanelOpen}
          onClose={handleClosePanel}
          role={selectedItem}
        />
      )}
    </div>
  );
};

export default HomePageSlider;
