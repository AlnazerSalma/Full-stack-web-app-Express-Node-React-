import { useState, useCallback } from "react";
function useRightSlidePanel() {
  const [selectedItem, setSelectedItem] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  const openPanel = useCallback((item) => {
    setSelectedItem(item);
    setIsOpen(true);
  }, []);

  const closePanel = useCallback(() => {
    setIsOpen(false);
    setSelectedItem(null);
  }, []);

  return {
    isOpen,
    selectedItem,
    openPanel,
    closePanel,
  };
}

export default useRightSlidePanel;
