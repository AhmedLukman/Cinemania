import React from 'react'
import { HoverCard } from "./HoverCard";
import { BASE_URL, IMAGE_SIZE } from "@/lib/constants";
import Slider from 'react-slick';

const MiniSlider = ({nav1, sliderRef2, popularMovies}: {nav1: any, sliderRef2: any, popularMovies: TPopularMovie[]}) => {
  return (
    <Slider
      asNavFor={nav1}
      autoplay
      autoplaySpeed={6000}
      className="h-[25vh] cursor-grab"
      arrows={false}
      responsive={[
        {
          breakpoint: 640, // This means at less than 640px screen width
          settings: {
            slidesToShow: 2, // Show only 2 slides
          },
        },
      ]}
      ref={(slider) => (sliderRef2.current = slider)}
      slidesToShow={5}
      swipeToSlide={true}
      focusOnSelect={true}
    >
      {popularMovies?.map((popularMovie: any) => {
        const completeImageUrl = `${BASE_URL}${IMAGE_SIZE}${popularMovie.backdrop_path}`;

        return (
          <div key={popularMovie.id} className=" h-[25vh] p-2 rounded-md">
            <HoverCard
              className="!h-full !w-full cursor-pointer"
              imageUrl={completeImageUrl}
            >
              <p className="font-bold text-xl max-w-lg">
                {popularMovie.original_title}
              </p>
            </HoverCard>
          </div>
        );
      })}
    </Slider>
  );
}

export default MiniSlider