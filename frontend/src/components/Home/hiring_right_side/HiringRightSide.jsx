import React from "react";
import { Col } from "react-bootstrap";

import Vector1 from "../../../Assets/home/Vector1.png";
import Vector2 from "../../../Assets/home/Vector2.png";
import boy from "../../../Assets/home/boy.png";

import hiring from "../../../Assets/home/hiring.png";
import FloatinDiv from "./floating_div/FloatingDiv";
import "./HiringRightSide.css"

const HeroRightSection = () => {
  return (
    <Col md={4} style={{ position: "relative", height: "100%" }}>
       <div className="i-right">
                <img src={Vector1} alt="" />
                <img src={Vector2} alt="" />
                <img src={boy} alt="" />

                <div></div>
                <div className="floating-div animated-float-1">
                  <FloatinDiv img={hiring} text1="Senior" text2="Designer" />
                </div>

                <div className="floating-div animated-float-2">
                  <FloatinDiv img={hiring} text1="UI/UX" text2="Designer" />
                </div>

              </div>
    </Col>
  );
};

export default HeroRightSection;
