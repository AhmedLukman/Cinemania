"use client";

import { useEffect, useState } from "react";
import Slider from "react-slick";

const CategorySlider = ({
  children,
  length,
}: {
  children: React.ReactNode;
  length: number;
}) => {
  const [windowWidth, setWindowWidth] = useState(0);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const getSlides = () => {
    if (windowWidth < 640) return 2;
    if (windowWidth < 900) return 3;
    if (windowWidth < 1500) return 4;
    return 5;
  };

  const numberOfSlides = getSlides();

  return (
    <div className="slider-container">
      <Slider
        className="category-slider"
        infinite={length > numberOfSlides}
        slidesToShow={numberOfSlides}
        slidesToScroll={numberOfSlides}
        dots={true}
        draggable={length > numberOfSlides}
        autoplay={true}
        arrows={false}
        autoplaySpeed={6000}
      >
        {children}
      </Slider>
    </div>
  );
};

export default CategorySlider;
