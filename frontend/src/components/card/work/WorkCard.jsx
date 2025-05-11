import React, { useState} from "react";
import './WorkCard.css';
import WorksSliderPanel from "../../right_slider_panel/WorksCareerRightSlidePanel";
import useFetchData from "../../../utils/useFetchData";


function WorkCard() {
  const { data: works, loading, error } = useFetchData("http://localhost:5000/api/works");
  const [selectedItem, setSelectedItem] = useState(null);
  const [isPanelOpen, setIsPanelOpen] = useState(false);

  const handleRowClick = (item) => {
    setSelectedItem(item);
    setIsPanelOpen(true);
  };

  const handleClosePanel = () => {
    setIsPanelOpen(false);
    setSelectedItem(null);
  };
   if (loading) {

    return <p className="loading-message">Loading ...</p>

  }

  if (error) {

    return <p className="error-message">{error}</p>
  }

  return (
    <>
      <div className="workcard-container">
        {works.map((item, index) => {
          const firstMedia = item.media?.[0];

          return (
            <div className="workcard-row" key={index} onClick={() => handleRowClick(item)}>
              <div className="workcard-title">{item.title}</div>
              <div className="workcard-image-wrapper">
                {firstMedia?.type === "video" ? (
                  <video
                    src={firstMedia.src}
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="workcard-media"
                  />
                ) : (
                  <img
                    src={firstMedia?.src || item.image}
                    alt={item.title}
                    className="workcard-media"
                  />
                )}
              </div>
              <div className="workcard-desc">{item.type}</div>
              <div className="workcard-year">{item.year}</div>
            </div>
          );
        })}
      </div>

      {selectedItem && (
        <WorksSliderPanel
          isOpen={isPanelOpen}
          onClose={handleClosePanel}
          role={selectedItem}
        />
      )}
    </>
  );
}

export default WorkCard;
