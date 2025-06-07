import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import HomePageSlider from "../../../components/animated_slider/HomePageSlider";
import mockMediaRenderer from "../../__test_utils__/mockMediaRenderer";
import { mockUseFetch, mockUsePanel } from "../../__test_utils__/mockHooks";
import mockWork from "../../__mocks_data__/mockWork";

jest.mock("../../../utils/mediaRenderer", () => ({
  __esModule: true,
  default: require("../../__test_utils__/mockMediaRenderer").default,
}));

jest.mock("../../../hooks/useSliderAnimation");

jest.mock(
  "../../../components/right_slider_panel/WorksRightSlidePanel",
  () => ({ isOpen, selectedItem, openPanel, closePanel, ...rest }) => (
    <div data-testid="works-slider-panel" {...rest}>
      Mocked WorksSliderPanel
    </div>
  )
);

describe("HomePageSlider", () => {
  const mockWorks = [mockWork];
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders loading state and matches snapshot", () => {
    mockUseFetch({
      loading: "Loading works...",
    });
    mockUsePanel({});

   const { container } = render(<HomePageSlider />);

    expect(screen.getByText("Loading works...")).toBeInTheDocument();

    expect(container).toMatchSnapshot();
  });

  it("renders error message and matches snapshot", () => {
   mockUseFetch({
      error: true,
    });
    mockUsePanel({});

      const { container } = render(<HomePageSlider />);

    expect(screen.getByText("Failed to fetch slider data.")).toBeInTheDocument();

    expect(container).toMatchSnapshot();

  });

  it("renders slider items and mediaRenderer called correctly and matches snapshot", () => {
    mockUseFetch({
      data: mockWorks,
    });

    const openPanelMock = jest.fn();
    mockUsePanel({ openPanel: openPanelMock });

    const { container } = render(<HomePageSlider />);

    mockWorks.forEach(({ title, name, desc }) => {
      const text = title || name;
      expect(screen.getByText(text)).toBeInTheDocument();
      expect(screen.getByText(desc)).toBeInTheDocument();
    });

    expect(mockMediaRenderer).toHaveBeenCalledTimes(mockWorks.length);
    mockWorks.forEach((work, index) => {
      expect(mockMediaRenderer.mock.calls[index][0]).toEqual(
        expect.objectContaining({
          src: work.media?.[0]?.src,
          type: work.media?.[0]?.type,
          alt: work.title || work.name,
          className: "media-class-name",
        })
      );
    });

    expect(container).toMatchSnapshot();
  });


  it("calls openPanel when slider item clicked", () => {
    mockUseFetch({
      data: mockWorks,
    });
    const openPanelMock = jest.fn();
    mockUsePanel({
      openPanel: openPanelMock,
    });

    render(<HomePageSlider />);

    const firstSliderItem = screen
      .getByText(mockWorks[0].title || mockWorks[0].name)
      // eslint-disable-next-line testing-library/no-node-access
      .closest(".slider-item");
    expect(firstSliderItem).toBeInTheDocument();

    fireEvent.click(firstSliderItem);
    expect(openPanelMock).toHaveBeenCalledWith(mockWorks[0]);
  });

 it("renders WorksSliderPanel when selectedItem exists", async () => {
  mockUseFetch({
    data: mockWorks,
  });

  mockUsePanel({
    isOpen: true,
    selectedItem: mockWorks[0],
  });

  const { container } = render(<HomePageSlider />);

  // eslint-disable-next-line testing-library/prefer-presence-queries
  expect(screen.queryByText("Loading details...")).toBeInTheDocument();
  await waitFor(() => {
    expect(screen.getByTestId("works-slider-panel")).toBeInTheDocument();
    // eslint-disable-next-line testing-library/no-wait-for-multiple-assertions
    expect(screen.getByTestId("works-slider-panel")).toHaveAttribute(
      "role",
      "[object Object]"
    );
  });
  expect(container).toMatchSnapshot();
});

});
