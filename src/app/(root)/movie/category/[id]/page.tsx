import { BASE_URL, MoviesUrl } from "@/lib/constants";
import { dataUrl, fetchMovies } from "@/lib/utils";
import { Card } from "@nextui-org/react";
import { PlaceholderValue } from "next/dist/shared/lib/get-img-props";
import Image from "next/image";
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
      : MoviesUrl.TopRated;

  let allMovies: TMovie[] = [];

  for (let page = 1; page <= 3; page++) {
    const moviesResponse = (await fetchMovies(
      `${url}?language=en-US&page=${page}`
    )) as TMediaResponse<TMovie>;

    allMovies = [...allMovies, ...moviesResponse.results];
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
        Movies
      </h2>
      <div className="grid grid-cols-4 gap-8">
        {allMovies?.map((movie) => (
          <Card
            key={movie.id}
            radius="lg"
            className="border-none cursor-pointer group h-72 md:h-[400px] shadow-sm shadow-gray-500"
          >
            <Image
              placeholder={dataUrl as PlaceholderValue}
              alt={movie.original_title}
              className="object-cover group-hover:scale-110 transition duration-300"
              fill
              src={`${BASE_URL}w500${movie.poster_path}`}
            />

            <div className="w-full h-full bg-black opacity-0 group-hover:opacity-75 transition duration-300 z-20"></div>
            <div className="absolute bottom-2 w-full md:group-hover:bottom-40 z-40 transition-all duration-500 flex items-center justify-center">
              <h4 className="text-center mx-6 rounded-lg md:group-hover:border max-w-sm text-white text-lg bg-black/80 py-2 px-4">
                {movie.original_title}
              </h4>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default MovieCategoryPage;
