import PosterContainer from "@/components/ui/hero/PosterContainer";
import { MoviesUrl } from "@/lib/constants";
import { fetchMedia } from "@/lib/utils";
import { notFound } from "next/navigation";
import React from "react";

const SingleMoviePage = async ({
  params: { id },
}: {
  params: { id: string };
}) => {

  const movie = (await fetchMedia(
    MoviesUrl.Origin + id.toString() + "?language=en-US"
  )) as TMovieDetailsResponse;

  if(!movie.overview) notFound()

  return <PosterContainer {...movie} />;
};

export default SingleMoviePage;
