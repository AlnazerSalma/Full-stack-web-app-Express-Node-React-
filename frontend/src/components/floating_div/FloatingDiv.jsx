import React from "react";
import { useNavigate } from "react-router-dom"; 
import './FloatingDiv.css';

const FloatinDiv = ({ img, text1, text2 }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/careers");
  };

  return (
    <div className="floatingDiv" onClick={handleClick} style={{ cursor: 'pointer' }}>
      <img src={img} alt="" />
      <span>
        {text1}
        <br />
        {text2}
      </span>
    </div>
  );
};

export default FloatinDiv;
