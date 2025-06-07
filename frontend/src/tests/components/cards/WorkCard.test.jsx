import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import WorkCard from "../../../components/card/work/WorkCard";
import mediaRenderer from "../../../utils/mediaRenderer";
import { mockUseFetch, mockUsePanel } from "../../__test_utils__/mockHooks";
import mockWork from '../../__mocks_data__/mockWork';
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
  test("renders loading message when loading", () => {
    mockUseFetch({loading: "Loading works..."});
   mockUsePanel({});
    render(<WorkCard />);
    expect(screen.getByText("Loading works...")).toBeInTheDocument();
  });

  test("renders error message when error occurs", () => {
    mockUseFetch({error: "Failed to fetch" });
    mockUsePanel({});
    render(<WorkCard />);
    expect(screen.getByText("Failed to fetch")).toBeInTheDocument();
  });

  test("renders work cards and responds to click", async () => {
    const openPanelMock = jest.fn();
    mockUseFetch({ data: [mockWork]});
    mockUsePanel({
      isOpen: true,
      selectedItem: mockWork,
      openPanel: openPanelMock,
    });

    render(<WorkCard />);
    expect(screen.getByText(mockWork.title)).toBeInTheDocument();

    // Check that mediaRenderer was called (image rendered)
    expect(mediaRenderer).toHaveBeenCalled();

    // eslint-disable-next-line testing-library/no-node-access
    const workCard = screen.getByText(mockWork.title).closest(".workcard-row");
    expect(workCard).toBeInTheDocument();
    await userEvent.click(workCard);
    expect(openPanelMock).toHaveBeenCalledWith(mockWork);
    expect(await screen.findByTestId("works-slider-panel")).toBeInTheDocument();
  });

  test("matches snapshot when works are loaded", () => {
    mockUseFetch({ data: [mockWork] });
    mockUsePanel({});
    const { asFragment } = render(<WorkCard />);
    expect(asFragment()).toMatchSnapshot();
  });
});

