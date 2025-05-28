import React from "react";
import { Container, Row, Col, Image } from "react-bootstrap";
import useFetch from "../../utils/useFetch";
import "../../style/Home.css";
import YouTubeEmbed from "../../utils/youTubeEmbed";
function VideoSlider() {
  const {
    data: videos,
    loading,
    error,
  } = useFetch("http://localhost:5000/api/homeVideos");

  if (loading) {
    return <p className="loading-message">{loading}</p>;
  }

  if (error) {
    return <p className="error-message">Failed to load videos.</p>;
  }

  return (
    <Container>
      <Row>
        <h1 className="home-about-title">
          Why <span className="purple">Haptic ?</span>
        </h1>
        <p className="home-about-body">
          Startups come to us when <br />
          they need a team that can <br />
          deliver real results.
        </p>
      </Row>
      <Row className="mt-4">
        {videos.map((videoItem, index) => (
          <Col md={6} key={index} className="mb-4">
            <div className="d-flex align-items-center mb-2">
              <Image
                src={videoItem.icon}
                alt={videoItem.name}
                roundedCircle
                width={50}
                height={50}
                className="me-3"
              />
              <h5 className="mb-0">{videoItem.name}</h5>
            </div>
            {/* Use reusable YouTubeEmbed component */}
            <YouTubeEmbed videoUrl={videoItem.video} title={videoItem.name} />
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default VideoSlider;
