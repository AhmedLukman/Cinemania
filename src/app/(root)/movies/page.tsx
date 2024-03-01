import DoubleSlider from "@/components/ui/DoubleSlider";
import { POPULAR_MOVIES_OPTIONS, POPULAR_MOVIES_URL } from "@/lib/constants";
import { notFound } from "next/navigation";
import React from "react";

const MoviesPage = async () => {
  const res = await fetch(
    `${POPULAR_MOVIES_URL}?page=1`,
    POPULAR_MOVIES_OPTIONS
  );
  const { results: popularMovies }: TPopularMovieResult = await res.json();

  if (!popularMovies) notFound();

  return (
    <>
      <DoubleSlider popularMovies={popularMovies} />
    </>
  );
};

export default MoviesPage;
