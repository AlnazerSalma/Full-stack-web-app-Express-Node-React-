import { useEffect } from "react";

function useOnClickOutside(ref, handler, when = true) {
  useEffect(() => {
    if (!when) return;

    const listener = (event) => {
      if (!ref.current || ref.current.contains(event.target)) return;
      handler(event);
    };

    document.addEventListener("mousedown", listener);

    return () => {
      document.removeEventListener("mousedown", listener);
    };
  }, [ref, handler, when]);
}

export default useOnClickOutside;
