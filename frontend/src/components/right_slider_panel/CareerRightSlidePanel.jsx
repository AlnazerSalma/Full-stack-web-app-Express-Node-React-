import React, { useRef } from "react";
import useOnClickOutside from "../../hook/useOnClickOutside";// adjust path if needed
import "./RightSlidePanel.css";

function CareerRightSlidePanel({ isOpen, onClose, role }) {
  const panelRef = useRef();
  useOnClickOutside(panelRef, onClose, isOpen);

  if (!isOpen || !role) return null;

  return (
    <div className="slide-panel-overlay">
      <div className="slide-panel" ref={panelRef}>
        <div className="panel-header">
          <div className="panel-left">
            <div className="hiring-label">Hiring</div>
            <div className="panel-title">{role.title}</div>
          </div>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>

        <div className="panel-content">
          <h1>{role.desc}</h1>

          <div className="role-tags">
            <span className="role-tag">{role.type}</span>
            <span className="role-tag">{role.location}</span>
            <span className="role-tag">{role.mode}</span>
          </div>

          <div className="apply-btn-container">
            <button
              className="apply-btn"
              onClick={() =>
                (window.location.href = `mailto:salmalanazer2002@gmail.com?subject=Application for ${encodeURIComponent(role.title)}`)
              }
            >
              Apply
            </button>
          </div>

          {role.image && (
            <img src={role.image} alt={role.title} className="role-image" />
          )}

          <section>
            <h3>About Us</h3>
            <p>{role.about}</p>
          </section>

          <div className="gray-line" />

          <section>
            <h3>In This Role, You Will:</h3>
            <ul>{role.responsibilities.map((item, i) => <li key={i}>{item}</li>)}</ul>
          </section>

          <div className="gray-line" />

          <section>
            <h3>You Should Apply If:</h3>
            <ul>{role.qualifications.map((item, i) => <li key={i}>{item}</li>)}</ul>
          </section>

          {role.niceToHaves?.length > 0 && (
            <>
              <div className="gray-line" />
              <section>
                <h3>Nice to Haves</h3>
                <ul>{role.niceToHaves.map((item, i) => <li key={i}>{item}</li>)}</ul>
              </section>
            </>
          )}

          <div className="gray-line" />
          <section>
            <h3>Working Together</h3>
            <p>{role.workingTogether}</p>
          </section>

          <div className="gray-line" />
          <section>
            <h3>Application</h3>
            <p>{role.application}</p>
          </section>

          <div className="gray-line" />
          <div className="apply-btn-container">
            <button
              className="apply-btn"
              onClick={() =>
                (window.location.href = `mailto:salmalanazer2002@gmail.com?subject=Application for ${encodeURIComponent(role.title)}`)
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
