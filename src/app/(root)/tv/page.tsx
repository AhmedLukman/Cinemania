import React from "react";
import DoubleSlider from "@/components/ui/DoubleSlider";
import MovieCategory from "@/components/ui/MovieCategory";
import { fetchMovies } from "@/lib/utils";
import { TVShowsUrl } from "@/lib/constants";
export const dynamic = 'force-dynamic'
export const revalidate = 0
const TVShowsPage = async () => {
  const popularTVShows = (await fetchMovies(
    TVShowsUrl.Popular + "?language=en-US&page=1"
  )) as TMediaResponse<TTVShow>;

  const trendingTVShows = (await fetchMovies(
    TVShowsUrl.Trending + "/week?language=en-US"
  )) as TMediaResponse<TTVShow>;

  const upcomingTVShows = (await fetchMovies(
    TVShowsUrl.Upcoming + "?language=en-US&page=1"
  )) as TMediaResponse<TTVShow>;

  const topRatedTVShows = (await fetchMovies(
    TVShowsUrl.TopRated + "?language=en-US&page=1"
  )) as TMediaResponse<TTVShow>;

  return (
    <>
      <DoubleSlider media={popularTVShows.results} />
      <MovieCategory heading="Trending" movies={trendingTVShows.results} />
      <MovieCategory heading="Top Rated" movies={topRatedTVShows.results} />
      <MovieCategory heading="Upcoming" movies={upcomingTVShows.results} />
    </>
  );
};

export default TVShowsPage;
