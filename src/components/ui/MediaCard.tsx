"use client";

import React from "react";
import Image from "next/image";
import { Card, cn } from "@nextui-org/react";
import { BASE_URL } from "@/lib/constants";
import { usePathname, useRouter } from "next/navigation";
import { PlaceholderValue } from "next/dist/shared/lib/get-img-props";
import { dataUrl, getPath } from "@/lib/utils";

const MediaCard = (media: TMovie | TTVShow | TCrew | TCast) => {
  const router = useRouter();
  const pathname = usePathname();
  const path =
    ("character" in media && media.character) || ("job" in media && media.job)
      ? "/people/" + media.id
      : getPath(pathname, media.id);

  return (
    <div
      key={media.id}
      className="px-2 md:px-4"
      onClick={() => router.push(path)}
    >
      <Card
        radius="lg"
        className="border-none cursor-pointer group h-72 md:h-[400px] shadow-sm shadow-gray-500"
        // onClick={() => router.push(`${pathname}/${media.id}`)}
      >
        <Image
          placeholder={dataUrl as PlaceholderValue}
          alt={
            "original_name" in media
              ? media.original_name
              : media.original_title
          }
          className="object-cover group-hover:scale-110 transition duration-300"
          fill
          src={
            ("poster_path" in media && media.poster_path) ||
            ("profile_path" in media && media.profile_path)
              ? `${BASE_URL}w500${
                  "poster_path" in media
                    ? media.poster_path
                    : media.profile_path
                }`
              : "/assets/images/avatar.jpeg"
          }
        />
        <div className="w-full h-full bg-black opacity-0 group-hover:opacity-75 transition duration-300 z-20"></div>
        <div
          onClick={() => router.push(`${pathname}/${media.id}`)}
          className={cn(
            "absolute  flex-col bottom-2 w-full md:group-hover:bottom-40 z-30 transition-all duration-500 flex items-center justify-center",
            { "bg-black/80 py-2 px-4": "character" in media || "job" in media }
          )}
        >
          <h4
            className={cn(
              "text-center mx-6 py-2 px-4 bg-black/80  rounded-lg md:group-hover:border max-w-sm text-white text-lg",
              {
                "md:group-hover:border-none !p-0 bg-transparent":
                  "character" in media || "job" in media,
              }
            )}
          >
            {"original_name" in media
              ? media.original_name
              : media.original_title}
          </h4>
          {"character" in media && media.character ? (
            <p className="text-gray-500 text-center text-sm">{media.character}</p>
          ) : "job" in media && media.job ? (
            <p className="text-gray-500 text-center text-sm">{media.job}</p>
          ) : null}
        </div>
      </Card>
    </div>
  );
};

export default MediaCard;
