import React from "react";
import Slider from "react-slick";
import MediaCard from "./MediaCard";

const settings = {
  infinite: true,
  slidesToShow: 4,
  slidesToScroll: 4,
  draggable: false,
  autoplay: true,
  autoplaySpeed: 5000,
};

const MovieCategorySlider = ({ movies }: { movies: TMovie[] | TTVShow[] }) => {

  return (
    <div className="slider-container md:px-10">
      <Slider
        lazyLoad="progressive"
        responsive={[
          {
            breakpoint: 800, // This means at less than 640px screen width
            settings: {
              slidesToShow: 3, // Show only 2 slides
              slidesToScroll: 3,
            },
          },
          {
            breakpoint: 640, // This means at less than 640px screen width
            settings: {
              slidesToShow: 2, // Show only 2 slides
              slidesToScroll: 2,
              arrows: false,
            },
          },
        ]}
        {...settings}
      >
        {movies.map((movie) => (
            <MediaCard key={movie.id} {...movie} />
        ))}
      </Slider>
    </div>
  );
};

export default MovieCategorySlider;
