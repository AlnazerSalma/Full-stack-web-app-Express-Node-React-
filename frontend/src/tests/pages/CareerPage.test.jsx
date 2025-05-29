import React, { Suspense } from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import CareerPage from "../../pages/CareerPage"; // Adjust path if needed
import * as fetchHook from "../../utils/useFetch";
import * as panelHook from "../../hooks/useRightSlidePanel";

jest.mock("../../components/right_slider_panel/CareerRightSlidePanel.jsx", () => () => (
  <div data-testid="right-slide-panel">Right Slide Panel</div>
));

jest.mock("../../components/career/Roles", () => ({ title, onClick }) => (
  <div data-testid="role" onClick={onClick}>
    {title}
  </div>
));


describe("CareerPage", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("shows loading state", () => {
    jest.spyOn(fetchHook, "default").mockReturnValue({
      data: [],
      loading: "Loading...",
      error: null,
    });

    jest.spyOn(panelHook, "default").mockReturnValue({
      isOpen: false,
      selectedItem: null,
      openPanel: jest.fn(),
      closePanel: jest.fn(),
    });

    render(<CareerPage />);
    expect(screen.getByText(/Loading.../i)).toBeInTheDocument();
  });

  it("shows error state", () => {
    jest.spyOn(fetchHook, "default").mockReturnValue({
      data: [],
      loading: false,
      error: "Failed to fetch",
    });

    jest.spyOn(panelHook, "default").mockReturnValue({
      isOpen: false,
      selectedItem: null,
      openPanel: jest.fn(),
      closePanel: jest.fn(),
    });

    render(<CareerPage />);
    expect(screen.getByText(/Failed to fetch/i)).toBeInTheDocument();
  });

  it("renders job roles and opens the right panel when clicked", async () => {
    const mockData = [
      { title: "Software Engineer", location: "Remote", type: "Full-time" },
    ];

    const openPanel = jest.fn();

    jest.spyOn(fetchHook, "default").mockReturnValue({
      data: mockData,
      loading: false,
      error: null,
    });

    jest.spyOn(panelHook, "default").mockReturnValue({
      isOpen: false,
      selectedItem: null,
      openPanel,
      closePanel: jest.fn(),
    });

    render(<CareerPage />);

    const role = screen.getByTestId("role");
    expect(role).toBeInTheDocument();

    fireEvent.click(role);
    expect(openPanel).toHaveBeenCalledWith(mockData[0]);
  });

it("shows the right panel when a role is selected", async () => { 
  const role = { title: "Software Engineer", location: "Remote", type: "Full-time" };

  jest.spyOn(fetchHook, "default").mockReturnValue({
    data: [role],
    loading: false,
    error: null,
  });

  jest.spyOn(panelHook, "default").mockReturnValue({
    isOpen: true,
    selectedItem: role,
    openPanel: jest.fn(),
    closePanel: jest.fn(),
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
it("renders correctly and shows the right panel when a role is selected (snapshot test)", () => {
  const role = { title: "Software Engineer", location: "Remote", type: "Full-time" };

  jest.spyOn(fetchHook, "default").mockReturnValue({
    data: [role],
    loading: false,
    error: null,
  });

  jest.spyOn(panelHook, "default").mockReturnValue({
    isOpen: true,
    selectedItem: role,
    openPanel: jest.fn(),
    closePanel: jest.fn(),
  });

  const { asFragment } = render(
    <Suspense fallback={<div>Loading...</div>}>
      <CareerPage />
    </Suspense>
  );

  expect(asFragment()).toMatchSnapshot();
});

});
