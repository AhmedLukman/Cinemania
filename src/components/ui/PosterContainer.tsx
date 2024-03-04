import { IMAGE_URL } from "@/lib/constants";
import { dataUrl } from "@/lib/utils";
import { PlaceholderValue } from "next/dist/shared/lib/get-img-props";
import Image from "next/image";
import React from "react";
import PosterSideImage from "./PosterSideImage";
import PosterContent from "./PosterContent";
import Backdrop from "./Backdrop";

const PosterContainer = ({
  title,
  description,
  year,
  rating,
  genres,
  mediaId,
  posterPath,
  backdropPath,
}: TPosterContainer) => {
  return (
    <div className={`h-screen rounded-md relative`}>
      {/* Main Image */}
      <Image
        placeholder={dataUrl as PlaceholderValue}
        className=" -z-40 object-cover object-center"
        src={`${IMAGE_URL}${backdropPath}`}
        alt={title}
        fill
      />
      <Backdrop />
      <div className="h-full z-50 md:gap-5 md:flex cursor-grab px-5 md:px-20  text-white">
        <PosterContent
          mediaId={mediaId}
          description={description}
          genres={genres}
          rating={rating}
          title={title}
          year={year}
        />
        <PosterSideImage posterPath={posterPath} title={title} />
      </div>
    </div>
  );
};

export default PosterContainer;
