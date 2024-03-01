
import { BASE_URL, IMAGE_SIZE, getGenreNameById } from "@/lib/constants";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, cn } from "@nextui-org/react";
import React, { useEffect, useState } from "react";

const PosterContainer = ({
  title,
  description,
  year,
  rating,
  genres,
  movieId,
  posterPath,
  backdropPath,
}: {
  title: string;
  description: string;
  year: string;
  rating: string;
  genres: number[];
  movieId: number;
  posterPath: string;
  backdropPath: string;
}) => {
  const completeBackdropImageUrl = `${BASE_URL}${IMAGE_SIZE}${backdropPath}`;
  const completePosterPathImageUrl = `${BASE_URL}${IMAGE_SIZE}${posterPath}`;

  const backgroundStyle = {
    backgroundImage: `url(${completeBackdropImageUrl})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    // Add other background properties as needed
  };
  const posterStyle = {
    backgroundImage: `url(${completePosterPathImageUrl})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    // Add other background properties as needed
  };
  return (
    <div
      style={backgroundStyle}
      className={`h-screen rounded-md bg-center bg-cover`}
    >
      <div className="h-full md:flex cursor-grab bg-gradient-to-b from-black/40 to-black  px-20  text-white">
        <div className="md:w-2/3 pt-24">
          <p
            className={cn(
              " text-3xl md:text-6xl font-bold font-serif max-w-3xl"
            )}
          >
            {title}
          </p>
          <div className="flex justify-between items-center max-w-xl">
            <div className="space-x-5 text-sm mt-4">
              <span>{year}</span>
              <span className="border rounded-md p-1">{rating}</span>
            </div>
            <div className="space-x-5 text-sm mt-6">
              {genres?.map((genre) => (
                <span key={genre} className="border rounded-md p-2 bg-black/40">
                  {getGenreNameById(genre)}
                </span>
              ))}
            </div>
          </div>
          <p className="max-w-prose mt-10">{description}</p>
          <div className="mt-16">
            <Button>Watch trailer</Button>
            <Button variant="bordered" className="text-white ml-3">
              More details
            </Button>
            <FontAwesomeIcon
              icon={faHeart}
              className="ml-5 cursor-pointer"
              size="xl"
            />
            <span className="ml-2">168</span>
          </div>
        </div>
        <div
          style={posterStyle}
          className="mt-10 hidden md:block w-1/3 h-5/6 rounded-xl bg-center bg-cover"
        />
      </div>
    </div>
  );
};

export default PosterContainer;
