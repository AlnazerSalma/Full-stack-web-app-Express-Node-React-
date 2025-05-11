
import React from "react";
import "./Roles.css";

function Roles({ title, location, type, onClick }) {
  return (
    <div className="roles" onClick={onClick}>
      <div className="roles-row">
        <h2 className="roles-title">{title}</h2>
        <p className="roles-meta">
          <span className="roles-location">{location}</span> |{" "}
          <span className="roles-type">{type}</span>
        </p>
      </div>
    </div>
  );
}

export default Roles;
