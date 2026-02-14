import {
  Entity,
  TmdbApiCelebrityEndpoints,
  TmdbApiMovieEndpoints,
  TmdbApiTvEndpoints,
} from "@/lib/constants";
import {
  cachedCelebrityDetails,
  cachedCelebrityList,
  cachedMovieDetails,
  cachedMovieList,
  cachedTvDetails,
  cachedTvList,
} from "@/lib/serverService";
import type {
  CelebrityCategoryHeadingsType,
  CelebrityDetailsType,
  CelebrityListEndpoint,
  CelebrityType,
  EntityType,
  MovieCategoryHeadingsType,
  MovieDetailsType,
  MovieListEndpoint,
  MovieType,
  TvCategoryHeadingsType,
  TvDetailsType,
  TvListEndpoint,
  TvType,
} from "@/lib/validators";
import BorderButton from "../ui/BorderButton";
import EntityCard from "../ui/EntityCard";
import CategorySlider from "./CategorySlider";

type CategorySliderSectionProps = {
  heading:
    | MovieCategoryHeadingsType
    | TvCategoryHeadingsType
    | CelebrityCategoryHeadingsType;
  type: EntityType;
};

type EntityUnion = MovieType | TvType | CelebrityType;

type MediaListResult = {
  results: EntityUnion[];
};

type ListEndpointByEntity = {
  [Entity.Movie]: MovieListEndpoint;
  [Entity.TV]: TvListEndpoint;
  [Entity.Celebrity]: CelebrityListEndpoint;
};

const CategorySliderSection = async ({
  heading,
  type,
}: CategorySliderSectionProps) => {
  const isMovie = type === Entity.Movie;
  const isTV = type === Entity.TV;
  const basePath = type === Entity.Celebrity ? "celebrity" : type.toLowerCase();
  const noWhitespaceHeading = heading.replace(/\s+/g, "");
  const slugHeading = heading.toLowerCase().replace(/ /g, "-");

  let mediaCategory:
    | EntityUnion[]
    | [MovieDetailsType | TvDetailsType | CelebrityDetailsType];

  const detailFetchers: Record<
    EntityType,
    () => Promise<MovieDetailsType | TvDetailsType | CelebrityDetailsType>
  > = {
    [Entity.Movie]: () => cachedMovieDetails(),
    [Entity.TV]: () => cachedTvDetails(),
    [Entity.Celebrity]: () => cachedCelebrityDetails(),
  };

  const fetchDetailsByType = () => detailFetchers[type]();

  const endpointMaps = {
    [Entity.Movie]: TmdbApiMovieEndpoints,
    [Entity.TV]: TmdbApiTvEndpoints,
    [Entity.Celebrity]: TmdbApiCelebrityEndpoints,
  } as const;

  const listFetchers: Record<
    EntityType,
    (endpoint: ListEndpointByEntity[EntityType]) => Promise<MediaListResult>
  > = {
    [Entity.Movie]: (endpoint) =>
      cachedMovieList(endpoint as ListEndpointByEntity[typeof Entity.Movie]),
    [Entity.TV]: (endpoint) =>
      cachedTvList(endpoint as ListEndpointByEntity[typeof Entity.TV]),
    [Entity.Celebrity]: (endpoint) =>
      cachedCelebrityList(
        endpoint as ListEndpointByEntity[typeof Entity.Celebrity],
      ),
  };

  const fetchListByType = () => {
    const endpoints = endpointMaps[type];
    const endpoint =
      endpoints[
        noWhitespaceHeading as Exclude<keyof typeof endpoints, "Latest">
      ];
    return listFetchers[type](endpoint);
  };

  try {
    if (heading === "Latest") {
      const data = await fetchDetailsByType();
      mediaCategory = [data];
    } else {
      const { results } = await fetchListByType();
      mediaCategory = results;
    }
  } catch {
    return (
      <p className="text-red-500 text-center">
        ⚠️ Error fetching {heading}{" "}
        {isMovie ? "movies" : isTV ? "TV shows" : "celebrities"} ⚠️
      </p>
    );
  }

  if (mediaCategory.length === 0) {
    return (
      <p className="text-gray-500 text-center">
        No {heading} {isMovie ? "movies" : isTV ? "TV shows" : "celebrities"}{" "}
        found.
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
          <BorderButton href={`/${basePath}/category/${slugHeading}`}>
            View more
          </BorderButton>
        )}
      </div>
      <CategorySlider length={mediaCategory.length}>
        {mediaCategory.map((result, index) => (
          <EntityCard
            href={`/${basePath}/${result.id}`}
            priority={index < 4}
            key={result.id}
            media={result}
            type={type}
          />
        ))}
      </CategorySlider>
    </section>
  );
};

export default CategorySliderSection;
