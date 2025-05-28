import React, { Suspense, lazy } from "react";
import { Container, Row } from "react-bootstrap";
import "../../style/Home.css";

// Lazy load components

const HomeSlider = lazy(() => import("../animated_slider/HomePageSlider"));
const VideoSlider = lazy(() => import("./VideoSlider"));
function Home2() {
  return (
    <Container fluid className="no-padding">
      <Row className="no-padding">
        <Suspense fallback={<div>Loading slider...</div>}>
          <HomeSlider />
        </Suspense>
        <Suspense fallback={<div>Loading slider...</div>}>
          <VideoSlider />
        </Suspense>
      </Row>
    </Container>
  );
}

export default Home2;
