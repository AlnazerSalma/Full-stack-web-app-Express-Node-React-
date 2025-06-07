import React from "react";
import { render, screen } from "@testing-library/react";
import PricePage from "../../pages/PricingPage"; 
import '@testing-library/jest-dom';
import mockPricing from "../__mocks_data__/mockPricing";
import { mockUseFetch } from "../__test_utils__/mockHooks";


describe("PricePage", () => {
  afterEach(() => {
    jest.clearAllMocks(); // Clear mocks after each test to avoid leakage
  });

  it("displays loading state", () => {
    mockUseFetch({
      loading: "Loading...",
    });
    render(<PricePage />);
    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  it("displays error message", () => {
    mockUseFetch({
      error: "Failed to fetch",
    });

    render(<PricePage />);
    expect(screen.getByText("Failed to fetch")).toBeInTheDocument();
  });

  it("displays pricing cards when data is available", () => {
    mockUseFetch({
      data: [mockPricing[0]],
    });

    render(<PricePage />);

    expect(screen.getByText("Pro")).toBeInTheDocument();
    expect(screen.getByText("Pro plan description")).toBeInTheDocument();
    expect(screen.getByText("$19")).toBeInTheDocument();
    expect(screen.getByText("Feature 1")).toBeInTheDocument();
    expect(screen.getByText("Feature 3")).toBeInTheDocument();
  });

  it("matches snapshot with all pricing plans", () => {
    mockUseFetch({
      data: mockPricing, 
    });

    const { asFragment } = render(<PricePage />);
    expect(asFragment()).toMatchSnapshot();
  });
});
