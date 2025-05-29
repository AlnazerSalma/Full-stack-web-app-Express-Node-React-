import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import StarterPage from "../pages/StarterPage";
import useFetch from "../utils/useFetch";

// Mock hooks and components
jest.mock("../utils/useFetch");
jest.mock("../components/animated_slider/StarterPageSlider", () => {
  return function DummySlider({ items }) {
    return (
      <div>
        {items.map((item) => (
          <div key={item.id}>{item.title}</div>
        ))}
      </div>
    );
  };
});

describe("StarterPage Component", () => {
  const onStartMock = jest.fn();

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("Data Fetching States", () => {
    it("shows loading message when fetching data", () => {
      useFetch.mockReturnValue({
        data: [],
        loading: "Loading...",
        error: null,
      });

      const { container } = render(<StarterPage onStart={onStartMock} />);
      expect(screen.getByText("Loading...")).toBeInTheDocument();

      // snapshot
      expect(container).toMatchSnapshot();
    });

    it("shows error message when fetch fails", () => {
      useFetch.mockReturnValue({
        data: [],
        loading: null,
        error: "Failed to fetch data. Please try again later.",
      });

      const { container } = render(<StarterPage onStart={onStartMock} />);
      expect(
        screen.getByText("Failed to fetch data. Please try again later.")
      ).toBeInTheDocument();

      // snapshot
      expect(container).toMatchSnapshot();
    });

    it("renders slider with fetched data", () => {
      useFetch.mockReturnValue({
        data: [
          { id: 1, title: "Slide 1" },
          { id: 2, title: "Slide 2" },
        ],
        loading: null,
        error: null,
      });

      const { container } = render(<StarterPage onStart={onStartMock} />);
      expect(screen.getByText("Slide 1")).toBeInTheDocument();
      expect(screen.getByText("Slide 2")).toBeInTheDocument();

      // snapshot
      expect(container).toMatchSnapshot();
    });

    it("renders without crashing when data is empty and no loading or error", () => {
      useFetch.mockReturnValue({
        data: [],
        loading: null,
        error: null,
      });

      const { container } = render(<StarterPage onStart={onStartMock} />);
      expect(container).toBeInTheDocument(); // Nothing crashes or fails
      expect(screen.queryByText("Loading...")).not.toBeInTheDocument();
      expect(
        screen.queryByText("Failed to fetch data. Please try again later.")
      ).not.toBeInTheDocument();

      //snapshot
      expect(container).toMatchSnapshot();
    });
  });

  describe("Button Interactions", () => {
    it('calls onStart when "Haptic." button is clicked', async () => {
      useFetch.mockReturnValue({
        data: [],
        loading: null,
        error: null,
      });

      render(<StarterPage onStart={onStartMock} />);
      const hapticButton = screen.getByText("Haptic.");
      await userEvent.click(hapticButton);
      expect(onStartMock).toHaveBeenCalledTimes(1);
    });
  });
});
