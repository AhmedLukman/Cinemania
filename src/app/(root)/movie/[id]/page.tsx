import PosterContainer from "@/components/ui/PosterContainer";
import { MoviesUrl } from "@/lib/constants";
import { fetchMovies } from "@/lib/utils";
import React, { useEffect, useState } from "react";

const SingleMoviePage = async ({
  params: { id },
}: {
  params: { id: string };
}) => {
  const movie = (await fetchMovies(
    MoviesUrl.Origin + id.toString() + "?language=en-US"
  )) as TMovieDetailsResponse;

  return <PosterContainer {...movie} />;
};

export default SingleMoviePage;
