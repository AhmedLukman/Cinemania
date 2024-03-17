"use client";

import React from "react";
import Image from "next/image";
import { Card } from "@nextui-org/react";
import { BASE_URL } from "@/lib/constants";
import { usePathname, useRouter } from "next/navigation";
import { PlaceholderValue } from "next/dist/shared/lib/get-img-props";
import { dataUrl } from "@/lib/utils";

const MediaCard = (media: any) => {
  const router = useRouter();
  const pathname = usePathname();
  const path = pathname.includes('movie') ? `/movie/${media.id}` : `/tv/${media.id}`
  return (
    <div
      key={media.id}
      className="px-2 md:px-4"
      onClick={() => router.push(path)}
    >
      <Card
        radius="lg"
        className="border-none cursor-pointer group h-72 md:h-[400px] shadow-sm shadow-gray-500"
        onClick={() => router.push(`${pathname}/${media.id}`)}
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
          src={`${BASE_URL}w500${media.poster_path}`}
        />

        <div className="w-full h-full bg-black opacity-0 group-hover:opacity-75 transition duration-300 z-20"></div>
        <div
          onClick={() => router.push(`${pathname}/${media.id}`)}
          className="absolute bottom-2 w-full md:group-hover:bottom-40 z-30 transition-all duration-500 flex items-center justify-center"
        >
          <h4 className="text-center mx-6 rounded-lg md:group-hover:border max-w-sm text-white text-lg bg-black/80 py-2 px-4">
            {"original_name" in media
              ? media.original_name
              : media.original_title}
          </h4>
        </div>
      </Card>
    </div>
  );
};

export default MediaCard;
