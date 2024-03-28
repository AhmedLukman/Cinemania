import DoubleSlider from "@/components/ui/hero/DoubleSlider";
import MovieCategory from "@/components/ui/MovieCategory";
import { MoviesUrl } from "@/lib/constants";
import { fetchMedia } from "@/lib/utils";
import React from "react";

const MoviesPage = async () => {
  const popularMovies = (await fetchMedia(
    MoviesUrl.Popular + "?language=en-US&page=1"
  )) as TMediaResponse<TMovie>;
  const trendingDailyMovies = (await fetchMedia(
    MoviesUrl.Trending + "/day?language=en-US"
  )) as TMediaResponse<TMovie>;
  const upcomingMovies = (await fetchMedia(
    MoviesUrl.Upcoming + "?language=en-US&page=1"
  )) as TMediaResponse<TMovie>;
  const nowPlayingMovies = (await fetchMedia(
    MoviesUrl.Playing + "?language=en-US&page=1"
  )) as TMediaResponse<TMovie>;
  const topRatedMovies = (await fetchMedia(
    MoviesUrl.TopRated + "?language=en-US&page=1"
  )) as TMediaResponse<TMovie>;

  return (
    <>
      <DoubleSlider media={popularMovies.results} />
      <MovieCategory movies={nowPlayingMovies.results} path={`/movie/category/now-playing`} heading="Now Playing" />
      <MovieCategory movies={trendingDailyMovies.results} path={`/movie/category/trending`} heading="Trending" />
      <MovieCategory movies={topRatedMovies.results} path={`/movie/category/top-rated`} heading="Top Rated" />
      <MovieCategory movies={upcomingMovies.results} path={`/movie/category/upcoming`} heading="Upcoming" />
    </>
  );
};

export default MoviesPage;
