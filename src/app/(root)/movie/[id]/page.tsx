"use client";

import PosterContainer from "@/components/ui/PosterContainer";
import { MoviesUrl } from "@/lib/constants";
import { fetchMovies } from "@/lib/utils";
import React, { useEffect, useState } from "react";

const SingleMoviePage = ({ params: { id } }: { params: { id: string } }) => {
  const [data, setData] = useState<TMovieDetailsResponse>();
  useEffect(() => {
    const fetchData = async () => {
      const popularMovies = (await fetchMovies(
        MoviesUrl.Origin + id.toString() + "?language=en-US"
      )) as TMovieDetailsResponse;
      setData(popularMovies);
    };

    fetchData();
  }, [id]);
  return <PosterContainer {...data!} />;
};

export default SingleMoviePage;
