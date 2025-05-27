import { Container, Row, Col } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faPhone,
  faMapMarkerAlt,
} from "@fortawesome/free-solid-svg-icons";
import ContactForm from "../components/form/ContactForm";
import "../style/Conatct.css";

const ContactPage = () => {
  return (
    <Container fluid className="contact-section">
      <h1 className="contact-title">Contact Me</h1>
      <Row>
        <Col md={6}>
          <ContactForm />
        </Col>

        <Col md={5} className="contact-info-wrapper">
          <div className="contact-info">
            <h2 className="contact-heading">Get in Touch</h2>
            <p className="contact-detail">
              <FontAwesomeIcon icon={faMapMarkerAlt} className="contact-icon" />
              Address: Palestine-Hebron
            </p>
            <p className="contact-detail">
              <FontAwesomeIcon icon={faEnvelope} className="contact-icon" />
              Email: salmaalnazer2002@gmail.com
            </p>
            <p className="contact-detail">
              <FontAwesomeIcon icon={faPhone} className="contact-icon" />
              Phone: (+970) 595-552-599
            </p>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default ContactPage;