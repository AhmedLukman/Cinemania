import DoubleSlider from "@/components/ui/DoubleSlider";
import TrendingMovies from "@/components/ui/TrendingMovies";
import {
  POPULAR_MOVIES_OPTIONS,
  POPULAR_MOVIES_URL,
  TRENDING_MOVIE_URL,
} from "@/lib/constants";
import { notFound } from "next/navigation";
import React from "react";

const MoviesPage = async () => {
  const res = await fetch(
    `${POPULAR_MOVIES_URL}?page=1`,
    POPULAR_MOVIES_OPTIONS
  );
  const { results: popularMovies }: TPopularMovieResult = await res.json();

  // Return a text instead
  if (!popularMovies) notFound();

  const res2 = await fetch(TRENDING_MOVIE_URL, POPULAR_MOVIES_OPTIONS);

  const { results: trendingMovies } =
    (await res2.json()) as TTrendingMovieResponse;

  return (
    <>
      <DoubleSlider popularMovies={popularMovies} />
      <TrendingMovies trendingMovies={trendingMovies} />
    </>
  );
};

export default MoviesPage;
