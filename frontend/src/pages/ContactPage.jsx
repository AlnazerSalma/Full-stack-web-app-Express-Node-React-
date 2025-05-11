import React, { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import { Container, Row, Col } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faPhone,
  faMapMarkerAlt,
} from "@fortawesome/free-solid-svg-icons";
import "../style/Conatct.css";

const ContactPage = () => {
  const form = useRef();
  const [errorMessage, setErrorMessage] = useState("");

  const sendEmail = (e) => {
    e.preventDefault();

    const userName = form.current.user_name.value;
    const userEmail = form.current.user_email.value;
    const message = form.current.message.value;

    if (!userName || !userEmail || !message) {
      setErrorMessage("All fields are required.");
      return;
    }

    emailjs
      .sendForm(
        "service_o5mhimh",
        "template_favyk9s",
        form.current,
        "0u2lYmABEeCxduIw8"
      )
      .then(
        (result) => {
          console.log(result.text);
          console.log("Message sent");
          window.location.reload();
        },
        (error) => {
          console.log(error.text);
        }
      );
  };

  return (
    <Container fluid className="contact-section">
      <h1 className="contact-title"
      >
        Contact Me
      </h1>
      <Row>
      <Col md={6}>
          <div className="form-box">
            <form ref={form} onSubmit={sendEmail}>
              <label>Name</label>
              <input type="text" name="user_name" />
              <label>Email</label>
              <input type="email" name="user_email" />
              <label>Message</label>
              <textarea name="message" />
              <input type="submit" value="Send" />
            </form>
            {errorMessage && <div style={{ color: "red" }}>{errorMessage}</div>}
          </div>
        </Col>
        <Col
          md={5}
          style={{ paddingLeft: "2rem", margin: "4rem 0rem 0rem 0rem" }}
        >
          <div className="contact-info" style={{ textAlign: "left" }}>
            <h2 style={{ fontSize: "3rem", paddingLeft: "0.5rem",  }}>
              Get in Touch
            </h2>
            <p style={{ fontSize: "1.2rem", padding: "0.5rem" }}>
              <FontAwesomeIcon
                icon={faMapMarkerAlt}
                style={{
                  marginRight: "1rem",
                  color: "#0093AF",
                  fontSize: "22px",
                }}
              />
              Address: Palestine-Hebron
            </p>
            <p style={{ fontSize: "1.2rem", padding: "0.4rem" }}>
              <FontAwesomeIcon
                icon={faEnvelope}
                style={{
                  marginRight: "1rem",
                  color: "#0093AF",
                  fontSize: "22px",
                }}
              />
              Email: salmaalnazer2002@gmail.com
            </p>
            <p style={{ fontSize: "1.2rem", padding: "0.5rem" }}>
              <FontAwesomeIcon
                icon={faPhone}
                style={{
                  marginRight: "1rem",
                  color: "#0093AF",
                  fontSize: "22px",
                }}
              />
              Phone: (+970) 595-552-599
            </p>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default ContactPage;
