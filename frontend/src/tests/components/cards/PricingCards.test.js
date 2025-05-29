import React from "react";
import { render, screen } from "@testing-library/react";
import PricingCards from "../../../components/card/pricing/PricingCards"; // Adjust path if needed
import { CgWebsite } from "react-icons/cg"; // For rendering without error
import '@testing-library/jest-dom';

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
  const mockProps = {
    title: "Pro",
    description: "Pro plan description",
    price: "$19",
    billingCycle: "month",
    imgPath: "/img/pro.png",
    demoLink: "https://example.com/demo-pro",
    leftColumnText: ["Priority Support", "Unlimited Projects"],
    rightColumnText: ["Advanced Analytics", "Team Access"],
  };

  it("renders title, description, and price correctly", () => {
    render(<PricingCards {...mockProps} />);
    
    expect(screen.getByText("Pro")).toBeInTheDocument();
    expect(screen.getByText("Pro plan description")).toBeInTheDocument();
    expect(screen.getByText("$19")).toBeInTheDocument();
    expect(screen.getByText("/ month")).toBeInTheDocument();
  });

  it("renders image with correct src and alt", () => {
    render(<PricingCards {...mockProps} />);
    const img = screen.getByAltText("card-img");
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute("src", mockProps.imgPath);
  });

  it("renders 'Book a call' link if demoLink exists", () => {
    render(<PricingCards {...mockProps} />);
    const link = screen.getByText(/book a call/i);
    expect(link).toBeInTheDocument();
    // eslint-disable-next-line testing-library/no-node-access
    expect(link.closest("a")).toHaveAttribute("href", mockProps.demoLink);
  });

  it("renders left and right column feature texts", () => {
    render(<PricingCards {...mockProps} />);
    
    mockProps.leftColumnText.forEach(text =>
      expect(screen.getByText(text)).toBeInTheDocument()
    );

    mockProps.rightColumnText.forEach(text =>
      expect(screen.getByText(text)).toBeInTheDocument()
    );
  });

  it("hides 'Book a call' button when no demoLink is provided", () => {
    const { queryByText } = render(
      <PricingCards {...{ ...mockProps, demoLink: null }} />
    );
    // eslint-disable-next-line testing-library/prefer-screen-queries
    expect(queryByText(/book a call/i)).not.toBeInTheDocument();
  });
  it("renders correctly with full props including demoLink", () => {
  const { asFragment } = render(<PricingCards {...mockProps} />);
  expect(asFragment()).toMatchSnapshot();
});

it("renders correctly without demoLink (Book a call hidden)", () => {
  const { asFragment } = render(
    <PricingCards {...{ ...mockProps, demoLink: null }} />
  );
  expect(asFragment()).toMatchSnapshot();
});

});

