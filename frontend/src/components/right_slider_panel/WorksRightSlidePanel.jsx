import React, { useRef } from "react";
import useOnClickOutside from "../../hooks/useOnClickOutside";
import MediaRenderer from "../../utils/mediaRenderer";// adjust path if needed
import "./RightSlidePanel.css";

function WorksSliderPanel({ isOpen, onClose, role }) {
  const panelRef = useRef();
  useOnClickOutside(panelRef, onClose, isOpen);

  if (!isOpen || !role) return null;

  return (
    <div className="slide-panel-overlay">
      <div className="slide-panel" ref={panelRef}>
        <div className="panel-header">
          <div className="panel-left-w">
            <img src={role.image} alt={role.title} className="role-icon" />
            <div className="panel-title-container">
              <div className="panel-title">{role.title}</div>
              <div className="panel-min-title">{role.minTitle}</div>
            </div>
          </div>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>

        <div className="panel-content">
          <h1>{role.desc}</h1>
          <p>{role.minDesc}</p>

          <div className="role-tags">
            {role.type.split(",").map((tag, i) => (
              <span key={i} className="role-tag">{tag.trim()}</span>
            ))}
          </div>
         {role.media?.length > 0 && (
            <div className="role-media">
              {role.media.map((item, i) => (
                <div key={i} className="media-item">
                  <MediaRenderer
                    src={item.src}
                    type={item.type}
                    alt={`media-${i}`}
                    className={item.type === "video" ? "video-player" : ""}
                  />
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
