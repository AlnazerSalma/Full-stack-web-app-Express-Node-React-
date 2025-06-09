// useDebouncedValue.js
import { useState, useEffect } from "react";

const useDebouncedValue = (value, delay = 200) => {
    const [debouncedValue, setDebouncedValue] = useState(value);

// Update query as soon as searchInput changes
useEffect(() => {
    // (Debounce) wait 200ms after user stop typing before 
    const handler = setTimeout(() => setDebouncedValue(value), delay);

    return () => clearTimeout(handler);
  }, [value, delay]);

  return debouncedValue;
};

export default useDebouncedValue;
