import React from "react";
import { Col, Form } from "react-bootstrap";
import { IoIosSearch } from "react-icons/io";
import "./SearchBar.css";

function SearchBar({ searchInput, setSearchInput, placeholder = "Search..." }) {
  return (
    <Col>
        <div className="custom-search-bar">
          <IoIosSearch className="search-icon" />
          <Form.Control
            type="text"
            placeholder={placeholder}
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            aria-label={placeholder}
          />
        </div>
    </Col>
  );
}

export default SearchBar;
