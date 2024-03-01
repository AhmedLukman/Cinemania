"use client";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import React, { useState, useEffect, useRef } from "react";
import Slider from "react-slick";

import { HoverCard } from "./HoverCard";
import PosterContainer from "./PosterContainer";
import { BASE_URL, IMAGE_SIZE, POPULAR_MOVIES_OPTIONS } from "@/lib/constants";

function DoubleCarousel() {
  const [nav1, setNav1] = useState<any>(null);
  const [nav2, setNav2] = useState<any>(null);
  let sliderRef1 = useRef<any>(null);
  let sliderRef2 = useRef<any>(null);

  const [trendingMovieData, setTrendingMovieData] = useState<any>([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    setNav1(sliderRef1.current);
    setNav2(sliderRef2.current);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(
        "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1",
        POPULAR_MOVIES_OPTIONS
      );
      if (!res.ok) throw new Error("Response not okay");
      const data = await res.json();
      setTrendingMovieData(data.results);
    };
    fetchData();
  }, []);
  return (
    <div className="slider-container">
      <Slider
        className="h-[75vh]"
        lazyLoad="progressive"
        arrows={false}
        asNavFor={nav2}
        ref={(slider) => (sliderRef1.current = slider)}
      >
        {trendingMovieData?.map((trendingMovie: any) => (
          <PosterContainer
            key={trendingMovie?.id}
            rating={trendingMovie?.vote_average?.toFixed(1)}
            genres={trendingMovie?.genre_ids}
            title={trendingMovie?.original_title}
            year={trendingMovie?.release_date.substring(0,4)}
            description={trendingMovie?.overview}
            posterPath={trendingMovie?.poster_path}
            movieId={trendingMovie?.id}
            backdropPath={trendingMovie?.backdrop_path}
          />
        ))}
      </Slider>
      <Slider
        lazyLoad="progressive"
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
        {trendingMovieData?.map((trendingMovie: any) => {
          const completeImageUrl = `${BASE_URL}${IMAGE_SIZE}${trendingMovie.backdrop_path}`;

          return (
            <div key={trendingMovie.id} className=" h-[25vh] p-2 rounded-md">
              <HoverCard
                className="!h-full !w-full cursor-pointer"
                imageUrl={completeImageUrl}
              >
                <p className="font-bold text-xl max-w-lg">
                  {trendingMovie.original_title}
                </p>
              </HoverCard>
            </div>
          );
        })}
      </Slider>
    </div>
  );
}

export default DoubleCarousel;
