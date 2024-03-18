import AllCategoryMedia from "@/components/ui/AllCategoryMedia";
import MediaCard from "@/components/ui/MediaCard";
import { MoviesUrl } from "@/lib/constants";
import { fetchMovies } from "@/lib/utils";
import { notFound } from "next/navigation";
import React from "react";

const MovieCategoryPage = async ({
  params: { id },
}: {
  params: { id: string };
}) => {
  const url =
    id === "trending"
      ? MoviesUrl.Trending + "/week"
      : id === "upcoming"
      ? MoviesUrl.Upcoming
      : id === "top-rated"
      ? MoviesUrl.TopRated
      : null;

  if (!url) notFound();

  let allMovies: TMovie[] = [];

  for (let page = 1; page <= 3; page++) {
    const moviesResponse = (await fetchMovies(
      `${url}?language=en-US&page=${page}`
    )) as TMediaResponse<TMovie>;

    allMovies = [...allMovies, ...moviesResponse.results];
  }

  return <AllCategoryMedia heading="Movie" id={id} media={allMovies} />;
};

export default MovieCategoryPage;
