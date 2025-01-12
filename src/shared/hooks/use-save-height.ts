import { useEffect, useRef } from "react";
import { useHeight } from "@/shared/stores/height-store";

export const useSaveHeight = () => {
  const ref = useRef<HTMLDivElement>(null);
  const setHeight = useHeight((state) => state.setHeight);

  useEffect(() => {
    const updateHeight = () => {
      if (ref.current) {
        const { height } = ref.current.getBoundingClientRect();
        setHeight(height);
      }
    };

    const observer = new ResizeObserver(updateHeight);
    if (ref.current) {
      observer.observe(ref.current);
    }

    // Add window resize listener to handle viewport changes
    window.addEventListener("resize", updateHeight);

    // Initial height calculation
    updateHeight();

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", updateHeight);
    };
  }, [setHeight]);

  return ref;
};
