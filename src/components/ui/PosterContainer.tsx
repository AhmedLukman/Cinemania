import { dataUrl } from "@/lib/utils";
import { PlaceholderValue } from "next/dist/shared/lib/get-img-props";
import Image from "next/image";
import React from "react";
import PosterSideImage from "./PosterSideImage";
import PosterContent from "./PosterContent";
import Backdrop from "./Backdrop";
import { BASE_URL } from "@/lib/constants";

const PosterContainer = ({
  ...props
}: TMovie | TTVShow | TMovieDetailsResponse | TTVShowDetailsResponse) => {
  return (
    <div className={`h-screen rounded-md relative`}>
      {/* Main Image */}
      <Image
        placeholder={dataUrl as PlaceholderValue}
        className="  object-cover object-center"
        src={`${BASE_URL}original${props.backdrop_path}`}
        alt={
          "original_title" in props ? props.original_title : props.original_name
        }
        fill
      />
      <Backdrop />
      <div className="h-full z-50 md:gap-5 md:flex px-5 md:px-20  text-white">
        <PosterContent {...props} />
        <PosterSideImage
          posterPath={props.poster_path}
          title={
            "original_title" in props
              ? props.original_title
              : props.original_name
          }
        />
      </div>
    </div>
  );
};

export default PosterContainer;
