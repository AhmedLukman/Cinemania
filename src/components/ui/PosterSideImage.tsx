import Image from "next/image";
import React from "react";
import { BASE_URL } from "@/lib/constants";
import { dataUrl } from "@/lib/utils";
import { PlaceholderValue } from "next/dist/shared/lib/get-img-props";

const PosterSideImage = ({ posterPath, title }: TPosterSideImage) => {
  return (
    <aside className="mt-10 hidden md:block w-1/3 h-5/6 z-20 rounded-xl relative">
      <Image
        className=" object-cover"
        placeholder={dataUrl as PlaceholderValue}
        src={`${BASE_URL}w500${posterPath}`}
        alt={title}
        fill
      />
    </aside>
  );
};

export default PosterSideImage;
