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
      {credits.cast.length !== 0 && (
        <MovieCategory
          path="/movie"
          heading="Cast"
          movies={credits.cast}
        />
      )}
      {credits.crew.length !== 0 && (
        <MovieCategory
          path="/movie"
          heading="Crew"
          movies={credits.crew}
        />
      )}
    </>
  );
};

export default SingleMoviePage;
