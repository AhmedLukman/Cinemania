import DoubleSlider from "@/components/ui/hero/DoubleSlider";
import MovieCategory from "@/components/ui/MovieCategory";
import { MoviesUrl } from "@/lib/constants";
import { fetchMovies } from "@/lib/utils";
import React from "react";

const MoviesPage = async () => {
  const popularMovies = (await fetchMovies(
    MoviesUrl.Popular + "?language=en-US&page=1"
  )) as TMediaResponse<TMovie>;
  const trendingMovies = (await fetchMovies(
    MoviesUrl.Trending + "/week?language=en-US"
  )) as TMediaResponse<TMovie>;
  const upcomingMovies = (await fetchMovies(
    MoviesUrl.Upcoming + "?language=en-US&page=1"
  )) as TMediaResponse<TMovie>;
  const topRatedMovies = (await fetchMovies(
    MoviesUrl.TopRated + "?language=en-US&page=1"
  )) as TMediaResponse<TMovie>;

  return (
    <>
      <DoubleSlider media={popularMovies.results} />
      <MovieCategory heading="Trending" movies={trendingMovies.results} />
      <MovieCategory heading="Top Rated" movies={topRatedMovies.results} />
      <MovieCategory heading="Upcoming" movies={upcomingMovies.results} />
    </>
  );
};

export default MoviesPage;
