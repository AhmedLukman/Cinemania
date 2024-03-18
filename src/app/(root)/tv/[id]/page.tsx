import PosterContainer from "@/components/ui/hero/PosterContainer";
import { TVShowsUrl } from "@/lib/constants";
import { fetchMedia } from "@/lib/utils";
import { notFound } from "next/navigation";
import React from "react";

const SingleTVShowPage = async ({
  params: { id },
}: {
  params: { id: string };
}) => {
  const tv = (await fetchMedia(
    TVShowsUrl.Origin + id.toString() + "?language=en-US"
  )) as TTVShowDetailsResponse;

  if (!tv.overview) return notFound();

  return <PosterContainer {...tv} />;
};

export default SingleTVShowPage;
