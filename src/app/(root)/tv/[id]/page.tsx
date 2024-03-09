import PosterContainer from "@/components/ui/PosterContainer";
import { TVShowsUrl } from "@/lib/constants";
import { fetchMovies } from "@/lib/utils";
import React from "react";

const SingleTVShowPage = async ({
  params: { id },
}: {
  params: { id: string };
}) => {
  const tv = (await fetchMovies(
    TVShowsUrl.Origin + id.toString() + "?language=en-US"
  )) as TTVShowDetailsResponse;

  return <PosterContainer {...tv} />;
};

export default SingleTVShowPage;
