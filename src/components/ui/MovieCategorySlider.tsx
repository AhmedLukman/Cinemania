import React from "react";
import Slider from "react-slick";
import MediaCard from "./MediaCard";

const MovieCategorySlider = ({
  movies,
}: {
  movies: TMovie[] | TTVShow[] | TCrew[] | TCast[];
}) => {
  const length = movies.length
  const settings = {
    infinite: true,
    slidesToShow: 4, // Show 4 slides at a time 
    slidesToScroll: movies.length < 4 ? 1 : 4, 
    draggable: false,
    autoplay: true,
    autoplaySpeed: 5000,
    responsive: [
      {
        breakpoint: 800,
        settings: {
          slidesToShow: 3, // Show 3 slides at a time for smaller screens
          slidesToScroll: movies.length < 3 ? 1 : 3,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 2, // Show 2 slides at a time for even smaller screens
          slidesToScroll: movies.length < 2 ? 1 : 2,
          arrows: false,
        },
      },
    ],
  };

  return (
    <div className="slider-container md:px-10">
      <Slider {...settings}>
        {movies.map((movie) => (
          <MediaCard key={movie.id} {...movie} />
        ))}
      </Slider>
    </div>
  );
};

export default MovieCategorySlider;
