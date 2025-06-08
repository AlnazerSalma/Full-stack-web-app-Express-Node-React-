import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import NavBar from "../../components/Navbar";
import { MemoryRouter } from "react-router-dom";

// Utility for rendering NavBar with a custom route
const renderWithRouter = (ui, { route = "/" } = {}) => {
  window.history.pushState({}, "Test page", route);
  return render(<MemoryRouter initialEntries={[route]}>{ui}</MemoryRouter>);
};

describe("NavBar Component", () => {
  it("renders logo correctly", () => {
    renderWithRouter(<NavBar />);
    const logo = screen.getByAltText("brand");
    expect(logo).toBeInTheDocument();
  });

  it("renders all navigation links", () => {
    renderWithRouter(<NavBar />);
    const expectedLinks = ["Home", "Work", "Pricing", "Careers", "Contact"];
    expectedLinks.forEach((text) => {
      expect(screen.getByText(text)).toBeInTheDocument();
    });
  });
  it("nav links have correct href attribute matching the route path", () => {
    renderWithRouter(<NavBar />);
    const paths = ["/", "/work", "/pricing", "/careers", "/contact"];
    paths.forEach((path) => {
      const linkText = path === "/" ? "Home" : path.charAt(1).toUpperCase() + path.slice(2);
      const link = screen.getByText(linkText);
      expect(link).toHaveAttribute("href", path);
    });
  });
  
  it("toggles navbar on hamburger click", () => {
    renderWithRouter(<NavBar />);
    const toggleButton = screen.getByLabelText("Toggle navigation");
    fireEvent.click(toggleButton);
    // Ensure no crash, menu still visible
    expect(screen.getByText("Home")).toBeInTheDocument();
  });

  it("matches snapshot", () => {
  const { asFragment } = renderWithRouter(<NavBar />);
  expect(asFragment()).toMatchSnapshot();
});

});

