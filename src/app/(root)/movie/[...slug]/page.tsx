import AllCategoryMedia from "@/components/ui/AllCategoryMedia";
import { MoviesUrl } from "@/lib/constants";
import { fetchMedia } from "@/lib/utils";
import { notFound } from "next/navigation";
import React from "react";

const CatchAllPage = async ({ params }: { params: { slug: string } }) => {
  const movieId = params.slug[0];
  const role = params.slug[2];

  let allPeople: any = [];

  if (role === "cast") {
    for (let page = 1; page <= 3; page++) {
      const credits = (await fetchMedia(
        MoviesUrl.Origin + movieId + "/credits?language=en-US"
      )) as TMediaCreditsResponse;

      allPeople = [...allPeople, ...credits.cast];
    }
  } else if (role === "crew") {
    for (let page = 1; page <= 3; page++) {
      const credits = (await fetchMedia(
        MoviesUrl.Origin + movieId + "/credits?language=en-US"
      )) as TMediaCreditsResponse;

      allPeople = [...allPeople, ...credits.crew];
    }
  } else notFound();

  return <AllCategoryMedia heading={"Movie " + role}  media={allPeople} />;
};

export default CatchAllPage;
