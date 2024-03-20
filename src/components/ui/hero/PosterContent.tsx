"use client";

import React from "react";

import { Button, cn, useDisclosure } from "@nextui-org/react";
import { usePathname } from "next/navigation";
import MediaInfo from "./MediaInfo";
import MediaActions from "./MediaActions";
import MediaCredits from "./MediaCredits";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay } from "@fortawesome/free-solid-svg-icons/faPlay";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import VideoModal from "./VideoModal";

const PosterContent = ({
  ...props
}: TMovie | TTVShow | TMovieDetailsResponse | TTVShowDetailsResponse) => {
  const pathname = usePathname();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const title =
    "original_title" in props ? props?.original_title : props?.original_name;

  return (
    <div className="md:w-2/3 min-h-[75svh] relative z-10 pt-24">
      {props.overview && (
        <>
          <h2 className="text-3xl md:text-6xl font-bold font-serif max-w-3xl">
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
            <MediaActions id={props.id} title={title} />
          ) : (
            <>
              <div className="flex my-5 items-center gap-4">
                <VideoModal
                  mediaId={props.id}
                  title={title}
                  isOpen={isOpen}
                  onOpenChange={onOpenChange}
                />
                <Button
                  onPress={onOpen}
                  endContent={<FontAwesomeIcon icon={faPlay} />}
                >
                  Watch Clips
                </Button>
                <div className="flex gap-2 items-center md:ml-2">
                  <FontAwesomeIcon
                    onClick={() => {}}
                    icon={faHeart}
                    className="cursor-pointer"
                    size="xl"
                  />
                  <span>168</span>
                </div>
              </div>
              <MediaCredits {...props} />
            </>
          )}
        </>
      )}
    </div>
  );
};

export default PosterContent;
