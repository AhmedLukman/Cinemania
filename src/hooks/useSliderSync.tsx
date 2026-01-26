import { useEffect, useRef, useState } from "react";
import type Slider from "react-slick";

const useSliderSync = () => {
  const [bigSliderNav, setBigSliderNav] = useState<Slider | undefined>(
    undefined,
  );
  const [miniSliderNav, setMiniSliderNav] = useState<Slider | undefined>(
    undefined,
  );
  const bigSliderRef = useRef<Slider | null>(null);
  const miniSliderRef = useRef<Slider | null>(null);

  useEffect(() => {
    setBigSliderNav(bigSliderRef.current ?? undefined);
    setMiniSliderNav(miniSliderRef.current ?? undefined);
  }, []);

  return {
    bigSliderRef,
    miniSliderRef,
    bigSliderNav,
    miniSliderNav,
  };
};

export default useSliderSync;
