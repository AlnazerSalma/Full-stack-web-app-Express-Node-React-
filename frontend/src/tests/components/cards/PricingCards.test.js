import React from "react";
import { render, screen } from "@testing-library/react";
import PricingCards from "../../../components/card/pricing/PricingCards"; // Adjust path if needed
import '@testing-library/jest-dom';
import mockPricing from "../../__mocks_data__/mockPricing";

// Mock Bootstrap components
// jest.mock("react-bootstrap", () => {
//   const Row = ({ children }) => <div>{children}</div>;
//   const Col = ({ children }) => <div>{children}</div>;
//   const Card = ({ children }) => <div>{children}</div>;
//   Card.Title = ({ children, className }) => <h2 className={className}>{children}</h2>;
//   Card.Text = ({ children, className }) => <p className={className}>{children}</p>;
//   return { Row, Col, Card };
// });

describe("PricingCards", () => {

  it("renders title, description, and price correctly", () => {
    render(<PricingCards {...mockPricing[0]} />);
    
    expect(screen.getByText("Pro")).toBeInTheDocument();
    expect(screen.getByText("Pro plan description")).toBeInTheDocument();
    expect(screen.getByText("$19")).toBeInTheDocument();
    expect(screen.getByText("/ month")).toBeInTheDocument();
  });

  it("renders image with correct src and alt", () => {
    render(<PricingCards {...mockPricing[0]} />);
    const img = screen.getByAltText("card-img");
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute("src", mockPricing[0].imgPath);
  });

  it("renders 'Book a call' link if demoLink exists", () => {
    render(<PricingCards {...mockPricing[0]} />);
    const link = screen.getByText(/book a call/i);
    expect(link).toBeInTheDocument();
    // eslint-disable-next-line testing-library/no-node-access
    expect(link.closest("a")).toHaveAttribute("href", mockPricing[0].demoLink);
  });

  it("renders left and right column feature texts", () => {
    render(<PricingCards {...mockPricing[0]} />);
    
    mockPricing[0].leftColumnText.forEach(text =>
      expect(screen.getByText(text)).toBeInTheDocument()
    );

    mockPricing[0].rightColumnText.forEach(text =>
      expect(screen.getByText(text)).toBeInTheDocument()
    );
  });

  it("hides 'Book a call' button when no demoLink is provided", () => {
    const { queryByText } = render(
      <PricingCards {...{ ...mockPricing[0], demoLink: null }} />
    );
    // eslint-disable-next-line testing-library/prefer-screen-queries
    expect(queryByText(/book a call/i)).not.toBeInTheDocument();
  });

  it("renders correctly with full props including demoLink", () => {
    const { asFragment } = render(<PricingCards {...mockPricing[0]} />);
    expect(asFragment()).toMatchSnapshot();
  });

  it("renders correctly without demoLink (Book a call hidden)", () => {
    const { asFragment } = render(
      <PricingCards {...{ ...mockPricing[0], demoLink: null }} />
    );
    expect(asFragment()).toMatchSnapshot();
  });

});