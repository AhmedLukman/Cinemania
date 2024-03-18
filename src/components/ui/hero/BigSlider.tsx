import React from "react";
import Slider from "react-slick";
import PosterContainer from "./PosterContainer";

const BigSlider = ({
  media,
  nav2,
  sliderRef1,
}: {
  media: TMovie[] | TTVShow[];
  nav2: any;
  sliderRef1: any;
}) => {
  return (
    <Slider
      className="h-[85svh] md:h-[75svh]"
      lazyLoad="progressive"
      arrows={false}
      asNavFor={nav2}
      ref={(slider) => (sliderRef1.current = slider)}
    >
      {media?.map((media) => (
        <PosterContainer
          key={media?.id}
          {...media}
        />
      ))}
    </Slider>
  );
};

export default BigSlider;
