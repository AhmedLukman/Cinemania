import AllCategoryMedia from "@/components/ui/AllCategoryMedia";
import { MoviesUrl } from "@/lib/constants";
import { fetchMedia } from "@/lib/utils";
import { notFound } from "next/navigation";
import React from "react";

const CatchAllPage = async ({ params }: { params: { slug: string } }) => {
  const movieId = params.slug[0];
  const role = params.slug[2];
  const related = params.slug[1];

  const { original_title } = (await fetchMedia(
    MoviesUrl.Origin + movieId.toString() + "?language=en-US"
  )) as TMovieDetailsResponse;

  const heading = role
    ? original_title + " movie " + role
    : "Movies " + related + " to " + original_title;
  let data: any = [];

  if (role === "cast") {
    for (let page = 1; page <= 3; page++) {
      const credits = (await fetchMedia(
        MoviesUrl.Origin + movieId + "/credits?language=en-US"
      )) as TMediaCreditsResponse;

      data = [...data, ...credits.cast];
    }
  } else if (role === "crew") {
    for (let page = 1; page <= 3; page++) {
      const credits = (await fetchMedia(
        MoviesUrl.Origin + movieId + "/credits?language=en-US"
      )) as TMediaCreditsResponse;

      data = [...data, ...credits.crew];
    }
  } else {
    if (related === "similar") {
      for (let page = 1; page <= 3; page++) {
        const { results: similarMovies } = (await fetchMedia(
          MoviesUrl.Origin + movieId + "/similar?language=en-US&page=" + page
        )) as TMediaResponse<TMovie>;

        data = [...data, ...similarMovies];
      }
    } else if (related === "recommendations") {
      for (let page = 1; page <= 3; page++) {
        const { results: recommendedMovies } = (await fetchMedia(
          MoviesUrl.Origin +
            movieId +
            "/recommendations?language=en-US&page=" +
            page
        )) as TMediaResponse<TMovie>;

        data = [...data, ...recommendedMovies];
      }
    } else notFound();
  }

  return <AllCategoryMedia heading={heading} media={data} />;
};

export default CatchAllPage;
