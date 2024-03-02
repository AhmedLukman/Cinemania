import React from "react";
import TrendingSlider from "./TrendingSlider";
import { Button } from "@nextui-org/react";

const TrendingMovies = ({
  trendingMovies,
}: {
  trendingMovies: TTrendingMovie[];
}) => {
  return (
    <section>
      <div className="flex p-5 md:py-10 md:px-20 justify-between">
        <h3 className="text-white text-2xl md:text-3xl font-serif font-bold">
          Trending Movies
        </h3>
        <Button className="text-white" variant="bordered">View more</Button>
      </div>
      <TrendingSlider trendingMovies={trendingMovies} />
    </section>
  );
};

export default TrendingMovies;
