import React from "react";
import { Container, Row,} from "react-bootstrap";
import HomeSlider from '../animated_slider/HomePageSlider';
import VideoSlider from './VideoSlider';
import'../../style/Home.css';

function Home2() {
  return (
    <Container fluid className="no-padding">
    <Row className="no-padding">
      <HomeSlider />
      <VideoSlider />
    </Row>
  </Container>
  
  );
}

export default Home2;
