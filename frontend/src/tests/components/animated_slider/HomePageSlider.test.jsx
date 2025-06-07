import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import HomePageSlider from "../../../components/animated_slider/HomePageSlider";
import mediaRenderer from "../../../utils/mediaRenderer";
import useFetch from "../../../utils/useFetch";
import useRightSlidePanel from "../../../hooks/useRightSlidePanel";

jest.mock("../../../utils/mediaRenderer", () =>
  jest.fn(({ src, type, alt, className }) => (
    <div
      data-testid="media-renderer"
      data-src={src}
      data-type={type}
      data-alt={alt}
      className={className}
    >
      Mocked Media
    </div>
  ))
);

jest.mock("../../../utils/useFetch");
jest.mock("../../../hooks/useRightSlidePanel");
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
  const mockWorks = [
    {
      title: "Work One",
      desc: "Description One",
      media: [{ src: "media1.jpg", type: "image" }],
    },
    {
      name: "Work Two",
      desc: "Description Two",
      media: [{ src: "media2.mp4", type: "video" }],
    },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders loading state and matches snapshot", () => {
    useFetch.mockReturnValue({
      data: [],
      loading: "Loading works...",
      error: null,
    });
    useRightSlidePanel.mockReturnValue({
      isOpen: false,
      selectedItem: null,
      openPanel: jest.fn(),
      closePanel: jest.fn(),
    });

   const { container } = render(<HomePageSlider />);

    expect(screen.getByText("Loading works...")).toBeInTheDocument();

    expect(container).toMatchSnapshot();
  });

  it("renders error message and matches snapshot", () => {
    useFetch.mockReturnValue({
      data: [],
      loading: false,
      error: true,
    });
    useRightSlidePanel.mockReturnValue({
      isOpen: false,
      selectedItem: null,
      openPanel: jest.fn(),
      closePanel: jest.fn(),
    });

      const { container } = render(<HomePageSlider />);

    expect(screen.getByText("Failed to fetch slider data.")).toBeInTheDocument();

    expect(container).toMatchSnapshot();

  });

 it("renders slider items and mediaRenderer called correctly and matches snapshot", () => {
  useFetch.mockReturnValue({
    data: mockWorks,
    loading: false,
    error: null,
  });
  const openPanelMock = jest.fn();
  useRightSlidePanel.mockReturnValue({
    isOpen: false,
    selectedItem: null,
    openPanel: openPanelMock,
    closePanel: jest.fn(),
  });

  const { container } = render(<HomePageSlider />);

  mockWorks.forEach(({ title, name, desc }) => {
    const text = title || name;
    expect(screen.getByText(text)).toBeInTheDocument();
    expect(screen.getByText(desc)).toBeInTheDocument();
  });

  expect(mediaRenderer).toHaveBeenCalledTimes(mockWorks.length);
  mockWorks.forEach((work, index) => {
    expect(mediaRenderer.mock.calls[index][0]).toEqual(
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
    useFetch.mockReturnValue({
      data: mockWorks,
      loading: false,
      error: null,
    });
    const openPanelMock = jest.fn();
    useRightSlidePanel.mockReturnValue({
      isOpen: false,
      selectedItem: null,
      openPanel: openPanelMock,
      closePanel: jest.fn(),
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
  useFetch.mockReturnValue({
    data: mockWorks,
    loading: false,
    error: null,
  });

  useRightSlidePanel.mockReturnValue({
    isOpen: true,
    selectedItem: mockWorks[0],
    openPanel: jest.fn(),
    closePanel: jest.fn(),
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
