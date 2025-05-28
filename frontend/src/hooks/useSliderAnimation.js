import { useEffect } from "react";

const useSliderAnimation = (ref, items, duration = 40) => {
  useEffect(() => {
    if (items && ref.current) {
      ref.current.style.animation = `${duration}s linear infinite slideAnimation`;
    }
  }, [items, ref, duration]);
};

export default useSliderAnimation;
