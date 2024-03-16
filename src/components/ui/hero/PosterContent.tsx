"use client";

import React, { useEffect, useState } from "react";

import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Link, cn, useDisclosure } from "@nextui-org/react";
import { fetchMovies, getGenreNameById } from "@/lib/utils";
import VideoModal from "./VideoModal";
import { usePathname } from "next/navigation";
import { faHeart as faFilledHeart } from "@fortawesome/free-solid-svg-icons";
import { MoviesUrl, TVShowsUrl } from "@/lib/constants";
import { faPlay } from "@fortawesome/free-solid-svg-icons/faPlay";
import { faCircleInfo } from "@fortawesome/free-solid-svg-icons/faCircleInfo";

const PosterContent = ({
  ...props
}: TMovie | TTVShow | TMovieDetailsResponse | TTVShowDetailsResponse) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [isIconClicked, setIsIconClicked] = useState(false);
  const [data, setData] = useState<TMediaCreditsResponse>();
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
      if (pathname === `/movie/${props.id}`) {
        const movies = (await fetchMovies(
          MoviesUrl.Origin + props.id + "/credits?language=en-US"
        )) as TMediaCreditsResponse;
          console.log(movies);

        setData(movies);
      } else if(pathname === `/tv/${props.id}`){
        const tv = (await fetchMovies(
          TVShowsUrl.Origin + props.id + "/credits?language=en-US"
        )) as TMediaCreditsResponse;
        setData(tv);
      }
    };

    fetchData();
  }, [props.id, pathname]);
  const director = data?.crew?.find((person) => person.job === "Director");
  return (
    <div className="md:w-2/3 relative z-10 pt-24">
      {props.overview && (
        <>
          <h2
            className={cn(
              " text-3xl  md:text-6xl font-bold font-serif max-w-3xl"
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
              {"runtime" in props && props.runtime && <span>{props.runtime} min</span>}
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
          <p
            className={cn("max-w-prose mt-10", {
              "line-clamp-3": pathname === "/movie" || pathname === "/tv",
            })}
          >
            {props?.overview}
          </p>
          {pathname === "/movie" || pathname === "/tv" ? (
            <div className="mt-16">
              <Button onPress={onOpen} endContent={<FontAwesomeIcon icon={faPlay} />}>Watch Clips</Button>
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
                endContent = {<FontAwesomeIcon icon={faCircleInfo} />}
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
              {/* Refactor */}
              <p>
                <span className="text-[#cecece] text-sm mr-3">
                  Directed by:
                </span>
                {director?.name || '-'}
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
                {"budget" in props && props.budget || '-'}
              </p>
              <p>
                <span className="text-[#cecece] text-sm mr-3">Revenue:</span>
                {"revenue" in props && props.revenue || '-'}
              </p>
              <p>
                <span className="text-[#cecece] text-sm mr-3">
                  Spoken languages:
                </span>
                {"spoken_languages" in props &&
                  props.spoken_languages.map(
                    (lang) => lang.english_name + ". "
                  )}
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
