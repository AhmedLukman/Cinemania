"use client";

import type { PropsWithChildren } from "react";
import Slider from "react-slick";
import { useSliderContext } from "@/context/SliderContext";
import { getBigSliderConfig } from "@/lib/utils";

const BigSlider = ({ children }: PropsWithChildren) => {
  const { bigSliderRef, miniSliderNav, handleBeforeChange } =
    useSliderContext();
  return (
    <Slider
      {...getBigSliderConfig({
        ref: bigSliderRef,
        asNavFor: miniSliderNav,
        beforeChange: handleBeforeChange,
      })}
    >
      {children}
    </Slider>
  );
};

export default BigSlider;
