import React, { lazy, Suspense } from "react";
import "./WorkCard.css";
import useFetch from "../../../utils/useFetch";
import useRightSlidePanel from "../../../hooks/useRightSlidePanel";
import mediaRenderer from "../../../utils/mediaRenderer";

const WorksSliderPanel = lazy(() =>
  import("../../right_slider_panel/WorksRightSlidePanel")
);

function WorkCard() {
  const {
    data: works,
    loading,
    error,
  } = useFetch("http://localhost:5000/api/works");
  const { isOpen, selectedItem, openPanel, closePanel } = useRightSlidePanel();

  if (loading) return <p className="loading-message">{loading}</p>;
  if (error) return <p className="error-message">{error}</p>;
  return (
    <>
      <div className="workcard-container">
        {works.map((item, index) => {
          const firstMedia = item.media?.[0];

          return (
            <div
              className="workcard-row"
              key={index}
              onClick={() => openPanel(item)}
            >
              <div className="workcard-title">{item.title}</div>
              <div className="workcard-image-wrapper">
                {mediaRenderer({
                  src: firstMedia?.src || item.image,
                  type: firstMedia?.type,
                  alt: item.title,
                  className: "workcard-media",
                })}
              </div>
              <div className="workcard-desc">{item.type}</div>
              <div className="workcard-year">{item.year}</div>
            </div>
          );
        })}
      </div>
      {selectedItem && (
         <Suspense fallback={<div>Loading details...</div>}>
        <WorksSliderPanel
          isOpen={isOpen}
          onClose={closePanel}
          role={selectedItem}
        />
        </Suspense>
      )}
    </>
  );
}

export default WorkCard;
