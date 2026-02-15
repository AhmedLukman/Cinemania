import { useEffect, useRef, useState } from "react";
import type Slider from "react-slick";

const useSliderSync = () => {
  const [bigSliderNav, setBigSliderNav] = useState<Slider | undefined>(
    undefined,
  );
  const [smallSliderNav, setSmallSliderNav] = useState<Slider | undefined>(
    undefined,
  );
  const bigSliderRef = useRef<Slider | null>(null);
  const smallSliderRef = useRef<Slider | null>(null);

  useEffect(() => {
    setBigSliderNav(bigSliderRef.current ?? undefined);
    setSmallSliderNav(smallSliderRef.current ?? undefined);
  }, []);

  return {
    bigSliderRef,
    smallSliderRef,
    bigSliderNav,
    smallSliderNav,
  };
};

export default useSliderSync;
