import React, { useEffect, useState } from "react";

type size = {
  width: string | number | null,
  height: string | number | null
}

export function useWindowSize (el: React.Component | Window) {
  const [windowSize, setWindowSize] = useState<size>({
    width: null,
    height: null
  });

  useEffect(() => {
    function handleResize() {
      setWindowSize({
          width: window.innerWidth,
          height: window.innerHeight,
      });
  }

  window.addEventListener('resize', handleResize);
  handleResize();
  return () => window.removeEventListener('resize', handleResize);
  }, [el]);

  return windowSize;
} 