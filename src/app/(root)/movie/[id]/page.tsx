import MovieCategory from "@/components/ui/MovieCategory";
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

  if (!movie.overview) notFound();

  const credits = (await fetchMedia(
    MoviesUrl.Origin + id + "/credits?language=en-US"
  )) as TMediaCreditsResponse;

  return (
    <>
      <PosterContainer {...movie} />
      {credits.cast.length !== 0 ? (
        <MovieCategory path="/people" heading="Cast" movies={credits.cast} />
      ) : (
        <div className="p-5 md:py-10 md:px-20 space-y-5">
          <h3 className="text-white text-2xl md:text-3xl font-serif font-bold">
            Crew
          </h3>
          <p className="text-red-500">No Cast data available</p>
        </div>
      )}
      {credits.crew.length !== 0 ? (
        <MovieCategory path="/people" heading="Crew" movies={credits.crew} />
      ) : (
        <div className="p-5 md:py-10 md:px-20 space-y-5">
          <h3 className="text-white text-2xl md:text-3xl font-serif font-bold">
            Crew
          </h3>
          <p className="text-red-500">No Crew data available</p>
        </div>
      )}
    </>
  );
};

export default SingleMoviePage;
