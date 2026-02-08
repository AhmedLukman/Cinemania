"use client";

import Slider from "react-slick";

const CategorySlider = ({
  children,
  length,
}: {
  children: React.ReactNode;
  length: number;
}) => {
  return (
    <div className="slider-container">
      <Slider
        className="category-slider"
        infinite={length > 5}
        slidesToShow={5}
        slidesToScroll={5}
        dots={true}
        draggable={length > 5}
        autoplay={true}
        arrows={false}
        autoplaySpeed={6000}
        responsive={[
          {
            breakpoint: 1500,
            settings: {
              slidesToShow: 4,
              slidesToScroll: 4,
              infinite: length > 4,
              draggable: length > 4,
            },
          },
          {
            breakpoint: 900,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 3,
              infinite: length > 3,
              draggable: length > 3,
            },
          },
          {
            breakpoint: 640,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 2,
              infinite: length > 2,
              draggable: length > 2,
              arrows: false,
            },
          },
        ]}
      >
        {children}
      </Slider>
    </div>
  );
};

export default CategorySlider;
