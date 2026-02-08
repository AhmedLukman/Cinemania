"use client";

import type { PropsWithChildren } from "react";
import Slider from "react-slick";
import { useSliderContext } from "@/context/SliderContext";

const BigSlider = ({ children }: PropsWithChildren) => {
  const { bigSliderRef, miniSliderNav, handleBeforeChange } =
    useSliderContext();

  return (
    <Slider
      arrows={false}
      dots={false}
      ref={bigSliderRef}
      asNavFor={miniSliderNav}
      beforeChange={handleBeforeChange}
    >
      {children}
    </Slider>
  );
};

export default BigSlider;
