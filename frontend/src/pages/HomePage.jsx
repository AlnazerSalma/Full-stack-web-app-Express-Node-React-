import { Container, Row, Col } from "react-bootstrap";
import Type from "../components/Home/Type";
import Home2 from "../components/Home/Home2";
import HeroRightSection from "../components/Home/hiring_right_side/HiringRightSide";

function HomePage() {
  return (
    <section>
      <Container fluid className="home-section" id="home">
        <Container className="home-content">
          <Row>
            <Col md={7} className="home-header">
              <h1 style={{ paddingBottom: 15 }} className="heading">
                Haptic{" "}
                <span className="wave" role="img" aria-labelledby="wave">
                  🧐
                </span>
              </h1>
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
            <Col> <div className="d-none d-md-block">
    <HeroRightSection />
  </div></Col>
            
          </Row>
        </Container>
        <Home2 />
      </Container>
    </section>
  );
}

export default HomePage;
