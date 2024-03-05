"use client";

import React, { useEffect, useState } from "react";

import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Link, cn, useDisclosure } from "@nextui-org/react";
import { fetchMovies, getGenreNameById } from "@/lib/utils";
import VideoModal from "./VideoModal";
import { usePathname } from "next/navigation";
import { faHeart as faFilledHeart } from "@fortawesome/free-solid-svg-icons";
import { MoviesUrl } from "@/lib/constants";

const PosterContent = ({
  ...props
}: TMovie | TTVShow | TMovieDetailsResponse) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [isIconClicked, setIsIconClicked] = useState(false);
  const [data, setData] = useState<TMovieCreditsResponse>();
  const pathname = usePathname();

  const title =
    "original_title" in props ? props?.original_title : props?.original_name;
  const releaseDate =
    "release_date" in props
      ? props.release_date?.toString()
      : props.first_air_date?.toString();

  useEffect(() => {
    const fetchData = async () => {
      if (!props.id) return;
      const popularMovies = (await fetchMovies(
        MoviesUrl.Origin + props.id + "/credits?language=en-US"
      )) as TMovieCreditsResponse;
      setData(popularMovies);
    };

    fetchData();
  }, [props.id]);
  const director = data?.crew?.find((person) => person.job === "Director");
  return (
    <div className="md:w-2/3 z-10 pt-24">
      {props.overview && (
        <>
          <h2
            className={cn(
              " text-3xl md:text-6xl font-bold font-serif max-w-3xl z-50"
            )}
          >
            {title}
          </h2>
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
              <span>{"runtime" in props && props.runtime} min</span>
            </div>
            <div className=" gap-3 z-50 md:gap-5 flex flex-wrap text-sm mt-2 md:mt-6">
              {props.genre_ids?.map((genre) => (
                <span
                  key={genre.toString()}
                  className="border rounded-md p-2 bg-black/40"
                >
                  {getGenreNameById(genre)}
                </span>
              ))}
              {"genres" in props &&
                props.genres?.map((genre) => (
                  <span
                    className="border rounded-md p-2 bg-black/40"
                    key={genre.id}
                  >
                    {genre.name}
                  </span>
                ))}
            </div>
          </div>
          <p className="max-w-prose mt-10 line-clamp-3">{props?.overview}</p>
          {pathname === "/movie" || pathname === "/tv" ? (
            <div className="mt-16">
              <Button onPress={onOpen}>Watch Clips</Button>
              <VideoModal
                mediaId={props.id}
                title={title}
                isOpen={isOpen}
                onOpenChange={onOpenChange}
              />
              <Button
                as={Link}
                href={`${pathname}/${props.id}`}
                variant="bordered"
                className="text-white ml-3"
              >
                More details
              </Button>
              <FontAwesomeIcon
                onClick={() => setIsIconClicked((prevState) => !prevState)}
                icon={isIconClicked ? faFilledHeart : faHeart}
                className="ml-5 cursor-pointer"
                size="xl"
              />
              <span className="ml-2">168</span>
            </div>
          ) : (
            <div className="mt-5 hover:bg-white/10 transition-all duration-300  space-y-2 p-6 rounded-lg bg-gradient-to-b from-white/20 via-white/10 to-white/20">
              <p>
                <span className="text-[#cecece] text-sm mr-3">
                  Directed by:
                </span>
                {director?.name}
              </p>
              <p>
                <span className="text-[#cecece] text-sm mr-3">
                  Production companies:
                </span>
                {"production_companies" in props &&
                  props.production_companies.map(
                    (company) => company.name + ". "
                  )}
              </p>
              <p>
                <span className="text-[#cecece] text-sm mr-3">
                  Production Countries:
                </span>
                {"production_countries" in props &&
                  props.production_countries.map(
                    (country) => country.name + ". "
                  )}
              </p>
              <p>
                <span className="text-[#cecece] text-sm mr-3">Budget:</span>
                {"budget" in props && props.budget}
              </p>
              <p>
                <span className="text-[#cecece] text-sm mr-3">Revenue:</span>
                {"revenue" in props && props.revenue}
              </p>
              <p>
                <span className="text-[#cecece] text-sm mr-3">
                  Spoken languages:
                </span>
                {"spoken_languages" in props &&
                  props.spoken_languages.map((lang) => lang.english_name + '. ')}
              </p>
              <p className="italic text-sm text-[#cecece] pt-5 text-center">
                ~{"tagline" in props && props.tagline}
              </p>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default PosterContent;
