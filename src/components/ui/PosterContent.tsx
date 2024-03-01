import React from "react";

import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, cn } from "@nextui-org/react";
import { getGenreNameById } from "@/lib/utls";

const PosterContent = ({
  title,
  year,
  rating,
  genres,
  description,
}: TPosterContent) => {
  return (
    <div className="md:w-2/3 pt-24">
      <h2
        className={cn(" text-3xl md:text-6xl font-bold font-serif max-w-3xl")}
      >
        {title}
      </h2>
      <div className="flex justify-between items-center gap-5 md:gap-0 flex-wrap md:max-w-xl">
        <div className="space-x-5 text-sm mt-4">
          <time dateTime={year.toString()}>{year}</time>
          <span className="border rounded-md p-1">{rating}</span>
        </div>
        <div className=" gap-3 md:gap-5 flex flex-wrap text-sm mt-2 md:mt-6">
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
  );
};

export default PosterContent;
