import MediaCard from "@/components/ui/MediaCard";
import { BASE_URL, MoviesUrl } from "@/lib/constants";
import { dataUrl, fetchMovies } from "@/lib/utils";
import { Card } from "@nextui-org/react";
import { PlaceholderValue } from "next/dist/shared/lib/get-img-props";
import Image from "next/image";
import { notFound } from "next/navigation";
import React from "react";

const MovieCategoryPage = async ({
  params: { id },
}: {
  params: { id: string };
}) => {
  const url =
    id === "trending"
      ? MoviesUrl.Trending + "/week"
      : id === "upcoming"
      ? MoviesUrl.Upcoming
      : id === "top-rated"
      ? MoviesUrl.TopRated
      : null;

  if (!url) notFound();

  let allMovies: TMovie[] = [];

  for (let page = 1; page <= 3; page++) {
    const moviesResponse = (await fetchMovies(
      `${url}?language=en-US&page=${page}`
    )) as TMediaResponse<TMovie>;

    allMovies = [...allMovies, ...moviesResponse.results];
  }

  return (
    <div className="md:p-14 pt-10">
      <h2 className="text-3xl font-serif text-white my-10 mx-2 md:mx-4">
        {id.startsWith("top")
          ? id
              .split("-")
              .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
              .join(" ")
          : id.charAt(0).toUpperCase() + id.slice(1)}{" "}
        Movies
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-y-8">
        {allMovies?.map((movie) => (
          <MediaCard key={movie.id} {...movie} />
        ))}
      </div>
    </div>
  );
};

export default MovieCategoryPage;
