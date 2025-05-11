import React, { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Roles from "../components/career/Roles";
import RightSlidePanel from "../components/right_slider_panel/CareerRightSlidePanel";
import useFetchData from "../utils/useFetchData";
import "../style/Careers.css";

function CareerPage() {
  const {
    data: careerData,
    loading,
    error,
  } = useFetchData("http://localhost:5000/api/careers");
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState(null);

  const handleRoleClick = (role) => {
    setSelectedRole(role);
    setIsPanelOpen(true);
  };

  const handleClosePanel = () => {
    setIsPanelOpen(false);
    setSelectedRole(null);
  };

  return (
    <Container fluid className="careers-section">
      <Container>
        <Row>
          <Col className="text-start">
            <h1 className="careers-title">Working at Haptic</h1>
            <h1 className="careers-subtitle">
              Great work starts with <br /> great people —{" "}
              <strong className="purple">join us.</strong>
            </h1>{" "}
            {loading && <p className="loading-message">Loading roles...</p>}
            {error && (
              <>
                <p className="error-message">{error}</p>
              </>
            )}
            {!loading && !error && (
              <>
                <h1 className="careers-open-roles">⚪ Open Roles</h1>
                {careerData.map((role, idx) => (
                  <Roles
                    key={idx}
                    title={role.title}
                    location={role.location}
                    type={role.type}
                    onClick={() => handleRoleClick(role)}
                  />
                ))}
              </>
            )}
          </Col>
        </Row>
      </Container>

      {selectedRole && (
        <RightSlidePanel
          isOpen={isPanelOpen}
          onClose={handleClosePanel}
          role={selectedRole}
        />
      )}
    </Container>
  );
}

export default CareerPage;
