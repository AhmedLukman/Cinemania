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

  const { results: similarTV } = (await fetchMedia(
    TVShowsUrl.Origin + id + "/similar?language=en-US&page=1"
  )) as TMediaResponse<TMovie>;

  const { results: recommendedTV } = (await fetchMedia(
    TVShowsUrl.Origin + id + "/recommendations?language=en-US&page=1"
  )) as TMediaResponse<TMovie>;

  return (
    <>
      <PosterContainer {...tv} />
      {credits.cast.length !== 0 ? (
        <MovieCategory
          path={`/tv/${id}/people/cast`}
          heading="Cast"
          movies={credits.cast}
        />
      ) : (
        <div className="p-5 md:py-10 md:px-20 space-y-5">
          <h3 className="text-white text-2xl md:text-3xl font-serif font-bold">
            Crew
          </h3>
          <p className="text-red-500">No Cast data available</p>
        </div>
      )}
      {credits.crew.length !== 0 ? (
        <MovieCategory
          path={`/tv/${id}/people/crew`}
          heading="Crew"
          movies={credits.crew}
        />
      ) : (
        <div className="p-5 md:py-10 md:px-20 space-y-5">
          <h3 className="text-white text-2xl md:text-3xl font-serif font-bold">
            Crew
          </h3>
          <p className="text-red-500">No Crew data available</p>
        </div>
      )}
      <MovieCategory
        path={`/${id}/recommendations`}
        heading="Recommended"
        movies={recommendedTV}
      />
      <MovieCategory
        path={`/${id}/similar`}
        heading="Similar"
        movies={similarTV}
      />
    </>
  );
};

export default SingleTVShowPage;
