import { useEffect, useState } from "react";

export const useDeboucedValue = (value, delay = 300) => {
  const [debouncedValue, setDebouncedSearch] = useState("");

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(value);
    }, delay);

    return () => clearTimeout(handler);
  }, [delay, value]);

  return debouncedValue;
};
