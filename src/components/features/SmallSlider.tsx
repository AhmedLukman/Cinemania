"use client";

import { type PropsWithChildren, useEffect, useState } from "react";
import Slider from "react-slick";
import { useSliderContext } from "@/context/SliderContext";

const SmallSlider = ({ children }: PropsWithChildren) => {
  const { smallSliderRef, bigSliderNav } = useSliderContext();
  const [windowWidth, setWindowWidth] = useState(0);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const getSlidesToShow = () => {
    if (windowWidth < 640) return 2;
    if (windowWidth < 900) return 3;
    if (windowWidth < 1500) return 4;
    return 5;
  };

  return (
    <div className="absolute w-full bottom-0 overflow-hidden">
      <Slider
        swipeToSlide={true}
        focusOnSelect={true}
        arrows={false}
        accessibility={false}
        autoplay={true}
        autoplaySpeed={5000}
        slidesToShow={getSlidesToShow()}
        ref={smallSliderRef}
        asNavFor={bigSliderNav}
        className="pt-20 hover:pt-0 translate-y-[60%] hover:translate-y-0 opacity-50 hover:opacity-100 transition-all duration-300 ease-in-out"
      >
        {children}
      </Slider>
    </div>
  );
};

export default SmallSlider;
