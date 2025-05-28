import React, { lazy, Suspense } from "react";
import { Container, Row, Col } from "react-bootstrap";
import WorkCard from "../components/card/work/WorkCard";
import "../style/Work.css";

const Techstack = lazy(() => import("../components/stack/TechStack"));
function WorkPage() {
  return (
    <Container fluid className="about-section">
      <Container>
        <Col
          md={7}
          style={{
            justifyContent: "center",
            paddingTop: "30px",
            paddingBottom: "50px",
          }}
        >
          <h1
            style={{
              fontSize: "3em",
              textAlign: "left",
            }}
          >
            Who <strong className="purple">We’re ?</strong>
          </h1>
          <h1
            style={{
              fontSize: "2em",
              textAlign: "left",
            }}
          >
            Partners + Projects
          </h1>
        </Col>
        <Row>
          <WorkCard />
        </Row>
        <h1 className="project-heading">Technologies We Work With</h1>
        <Suspense fallback={<div>Loading tech stack...</div>}>
          <Techstack />
        </Suspense>
      </Container>
    </Container>
  );
}

export default WorkPage;
