import PosterContainer from "@/components/ui/hero/PosterContainer";
import { MoviesUrl } from "@/lib/constants";
import { fetchMovies } from "@/lib/utils";
import { notFound } from "next/navigation";
import React, { useEffect, useState } from "react";

const SingleMoviePage = async ({
  params: { id },
}: {
  params: { id: string };
}) => {
  const movie = (await fetchMovies(
    MoviesUrl.Origin + id.toString() + "?language=en-US"
  )) as TMovieDetailsResponse;

  if (!movie.overview) return notFound();

  return <PosterContainer {...movie} />;
};

export default SingleMoviePage;
