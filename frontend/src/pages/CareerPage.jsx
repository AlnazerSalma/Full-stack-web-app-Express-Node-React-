import React, { lazy, Suspense } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Roles from "../components/career/Roles";
import useFetch from "../utils/useFetch";
import useRightSlidePanel from "../hooks/useRightSlidePanel";
import "../style/Careers.css";

const CareerRightSlidePanel = lazy(() =>
  import("../components/right_slider_panel/CareerRightSlidePanel")
);

function CareerPage() {
  const {
    data: careerData,
    loading,
    error,
  } = useFetch("http://localhost:5000/api/careers");

  const {
    isOpen,
    selectedItem,
    openPanel,
    closePanel,
  } = useRightSlidePanel();

  return (
    <Container fluid className="careers-section">
      <Container>
        <Row>
          <Col className="text-start">
            <h1 className="careers-title">Working at Haptic</h1>
            <h1 className="careers-subtitle">
              Great work starts with <br /> great people —{" "}
              <strong className="purple">join us.</strong>
            </h1>
            {loading && <p className="loading-message">{loading}</p>}
              {error && <p className="error-message">{error}</p>}
            {!loading && !error && (
              <>
                <h1 className="careers-open-roles">⚪ Open Roles</h1>
                {careerData.map((role, idx) => (
                  <Roles
                    key={idx}
                    title={role.title}
                    location={role.location}
                    type={role.type}
                    onClick={() => openPanel(role)}
                  />
                ))}
              </>
            )}
          </Col>
        </Row>
      </Container>

      {selectedItem && (
        <Suspense fallback={<div>Loading details...</div>}>
        <CareerRightSlidePanel
           isOpen={isOpen}
           onClose={closePanel}
         role={selectedItem}
        />
        </Suspense>
      )}
    </Container>
  );
}

export default CareerPage;
