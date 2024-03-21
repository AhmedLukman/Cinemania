'use client'

import React from "react";
import MovieCategorySlider from "./MovieCategorySlider";
import ViewMoreBtn from "./ViewMoreBtn";

const MovieCategory = ({
  movies,
  heading,
  path,
}: {
  movies: TMovie[] | TTVShow[] | TCrew[] | TCast[];
  heading: string;
  path: string;
}) => {
  // const link =
  //   heading === "Trending"
  //     ? "trending"
  //     : heading === "Top Rated"
  //     ? "top-rated"
  //     : heading === "Upcoming"
  //     ? "upcoming"
  //     : "";
  return (
    <section>
      <div className="flex p-5 md:py-10 md:px-20 justify-between">
        <h3 className="text-white text-2xl md:text-3xl font-serif font-bold">
          {heading}
        </h3>
        <ViewMoreBtn path={path} />
      </div>
      <MovieCategorySlider movies={movies} />
    </section>
  );
};

export default MovieCategory;
