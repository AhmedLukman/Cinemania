"use client";

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
  return (
    <section>
      <div className="flex p-5 md:py-10 md:px-20 justify-between">
        <h3 className="text-white text-2xl md:text-3xl font-serif font-bold">
          {heading}
        </h3>
        {movies.length !== 0 && <ViewMoreBtn path={path} />}
      </div>
      {movies.length !== 0 && <MovieCategorySlider movies={movies} />}
      {movies.length === 0 && (
        <p className="text-red-500 px-5 md:px-20">No data available</p>
      )}
    </section>
  );
};

export default MovieCategory;
