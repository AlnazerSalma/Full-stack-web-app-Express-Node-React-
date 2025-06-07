import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import StarterPage from "../../pages/StarterPage";
import { mockUseFetch } from "../__test_utils__/mockHooks"; 
import mockStartPageSlide from "../__mocks_data__/mockStartPageSlide";

jest.mock("../../components/animated_slider/StarterPageSlider", () => {
  return function DummySlider({ items }) {
    return (
      <div data-testid="mock-slider">
        {items.map(({name, desc }, index) => (
          <div key={index}>
            <h2>{name}</h2>
            <p>{desc}</p>
          </div>
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
      mockUseFetch({
        loading: "Loading...",
      });

      const { container } = render(<StarterPage onStart={onStartMock} />);
      expect(screen.getByText("Loading...")).toBeInTheDocument();

      // snapshot
      expect(container).toMatchSnapshot();
    });

    it("shows error message when fetch fails", () => {
      mockUseFetch({
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
     mockUseFetch({ data: mockStartPageSlide });

      const { container } = render(<StarterPage onStart={onStartMock} />);
      mockStartPageSlide.forEach(({ name, desc }) => {
        expect(screen.getByText(name)).toBeInTheDocument();
        expect(screen.getByText(desc)).toBeInTheDocument();

      });
      expect(screen.getByTestId("mock-slider")).toBeInTheDocument();

      // snapshot
     expect(container).toMatchSnapshot();
    });

    it("renders without crashing when data is empty and no loading or error", () => {
      mockUseFetch({
        data: [],
      });

      const { container } = render(<StarterPage onStart={onStartMock} />);
      expect(container).toBeInTheDocument();
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
      mockUseFetch({
        data: [],
      });

      render(<StarterPage onStart={onStartMock} />);
      const hapticButton = screen.getByText("Haptic.");
      await userEvent.click(hapticButton);
      expect(onStartMock).toHaveBeenCalledTimes(1);
    });
  });
});
