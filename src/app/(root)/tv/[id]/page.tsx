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
      {credits.cast.length !== 0 ? (
        <MovieCategory
          path="/movie"
          heading="Cast"
          movies={credits.cast}
        />
      ) : (
        <div className="p-5 md:py-10 md:px-20 space-y-5">
          <h3 className="text-white text-2xl md:text-3xl font-serif font-bold">
            Crew
          </h3>
          <p className="text-red-500">No Cast Data available</p>
        </div>
      )}
      {credits.crew.length !== 0 ? (
        <MovieCategory
          path="/movie"
          heading="Crew"
          movies={credits.crew}
        />
      ) : (
        <div className="p-5 md:py-10 md:px-20 space-y-5">
          <h3 className="text-white text-2xl md:text-3xl font-serif font-bold">
            Crew
          </h3>
          <p className="text-red-500">No Crew Data available</p>
        </div>
      )}
    </>
  );
};

export default SingleTVShowPage;
