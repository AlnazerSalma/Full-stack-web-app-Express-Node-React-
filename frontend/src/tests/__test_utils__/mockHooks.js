import * as fetchHook from "../../utils/useFetch";
import * as panelHook from "../../hooks/useRightSlidePanel";

export const mockUseFetch = ({ data = [], loading = false, error = null }) => {
    jest.spyOn(fetchHook, "default").mockReturnValue({ data, loading, error });
};

export const mockUsePanel = ({
    isOpen = false,
    selectedItem = null,
    openPanel = jest.fn(),
    closePanel = jest.fn(),
}) => {
  jest.spyOn(panelHook, "default").mockReturnValue({
    isOpen,
    selectedItem,
    openPanel,
    closePanel,
  });
};