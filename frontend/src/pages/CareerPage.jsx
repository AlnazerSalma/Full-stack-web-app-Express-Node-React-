import React, { lazy, Suspense } from "react";
import { Container, Row, Col } from "react-bootstrap";
import SearchBar from "../components/search_bar/SearchBar";
import CareerOpenPosition from "../components/career/CareerOpenPosition";
import useSearch from "../hooks/useSearch";
import useRightSlidePanel from "../hooks/useRightSlidePanel";
import "../style/Careers.css";

const CareerRightSlidePanel = lazy(() =>
  import("../components/right_slider_panel/CareerRightSlidePanel")
);

const BASE_URL = "http://localhost:5000/api/careers";
function CareerPage() {
  const {
    data: careerData,
    loading,
    error,
    searchInput,
    setSearchInput,
  } = useSearch(BASE_URL);

  const { isOpen, selectedItem, openPanel, closePanel } = useRightSlidePanel();

  return (
    <Container fluid className="careers-section">
      <Container>
        <Row className="align-items-center mb-3">
          <Col md={6}>
            <h1 className="careers-title">Working at Haptic</h1>
          </Col>
          <SearchBar
            searchInput={searchInput}
            setSearchInput={setSearchInput}
            placeholder="Search careers..."
          />
        </Row>

        <Row>
          <Col>
            <h1 className="careers-subtitle">
              Great work starts with <br /> great people —{" "}
              <strong className="purple">join us.</strong>
            </h1>
          </Col>
        </Row>
        <Row>
          <Col className="text-start">
            {loading && <p className="loading-message">{loading}</p>}
            {error && <p className="error-message">{error}</p>}
            {!loading && !error && careerData.length > 0 && (
              <>
                <h1 className="careers-open-positions">⚪ Open position</h1>
                {careerData.map((position, idx) => (
                  <CareerOpenPosition
                    key={position.id || idx}
                    title={position.title}
                    location={position.location}
                    mode={position.mode}
                    type={position.type}
                    onClick={() => openPanel(position)}
                  />
                ))}
              </>
            )}
            {!loading && !error && careerData.length === 0 && (
              <p>No matching positions found.</p>
            )}
          </Col>
        </Row>
      </Container>

      {selectedItem && (
        <Suspense fallback={<div>Loading details...</div>}>
          <CareerRightSlidePanel
            isOpen={isOpen}
            onClose={closePanel}
            position={selectedItem}
          />
        </Suspense>
      )}
    </Container>
  );
}

export default CareerPage;
