import MovieCategory from "@/components/ui/MovieCategory";
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

   const credits = (await fetchMedia(
     TVShowsUrl.Origin + id + "/credits?language=en-US"
   )) as TMediaCreditsResponse;

  return (
    <>
      <PosterContainer {...tv} />
      {/* Totally not render movie category components when no credits cast or crew and verify */}
      <MovieCategory path="tv" heading="Cast" movies={credits?.cast || []} />
      <MovieCategory path="tv" heading="Crew" movies={credits?.crew || []} />
    </>
  );
};

export default SingleTVShowPage;
