import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import {
  AiFillGithub,
  AiFillInstagram,
} from "react-icons/ai";
import { FaLinkedinIn } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import "../style/Footer.css"

function Footer() {
  const location = useLocation();

  const links = [
    { path: "/", label: "Home" },
    { path: "/work", label: "Work" },
    { path: "/pricing", label: "Pricing" },
    { path: "/careers", label: "Careers" },
    { path: "/contact", label: "Contact" },
  ];

  return (
    <Container fluid className="footer">
      <Row className="justify-content-between">
        <Col md="4" className="footer-nav d-flex justify-content-start align-items-center">
          {links.map(({ path, label }) => (
            <Link
              key={path}
              to={path}
              className={`footer-link ${location.pathname === path ? "active" : ""}`}
            >
              {label}
            </Link>
          ))}
        </Col>
        <Col md="4" className="footer-body">
          <ul className="footer-icons">
            <li className="social-icons">
              <a
                href="https://github.com/AlnazerSalma"
                target="_blank"
                rel="noopener noreferrer"
              >
                <AiFillGithub />
              </a>
            </li>
            <li className="social-icons">
              <a
                href="https://www.linkedin.com/in/salma-alnazer/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaLinkedinIn />
              </a>
            </li>
            <li className="social-icons">
              <a
                href="https://www.instagram.com/salma_alnazer/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <AiFillInstagram />
              </a>
            </li>
          </ul>
        </Col>
      </Row>
    </Container>
  );
}

export default Footer;
