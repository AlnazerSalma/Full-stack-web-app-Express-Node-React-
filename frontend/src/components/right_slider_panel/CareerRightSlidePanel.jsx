import React, { useRef } from "react";
import useOnClickOutside from "../../hooks/useOnClickOutside";// adjust path if needed
import "./RightSlidePanel.css";

function CareerRightSlidePanel({ isOpen, onClose, position }) {
  const panelRef = useRef();
  useOnClickOutside(panelRef, onClose, isOpen);

  if (!isOpen || !position) return null;

  return (
    <div className="slide-panel-overlay">
      <div className="slide-panel" ref={panelRef}>
        <div className="panel-header">
          <div className="panel-left">
            <div className="hiring-label">Hiring</div>
            <div className="panel-title">{position.title}</div>
          </div>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>

        <div className="panel-content">
          <h1>{position.desc}</h1>

          <div className="role-tags">
            <span className="role-tag">{position.type}</span>
            <span className="role-tag">{position.location}</span>
            <span className="role-tag">{position.mode}</span>
          </div>

          <div className="apply-btn-container">
            <button
              className="apply-btn"
              onClick={() =>
                (window.location.href = `mailto:salmalanazer2002@gmail.com?subject=Application for ${encodeURIComponent(position.title)}`)
              }
            >
              Apply
            </button>
          </div>

          {position.image && (
            <img src={position.image} alt={position.title} className="role-image" />
          )}

          <section>
            <h3>About Us</h3>
            <p>{position.about}</p>
          </section>

          <div className="gray-line" />

          <section>
            <h3>In This Role, You Will:</h3>
            <ul>{position.responsibilities.map((item, i) => <li key={i}>{item}</li>)}</ul>
          </section>

          <div className="gray-line" />

          <section>
            <h3>You Should Apply If:</h3>
            <ul>{position.qualifications.map((item, i) => <li key={i}>{item}</li>)}</ul>
          </section>

          {position.niceToHaves?.length > 0 && (
            <>
              <div className="gray-line" />
              <section>
                <h3>Nice to Haves</h3>
                <ul>{position.niceToHaves.map((item, i) => <li key={i}>{item}</li>)}</ul>
              </section>
            </>
          )}

          <div className="gray-line" />
          <section>
            <h3>Working Together</h3>
            <p>{position.workingTogether}</p>
          </section>

          <div className="gray-line" />
          <section>
            <h3>Application</h3>
            <p>{position.application}</p>
          </section>

          <div className="gray-line" />
          <div className="apply-btn-container">
            <button
              className="apply-btn"
              onClick={() =>
                (window.location.href = `mailto:salmalanazer2002@gmail.com?subject=Application for ${encodeURIComponent(position.title)}`)
              }
            >
              Apply
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CareerRightSlidePanel;
