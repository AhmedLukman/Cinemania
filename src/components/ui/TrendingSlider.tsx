"use client";

import React from "react";
import Slider from "react-slick";
import Image from "next/image";
import { Card, CardFooter } from "@nextui-org/react";
import { IMAGE_URL } from "@/lib/constants";
import { useRouter } from "next/navigation";

const settings = {
  infinite: true,
  slidesToShow: 4,
  slidesToScroll: 4,
  draggable: false,
  autoplay: true,
  autoplaySpeed: 5000,
};

const TrendingSlider = ({
  trendingMovies,
}: {
  trendingMovies: TTrendingMovie[];
}) => {
  const router = useRouter();
  return (
    <div className="slider-container px-10">
      <Slider
        responsive={[
          {
            breakpoint: 800, // This means at less than 640px screen width
            settings: {
              slidesToShow: 3, // Show only 2 slides
            },
          },
          {
            breakpoint: 640, // This means at less than 640px screen width
            settings: {
              slidesToShow: 2, // Show only 2 slides
            },
          },
        ]}
        {...settings}
      >
        {trendingMovies.map((trendingMovie) => (
          <div
            className="px-2 md:px-4"
            key={trendingMovie.id}
            onClick={() => router.push(`/movies/${trendingMovie.id}`)}
          >
            <Card
              radius="lg"
              className="border-none cursor-pointer group h-72 md:h-[400px] shadow-sm shadow-gray-500"
            >
              <Image
                alt={trendingMovie.title}
                className="object-cover group-hover:scale-110 transition duration-300"
                fill
                src={`${IMAGE_URL}${trendingMovie.poster_path}`}
              />
              <div className="w-full h-full bg-black opacity-0 group-hover:opacity-75 transition duration-300 z-20"></div>
              <div className="absolute bottom-2 w-full md:group-hover:bottom-40 z-40 transition-all duration-500 flex items-center justify-center">
                <h4 className="text-center mx-6 rounded-lg md:group-hover:border max-w-sm text-white text-lg bg-black/80 py-2 px-4">
                  {trendingMovie.title}
                </h4>
              </div>
            </Card>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default TrendingSlider;
