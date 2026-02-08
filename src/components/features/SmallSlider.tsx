"use client";

import type { PropsWithChildren } from "react";
import Slider from "react-slick";
import { useSliderContext } from "@/context/SliderContext";

const SmallSlider = ({ children }: PropsWithChildren) => {
  const { miniSliderRef, bigSliderNav } = useSliderContext();

  return (
    <div className="absolute w-full bottom-0 overflow-hidden">
      <Slider
        swipeToSlide={true}
        focusOnSelect={true}
        arrows={false}
        accessibility={false}
        autoplay={true}
        autoplaySpeed={5000}
        responsive={[
          {
            breakpoint: 540,
            settings: {
              slidesToShow: 2,
            },
          },
          {
            breakpoint: 800,
            settings: {
              slidesToShow: 3,
            },
          },
        ]}
        slidesToShow={5}
        ref={miniSliderRef}
        asNavFor={bigSliderNav}
        className="pt-20 hover:pt-0 translate-y-[60%] hover:translate-y-0 opacity-50 hover:opacity-100 transition-all duration-300 ease-in-out"
      >
        {children}
      </Slider>
    </div>
  );
};

export default SmallSlider;
