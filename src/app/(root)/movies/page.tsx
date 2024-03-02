import DoubleSlider from "@/components/ui/DoubleSlider";
import MovieCategory from "@/components/ui/MovieCategory";
import {
  MOVIES_OPTIONS,
  POPULAR_MOVIES_URL,
  TRENDING_MOVIE_URL,
} from "@/lib/constants";
import { notFound } from "next/navigation";
import React from "react";

const MoviesPage = async () => {
  const popularMoviesRes = await fetch(
    `${POPULAR_MOVIES_URL}?page=1`,
    MOVIES_OPTIONS
  );
  const { results: popularMovies }: TPopularMovieResult =
    await popularMoviesRes.json();

  // Return a text instead
  if (!popularMovies) notFound();

  const trendingMoviesRes = await fetch(
    TRENDING_MOVIE_URL,
    MOVIES_OPTIONS
  );

  const { results: trendingMovies } =
    (await trendingMoviesRes.json()) as TTrendingMovieResponse;

  return (
    <>
      <DoubleSlider popularMovies={popularMovies} />
      <MovieCategory heading="Trending" trendingMovies={trendingMovies} />
      <MovieCategory heading="Top Rated" trendingMovies={trendingMovies} />
      <MovieCategory heading="Upcoming" trendingMovies={trendingMovies} />
    </>
  );
};

export default MoviesPage;
