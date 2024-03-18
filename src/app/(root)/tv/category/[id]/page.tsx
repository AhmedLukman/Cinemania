import AllCategoryMedia from "@/components/ui/AllCategoryMedia";
import MediaCard from "@/components/ui/MediaCard";
import { TVShowsUrl } from "@/lib/constants";
import { fetchMovies } from "@/lib/utils";
import { notFound } from "next/navigation";
import React from "react";

const TVCategoryPage = async ({
  params: { id },
}: {
  params: { id: string };
}) => {
  const url =
    id === "trending"
      ? TVShowsUrl.Trending + "/week"
      : id === "upcoming"
      ? TVShowsUrl.Upcoming
      : id === "top-rated"
      ? TVShowsUrl.TopRated
      : null;

  if (!url) notFound();

  let allTVShows: TTVShow[] = [];

  for (let page = 1; page <= 3; page++) {
    const moviesResponse = (await fetchMovies(
      `${url}?language=en-US&page=${page}`
    )) as TMediaResponse<TTVShow>;

    allTVShows = [...allTVShows, ...moviesResponse.results];
  }

  return <AllCategoryMedia heading="TV Show" id={id} media={allTVShows} />;
};

export default TVCategoryPage;
