import React from "react";
import { Container, Row, Col, Spinner } from "react-bootstrap";
import ProjectCard from "../components/card/pricing/PricingCards";
import useFetchData from "../utils/useFetchData"; // Adjust path if different

function PricePage() {
  const { data: pricingPlans, loading, error } = useFetchData("http://localhost:5000/api/pricing");

  return (
    <Container fluid className="project-section">
      <Container>
        <h1 className="project-heading">Pricing & Contact</h1>

        {loading ? (
           <div className="loading-message">
            <p className="loading-message">{loading}</p>
          </div>
        ) : error ? (
           <p className="error-message">{error}</p>
        ) : (
          <Row style={{ justifyContent: "center", paddingBottom: "10px" }}>
            {pricingPlans.map((plan, index) => (
              <Col xs={12} md={6} lg={4} className="project-card" key={index}>
                <ProjectCard {...plan} />
              </Col>
            ))}
          </Row>
        )}
      </Container>
    </Container>
  );
}

export default PricePage;
