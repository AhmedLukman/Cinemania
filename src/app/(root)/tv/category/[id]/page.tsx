import MediaCard from "@/components/ui/MediaCard";
import { BASE_URL, TVShowsUrl } from "@/lib/constants";
import { dataUrl, fetchMovies } from "@/lib/utils";
import { Card } from "@nextui-org/react";
import { PlaceholderValue } from "next/dist/shared/lib/get-img-props";
import Image from "next/image";
import { notFound } from "next/navigation";
import React from "react";

const TVCategoryPage = async ({
  params: { id },
}: {
  params: { id: string };
}) => {
  const url =
    id === "trending"
      ? TVShowsUrl.Trending + "/week"
      : id === "upcoming"
      ? TVShowsUrl.Upcoming
      : id === "top-rated"
      ? TVShowsUrl.TopRated
      : null;

  if (!url) notFound();

  let allTVShows: TTVShow[] = [];

  for (let page = 1; page <= 3; page++) {
    const moviesResponse = (await fetchMovies(
      `${url}?language=en-US&page=${page}`
    )) as TMediaResponse<TTVShow>;

    allTVShows = [...allTVShows, ...moviesResponse.results];
  }

  return (
    <div className="pt-10 md:p-14 ">
      <h2 className="text-2xl md:text-3xl font-serif text-white my-10 mx-2 md:mx-4">
        {id.startsWith("top")
          ? id
              .split("-")
              .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
              .join(" ")
          : id.charAt(0).toUpperCase() + id.slice(1)}{" "}
        TV Shows
      </h2>
      <div className="grid grid-cols-4 gap-8">
        {allTVShows?.map((tvShow) => (
          <MediaCard key={tvShow.id} {...tvShow} />
        ))}
      </div>
    </div>
  );
};

export default TVCategoryPage;
