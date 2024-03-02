import DoubleSlider from "@/components/ui/DoubleSlider";
import MovieCategory from "@/components/ui/MovieCategory";
import {
  MOVIES_OPTIONS,
  POPULAR_MOVIES_URL,
  TOP_RATED_MOVIES_URL,
  TRENDING_MOVIES_URL,
  UPCOMING_MOVIES_URL,
} from "@/lib/constants";
import { notFound } from "next/navigation";
import React from "react";

const MoviesPage = async () => {
  const popularMoviesRes = await fetch(
    `${POPULAR_MOVIES_URL}?page=1`,
    MOVIES_OPTIONS
  );
  const { results: popularMovies }: TMovieResponse =
    await popularMoviesRes.json();

  // Return a text instead
  if (!popularMovies) notFound();

  const trendingMoviesRes = await fetch(TRENDING_MOVIES_URL, MOVIES_OPTIONS);

  const { results: trendingMovies } =
    (await trendingMoviesRes.json()) as TMovieResponse;

  // Return a text instead
  if (!trendingMovies) notFound();
 
  const topRatedMoviesRes = await fetch(TOP_RATED_MOVIES_URL, MOVIES_OPTIONS);

  const { results: topRatedMovies } =
    (await topRatedMoviesRes.json()) as TMovieResponse;

  // Return a text instead
  if (!topRatedMovies) notFound();

  const upcomingMoviesRes = await fetch(UPCOMING_MOVIES_URL, MOVIES_OPTIONS);

  const { results: upcomingMovies } =
    (await upcomingMoviesRes.json()) as TMovieResponse;

  // Return a text instead
  if (!upcomingMovies) notFound();

  return (
    <>
      <DoubleSlider popularMovies={popularMovies} />
      <MovieCategory heading="Trending" movies={trendingMovies} />
      <MovieCategory heading="Top Rated" movies={topRatedMovies} />
      <MovieCategory heading="Upcoming" movies={upcomingMovies} />
    </>
  );
};

export default MoviesPage;
