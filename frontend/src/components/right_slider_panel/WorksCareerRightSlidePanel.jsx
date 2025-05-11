import React, { useEffect } from "react";
import "./RightSlidePanel.css";

function WorksSliderPanel({ isOpen, onClose, role }) {
  useEffect(() => {
    function handleOutsideClick(event) {
      if (event.target.classList.contains("slide-panel-overlay")) {
        onClose();
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleOutsideClick);
    }

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [isOpen, onClose]);

  if (!isOpen || !role) return null;

  return (
    <div className="slide-panel-overlay">
      <div className="slide-panel">
        <div className="panel-header">
          <div className="panel-left-w">
            <img src={role.image} alt={role.title} className="role-icon" />
            <div className="panel-title-container">
              <div className="panel-title">{role.title}</div>
              <div className="panel-min-title">{role.minTitle}</div>
            </div>
          </div>

          <button className="close-btn" onClick={onClose}>
            ×
          </button>
        </div>
        <div className="panel-content">
          <h1>{role.desc}</h1>
          <p>{role.minDesc}</p>
          <div className="role-tags">
            {role.type.split(",").map((tag, index) => (
              <span key={index} className="role-tag">
                {tag.trim()}
              </span>
            ))}
          </div>
          {role.media && role.media.length > 0 && (
            <div className="role-media">
              {role.media.map((item, index) => (
                <div key={index} className="media-item">
                  {item.type === "image" ? (
                    <img src={item.src} alt={`media-${index}`} />
                  ) : item.type === "video" ? (
                    <video
                      autoPlay
                      muted
                      loop
                      src={item.src}
                      className="video-player"
                      title={`video-${index}`}
                    >
                      Your browser does not support the video tag.
                    </video>
                  ) : null}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default WorksSliderPanel;
