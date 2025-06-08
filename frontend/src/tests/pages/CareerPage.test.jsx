import React, { Suspense } from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import CareerPage from "../../pages/CareerPage";
import mockCareer from "../__mocks_data__/mockCareer";
import { mockUseFetch, mockUsePanel } from "../__test_utils__/mockHooks";

// Mock child components
jest.mock(
  "../../components/right_slider_panel/CareerRightSlidePanel.jsx",
  () => () => <div data-testid="right-slide-panel">Right Slide Panel</div>
);

jest.mock(
  "../../components/career/CareerOpenPosition",
  () =>
    ({ title, onClick }) =>
      (
        <div data-testid="role" onClick={onClick}>
          {title}
        </div>
      )
);

describe("CareerPage", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  it("shows loading state", () => {
    mockUseFetch({ loading: "Loading..." });
    mockUsePanel({});
  });
  it("shows error state", () => {
    mockUseFetch({ error: "Failed to fetch" });
    mockUsePanel({});
  });

  it("renders job roles and opens the right panel when clicked", () => {

   const openPanel = jest.fn();
    mockUseFetch({ data: [mockCareer] });
    mockUsePanel({ openPanel });
    render(<CareerPage />);
    const role = screen.getByTestId("role");
    expect(role).toBeInTheDocument();
    fireEvent.click(role);
    expect(openPanel).toHaveBeenCalledWith(mockCareer);
  });

  it("shows the right panel when a role is selected", async () => {
    mockUseFetch({ data: [mockCareer] });
    mockUsePanel({
      isOpen: true,
      selectedItem: {
        title: mockCareer.title,
        mode: mockCareer.mode,
        location: mockCareer.location,
        type: mockCareer.type,
      },
    });
    render(
      <Suspense fallback={<div>Loading...</div>}>
        <CareerPage />
      </Suspense>
    );
    await waitFor(() => {
      expect(screen.getByTestId("right-slide-panel")).toBeInTheDocument();
    });
  });
  it("matches snapshot when role is selected and panel is open", () => {
    mockUseFetch({ data: [mockCareer] });
    mockUsePanel({
      isOpen: true,
      selectedItem: {
        title: mockCareer.title,
        mode: mockCareer.mode,
        location: mockCareer.location,
        type: mockCareer.type,
      },
    });

    const { asFragment } = render(
      <Suspense fallback={<div>Loading...</div>}>
        <CareerPage />
      </Suspense>
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
