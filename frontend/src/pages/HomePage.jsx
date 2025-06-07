import React, { Suspense, lazy } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Type from "../components/Home/TypeWriter";
import HeroRightSection from "../components/Home/hiring_right_side/HiringRightSide";

const Home2 = lazy(() => {
  console.log("Home2 component is being lazy loaded!");
  return import("../components/Home/Home2");
});


function HomePage() {
  return (
    <section>
      <Container fluid className="home-section" id="home">
        <Container className="home-content">
          <Row>
            <Col md={7} className="home-header">
              <h1 className="heading">Haptic 🧐</h1>
              <h1 className="heading-name">
                We help ambitious
                <br />
                teams turn bold visions
                <br />
                into lasting impact.
              </h1>
              <div style={{ padding: 50, textAlign: "left" }}>
                <Type />
              </div>
            </Col>
            <Col>
              {" "}
              <div className="d-none d-md-block">
                <HeroRightSection />
              </div>
            </Col>
          </Row>
        </Container>
         {/* Lazy load heavy section */}
        <Suspense fallback={<div>Loading more content...</div>}>
          <Home2 />
        </Suspense>
      </Container>
    </section>
  );
}

export default HomePage;
