import React from "react";
import { render, screen } from "@testing-library/react";
import PricePage from "../../pages/PricingPage"; 
import useFetch from "../../utils/useFetch"; 
import '@testing-library/jest-dom';

jest.mock("../../utils/useFetch");


const mockPricingData = [
  {
    title: "Pro",
    description: "Pro plan description",
    price: "$19",
    billingCycle: "month",
    imgPath: "/img/pro.png",
    demoLink: "https://example.com/demo-pro",
    leftColumnText: ["Feature 1", "Feature 2"],
    rightColumnText: ["Feature 3", "Feature 4"],
  },
    {
    title: "Basic",
    description: "Basic plan description",
    price: "$9",
    billingCycle: "month",
    imgPath: "/img/basic.png",
    demoLink: "https://example.com/demo",
    leftColumnText: ["Feature 1", "Feature 2"],
    rightColumnText: ["Feature 3", "Feature 4"],
  },
];

describe("PricePage", () => {
  afterEach(() => {
    jest.clearAllMocks(); // Clear mocks after each test to avoid leakage
  });

  it("displays loading state", () => {
    useFetch.mockReturnValue({
      data: [],
      loading: "Loading...",
      error: null,
    });

    render(<PricePage />);
    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  it("displays error message", () => {
    useFetch.mockReturnValue({
      data: [],
      loading: false,
      error: "Failed to fetch",
    });

    render(<PricePage />);
    expect(screen.getByText("Failed to fetch")).toBeInTheDocument();
  });

  it("displays pricing cards when data is available", () => {
    useFetch.mockReturnValue({
      data: [mockPricingData[0]], // Use only the first plan for this test
      loading: false,
      error: null,
    });

    render(<PricePage />);

    expect(screen.getByText("Pro")).toBeInTheDocument();
    expect(screen.getByText("Pro plan description")).toBeInTheDocument();
    expect(screen.getByText("$19")).toBeInTheDocument();
    expect(screen.getByText("Feature 1")).toBeInTheDocument();
    expect(screen.getByText("Feature 3")).toBeInTheDocument();
  });

  it("renders PricePage with pricing cards correctly and matches snapshot", () => {
    useFetch.mockReturnValue({
      data: mockPricingData, 
      loading: false,
      error: null,
    });

    const { asFragment } = render(<PricePage />);
    expect(asFragment()).toMatchSnapshot();
  });
});
