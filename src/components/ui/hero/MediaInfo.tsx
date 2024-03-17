import { getGenreNameById } from "@/lib/utils";
import { usePathname } from "next/navigation";
import React from "react";

const MediaInfo = (
  props: TMovie | TTVShow | TMovieDetailsResponse | TTVShowDetailsResponse
) => {
  const pathname = usePathname();
  const releaseDate =
    "release_date" in props
      ? props.release_date?.toString()
      : props.first_air_date?.toString();

  return (
    <div className="flex justify-between items-center gap-5 md:gap-0 flex-wrap md:max-w-xl">
      <div className="space-x-5 text-sm mt-4">
        <time
          dateTime={
            pathname === "/movie" || pathname === "/tv"
              ? releaseDate.substring(0, 4)
              : releaseDate
          }
        >
          {pathname === "/movie" || pathname === "/tv"
            ? releaseDate.substring(0, 4)
            : releaseDate}
        </time>
        <span className="border rounded-md p-1">
          {props.vote_average?.toFixed(1)}
        </span>
        {"runtime" in props && props.runtime && (
          <span>{props.runtime} min</span>
        )}
      </div>
      <div className=" gap-3 md:gap-5 flex flex-wrap text-sm mt-2 md:mt-6">
        {"genres" in props
          ? props.genres?.map((genre) => (
              <span
                className="border rounded-md p-2 bg-black/40"
                key={genre.id}
              >
                {genre.name}
              </span>
            ))
          : props.genre_ids?.map((genre) => (
              <span
                key={genre.toString()}
                className="border rounded-md p-2 bg-black/40"
              >
                {getGenreNameById(genre)}
              </span>
            ))}
      </div>
    </div>
  );
};

export default MediaInfo;
