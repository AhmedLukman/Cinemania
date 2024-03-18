import React from "react";
import DoubleSlider from "@/components/ui/hero/DoubleSlider";
import MovieCategory from "@/components/ui/MovieCategory";
import { fetchMedia } from "@/lib/utils";
import { TVShowsUrl } from "@/lib/constants";
export const dynamic = "force-dynamic";
export const revalidate = 0;
const TVShowsPage = async () => {
  const popularTVShows = (await fetchMedia(
    TVShowsUrl.Popular + "?language=en-US&page=1"
  )) as TMediaResponse<TTVShow>;

  const trendingTVShows = (await fetchMedia(
    TVShowsUrl.Trending + "/week?language=en-US"
  )) as TMediaResponse<TTVShow>;

  const upcomingTVShows = (await fetchMedia(
    TVShowsUrl.Upcoming + "?language=en-US&page=1"
  )) as TMediaResponse<TTVShow>;

  const topRatedTVShows = (await fetchMedia(
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
