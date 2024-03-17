"use client";

import React, { useState } from "react";

import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Link, cn, useDisclosure } from "@nextui-org/react";
import VideoModal from "./VideoModal";
import { usePathname } from "next/navigation";
import { faHeart as faFilledHeart } from "@fortawesome/free-solid-svg-icons";
import { faPlay } from "@fortawesome/free-solid-svg-icons/faPlay";
import { faCircleInfo } from "@fortawesome/free-solid-svg-icons/faCircleInfo";
import useFetchCredits from "@/app/hooks/useFetchCredits";
import MediaInfo from "./MediaInfo";

const PosterContent = ({
  ...props
}: TMovie | TTVShow | TMovieDetailsResponse | TTVShowDetailsResponse) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [isIconClicked, setIsIconClicked] = useState(false);
  const pathname = usePathname();

  const title =
    "original_title" in props ? props?.original_title : props?.original_name;

  const credits = useFetchCredits(props.id);

  const director = credits?.crew?.find((person) => person.job === "Director");
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
          <MediaInfo {...props} />
          <p
            className={cn("max-w-prose mt-10", {
              "line-clamp-3": pathname === "/movie" || pathname === "/tv",
            })}
          >
            {props?.overview}
          </p>
          {pathname === "/movie" || pathname === "/tv" ? (
            <div className="mt-16">
              <Button
                onPress={onOpen}
                endContent={<FontAwesomeIcon icon={faPlay} />}
              >
                Watch Clips
              </Button>
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
                endContent={<FontAwesomeIcon icon={faCircleInfo} />}
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
                {director?.name || "-"}
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
                {("budget" in props && props.budget) || "-"}
              </p>
              <p>
                <span className="text-[#cecece] text-sm mr-3">Revenue:</span>
                {("revenue" in props && props.revenue) || "-"}
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
