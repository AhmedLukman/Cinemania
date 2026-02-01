"use client";

import Slider from "react-slick";
import { getCategorySliderConfig } from "@/lib/utils";

const MediaCategorySlider = ({
  children,
  length,
}: {
  children: React.ReactNode;
  length: number;
}) => {
  return (
    <div className="slider-container">
      <Slider className="category-slider" {...getCategorySliderConfig(length)}>
        {children}
      </Slider>
    </div>
  );
};

export default MediaCategorySlider;
