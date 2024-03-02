import DoubleSlider from "@/components/ui/DoubleSlider";
import MovieCategory from "@/components/ui/MovieCategory";
import {
  MOVIES_OPTIONS,
  POPULAR_MOVIES_URL,
  TOP_RATED_MOVIES_URL,
  TRENDING_MOVIES_URL,
  UPCOMING_MOVIES_URL,
} from "@/lib/constants";
import { fetchMovies } from "@/lib/utls";
import { notFound } from "next/navigation";
import React from "react";

const MoviesPage = async () => {
  
  const popularMovies = (await fetchMovies(
    POPULAR_MOVIES_URL
  )) as TMovieResponse;
  const trendingMovies = (await fetchMovies(
    TRENDING_MOVIES_URL
  )) as TMovieResponse;
  const upcomingMovies = (await fetchMovies(
    UPCOMING_MOVIES_URL
  )) as TMovieResponse;
  const topRatedMovies = (await fetchMovies(
    TOP_RATED_MOVIES_URL
  )) as TMovieResponse;

  return (
    <>
      <DoubleSlider popularMovies={popularMovies.results} />
      <MovieCategory heading="Trending" movies={trendingMovies.results} />
      <MovieCategory heading="Top Rated" movies={topRatedMovies.results} />
      <MovieCategory heading="Upcoming" movies={upcomingMovies.results} />
    </>
  );
};

export default MoviesPage;
