'use client'

import React from "react";

import { cn } from "@nextui-org/react";
import { usePathname } from "next/navigation";
import MediaInfo from "./MediaInfo";
import MediaActions from "./MediaActions";
import MediaCredits from "./MediaCredits";

const PosterContent = ({
  ...props
}: TMovie | TTVShow | TMovieDetailsResponse | TTVShowDetailsResponse) => {
 
  const pathname = usePathname();

  const title =
    "original_title" in props ? props?.original_title : props?.original_name;

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
           <MediaActions id={props.id} title={title}/>
          ) : (
           <MediaCredits {...props}/>
          )}
        </>
      )}
    </div>
  );
};

export default PosterContent;
