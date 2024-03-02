import React from "react";
import MovieCategorySlider from "./MovieCategorySlider";
import { Button } from "@nextui-org/react";

const MovieCategory = ({
  movies,
  heading
}: {
  movies: TMovie[];
  heading: string
}) => {
  return (
    <section>
      <div className="flex p-5 md:py-10 md:px-20 justify-between">
        <h3 className="text-white text-2xl md:text-3xl font-serif font-bold">
          {heading}
        </h3>
        <Button className="text-white" variant="bordered">View more</Button>
      </div>
      <MovieCategorySlider movies={movies} />
    </section>
  );
};

export default MovieCategory;
