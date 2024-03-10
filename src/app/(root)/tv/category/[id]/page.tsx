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
    <div className="p-14">
      <h2 className="text-3xl font-serif text-white my-10">
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
          <Card
            key={tvShow.id}
            radius="lg"
            className="border-none cursor-pointer group h-72 md:h-[400px] shadow-sm shadow-gray-500"
          >
            <Image
              placeholder={dataUrl as PlaceholderValue}
              alt={tvShow.original_name}
              className="object-cover group-hover:scale-110 transition duration-300"
              fill
              src={`${BASE_URL}w500${tvShow.poster_path}`}
            />

            <div className="w-full h-full bg-black opacity-0 group-hover:opacity-75 transition duration-300 z-20"></div>
            <div className="absolute bottom-2 w-full md:group-hover:bottom-40 z-40 transition-all duration-500 flex items-center justify-center">
              <h4 className="text-center mx-6 rounded-lg md:group-hover:border max-w-sm text-white text-lg bg-black/80 py-2 px-4">
                {tvShow.original_name}
              </h4>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default TVCategoryPage;
