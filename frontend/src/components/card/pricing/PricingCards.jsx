import React from "react";
import Card from "react-bootstrap/Card";
import { CgWebsite } from "react-icons/cg";
import { Row, Col } from "react-bootstrap";
import "../../../style/Pricing.css"

function PricingCards(props) {
  return (
    <Card className="project-card-view p-3 d-flex flex-column">
    <div className="d-flex align-items-center justify-content-between mb-3">
      <img
        src={props.imgPath}
        alt="card-img"
        className="card-small-img"
      />
      <div className="subscribe-badge">Subscribe</div>
    </div>
  
    <div className="flex-grow-1 d-flex flex-column">
      <div className="text-left">
        <Card.Title className="card-title">{props.title}</Card.Title>
        <Card.Text className="card-text">{props.description}</Card.Text>
      </div>
      <div className="card-price mt-auto">
        <span>{props.price}</span>
        <span className="billing-cycle">/ {props.billingCycle}</span>
      </div>
    </div>
  
    {props.demoLink && (
      <div className="mt-3 text-start">
        <a
          href={props.demoLink}
          target="_blank"
          rel="noopener noreferrer"
          className="subscribe-badge text-decoration-none d-inline-block subscribe-btn"
        >
          <CgWebsite style={{ marginBottom: "3px" }} /> &nbsp; Book a call
        </a>
      </div>
    )}
  
    <div className="gray-line"></div>
  
    <Row className="card-row">
      <Col sm={6}>
        <div className="card-column">
          {props.leftColumnText && props.leftColumnText.map((point, index) => (
            <p key={index}>{point}</p>
          ))}
        </div>
      </Col>
      <Col sm={6}>
        <div className="card-column">
          {props.rightColumnText && props.rightColumnText.map((point, index) => (
            <p key={index}>{point}</p>
          ))}
        </div>
      </Col>
    </Row>
  </Card>  
  );
}

export default PricingCards;
