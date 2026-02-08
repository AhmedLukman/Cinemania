import {
  Media,
  TmdbApiMovieEndpoints,
  TmdbApiTvEndpoints,
} from "@/lib/constants";
import { cachedMediaDetails, cachedMediaList } from "@/lib/serverService";
import type {
  MediaType,
  MovieCategoryHeadingsType,
  MovieDetailsType,
  MovieType,
  TvCategoryHeadingsType,
  TvDetailsType,
  TvType,
} from "@/lib/validators";
import BorderButton from "../ui/BorderButton";
import MediaCard from "../ui/MediaCard";
import CategorySlider from "./CategorySlider";

type CategorySliderSectionProps = {
  heading: MovieCategoryHeadingsType | TvCategoryHeadingsType;
  type: MediaType;
};

const CategorySliderSection = async ({
  heading,
  type,
}: CategorySliderSectionProps) => {
  const isMovie = type === Media.Movie;
  const noWhitespaceHeading = heading.replace(/\s+/g, "");
  const slugHeading = heading.toLowerCase().replace(/ /g, "-");

  let mediaCategory:
    | (MovieType | TvType)[]
    | [MovieDetailsType | TvDetailsType];

  try {
    if (heading === "Latest") {
      const data = await cachedMediaDetails(type);
      mediaCategory = [data];
    } else {
      const endpoints = isMovie ? TmdbApiMovieEndpoints : TmdbApiTvEndpoints;
      const endpoint =
        endpoints[
          noWhitespaceHeading as Exclude<keyof typeof endpoints, "Latest">
        ];

      const { results } = await cachedMediaList(type, endpoint);
      mediaCategory = results;
    }
  } catch {
    return (
      <p className="text-red-500 text-center">
        ⚠️ Error fetching {heading} {isMovie ? "movies" : "TV shows"} ⚠️
      </p>
    );
  }

  if (mediaCategory.length === 0) {
    return (
      <p className="text-gray-500 text-center">
        No {heading} {isMovie ? "movies" : "TV shows"} found.
      </p>
    );
  }

  return (
    <section className="md:mx-5 lg:mx-10 mt-12 md:pb-10">
      <div className="flex p-4 md:pb-14 justify-between items-center">
        <h3 className="text-white z-10 text-2xl md:text-3xl font-serif font-bold">
          {heading}
        </h3>
        {mediaCategory.length === 20 && (
          <BorderButton href={`/${type.toLowerCase()}/category/${slugHeading}`}>
            View more
          </BorderButton>
        )}
      </div>
      <CategorySlider length={mediaCategory.length}>
        {mediaCategory.map((result, index) => (
          <MediaCard
            href={`/${type.toLowerCase()}/${result.id}`}
            priority={index < 4}
            key={result.id}
            media={result}
            isMovie={isMovie}
          />
        ))}
      </CategorySlider>
    </section>
  );
};

export default CategorySliderSection;
