import React from "react";
import { cn } from "@nextui-org/react";
import { TSingleTVSeasonResponse, TMovie, TTVShow } from "@/lib/types";
import { MediaType } from "@/lib/constants";
import MediaInfo from "./MediaInfo";
import { getMediaTitle } from "@/lib/utils";
import MoreDetailsButton from "./MoreDetailsButton";

const PosterContent = ({
  media,
  type,
}:
  | { media: TMovie; type: MediaType.Movie }
  | { media: TTVShow; type: MediaType.TV }
  | {
      media: TSingleTVSeasonResponse & { season: string };
      type: MediaType.Season;
    }) => {
  return (
    <div className="md:w-2/3 min-h-[75svh] relative z-10 pt-24">
      <h2 className="text-3xl md:text-4xl xl:text-5xl font-bold font-serif max-w-3xl">
        {getMediaTitle(media)}
      </h2>
      {type === MediaType.Movie && <MediaInfo media={media} type={type} />}
      {type === MediaType.TV && <MediaInfo media={media} type={type} />}
      {type === MediaType.Season && (
        <div className="flex items-center gap-5">
          <h3 className="my-2 text-2xl font-bold">{media.season}</h3>
          <span className="border rounded-md p-1 text-sm">
            {media.vote_average?.toFixed(1)}
          </span>
          <span className="text-sm">{media.episodes.length} episodes</span>
        </div>
      )}
      <div className="min-h-20">
        <p className="max-w-prose mt-10 line-clamp-3">
          {media.overview || "Overview text unavaible"}
        </p>
      </div>
      <div className="mt-5">
        <MoreDetailsButton id={media.id} />
      </div>
    </div>
  );
};

export default PosterContent;
