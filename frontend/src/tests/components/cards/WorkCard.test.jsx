import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import WorkCard from "../../../components/card/work/WorkCard";
import useFetch from "../../../utils/useFetch";
import useRightSlidePanel from "../../../hooks/useRightSlidePanel";
import mediaRenderer from "../../../utils/mediaRenderer";

jest.mock("../../../utils/useFetch");
jest.mock("../../../hooks/useRightSlidePanel");

jest.mock("../../../utils/mediaRenderer", () => ({
  __esModule: true,
  default: jest.fn(({ src, alt, className }) => (
    <img src={src} alt={alt} className={className} />
  )),
}));

jest.mock("../../../components/right_slider_panel/WorksRightSlidePanel", () => (props) => (
  <div data-testid="works-slider-panel">
    WorksSliderPanel is open: {props.isOpen ? "Yes" : "No"}
    <button onClick={props.onClose}>Close</button>
  </div>
));


describe("WorkCard Component", () => {
  const fakeWorks = [
    {
      title: "Work 1",
      media: [{ src: "media1.jpg", type: "image" }],
      image: "fallback1.jpg",
      type: "Type 1",
      year: "2020",
    },
    {
      title: "Work 2",
      media: [],
      image: "fallback2.jpg",
      type: "Type 2",
      year: "2021",
    },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders loading message when loading", () => {
    useFetch.mockReturnValue({ data: null, loading: "Loading works...", error: null });
    useRightSlidePanel.mockReturnValue({
      isOpen: false,
      selectedItem: null,
      openPanel: jest.fn(),
      closePanel: jest.fn(),
    });

    render(<WorkCard />);
    expect(screen.getByText("Loading works...")).toBeInTheDocument();
  });

  test("renders error message when error occurs", () => {
    useFetch.mockReturnValue({ data: null, loading: false, error: "Failed to fetch" });
    useRightSlidePanel.mockReturnValue({
      isOpen: false,
      selectedItem: null,
      openPanel: jest.fn(),
      closePanel: jest.fn(),
    });

    render(<WorkCard />);
    expect(screen.getByText("Failed to fetch")).toBeInTheDocument();
  });

  test("renders work cards and responds to click", async () => {
    const openPanelMock = jest.fn();
    useFetch.mockReturnValue({ data: fakeWorks, loading: false, error: null });
    useRightSlidePanel.mockReturnValue({
      isOpen: true,
      selectedItem: fakeWorks[0],
      openPanel: openPanelMock,
      closePanel: jest.fn(),
    });

    render(<WorkCard />);

    // Check that works are rendered
    expect(screen.getByText("Work 1")).toBeInTheDocument();
    expect(screen.getByText("Work 2")).toBeInTheDocument();

    // Check that mediaRenderer was called (image rendered)
    expect(mediaRenderer).toHaveBeenCalled();

    // eslint-disable-next-line testing-library/no-node-access
    const firstWorkCard = screen.getByText("Work 1").closest(".workcard-row");
    expect(firstWorkCard).toBeInTheDocument();
    await userEvent.click(firstWorkCard);
    expect(openPanelMock).toHaveBeenCalledWith(fakeWorks[0]);
    expect(await screen.findByTestId("works-slider-panel")).toBeInTheDocument();
  });
  test("matches snapshot when works are loaded", () => {
  useFetch.mockReturnValue({ data: fakeWorks, loading: false, error: null });
  useRightSlidePanel.mockReturnValue({
    isOpen: false,
    selectedItem: null,
    openPanel: jest.fn(),
    closePanel: jest.fn(),
  });

  const { asFragment } = render(<WorkCard />);
  expect(asFragment()).toMatchSnapshot();
});

});
