
import React from "react";
import "./CareerOpenPosition.css";

function CareerOpenPosition({ title,mode, location, type, onClick }) {
  return (
    <div className="open_position" onClick={onClick}>
      <div className="open_position-row">
        <h2 className="open_position-title">{title}</h2>
        <p className="open_position-meta">
          <span className="open_position-mode">{mode}</span> |{" "}
          <span className="open_position-location">{location}</span> |{" "}
          <span className="open_position-type">{type}</span>
        </p>
      </div>
    </div>
  );
}

export default CareerOpenPosition;
