import React from 'react'
import Slider from "react-slick";
import PosterContainer from './PosterContainer';

const BigSlider = ({popularMovies, nav2, sliderRef1}: {popularMovies: TPopularMovie[], nav2: any, sliderRef1: any}) => {
  return (
    <Slider
      className="h-[75vh]"
      lazyLoad="progressive"
      arrows={false}
      asNavFor={nav2}
      ref={(slider) => (sliderRef1.current = slider)}
    >
      {popularMovies?.map((popularMovie: any) => (
        <PosterContainer
          key={popularMovie?.id}
          rating={popularMovie?.vote_average?.toFixed(1)}
          genres={popularMovie?.genre_ids}
          title={popularMovie?.original_title}
          year={popularMovie?.release_date.substring(0, 4)}
          description={popularMovie?.overview}
          posterPath={popularMovie?.poster_path}
          movieId={popularMovie?.id}
          backdropPath={popularMovie?.backdrop_path}
        />
      ))}
    </Slider>
  );
}

export default BigSlider