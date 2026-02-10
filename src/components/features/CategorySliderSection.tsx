import {
  Media,
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
  CelebrityType,
  MediaType,
  MovieCategoryHeadingsType,
  MovieDetailsType,
  MovieType,
  TmdbApiCelebrityEndpointsType,
  TmdbApiMovieEndpointsType,
  TmdbApiTvEndpointsType,
  TvCategoryHeadingsType,
  TvDetailsType,
  TvType,
} from "@/lib/validators";
import BorderButton from "../ui/BorderButton";
import MediaCard from "../ui/MediaCard";
import CategorySlider from "./CategorySlider";

type CategorySliderSectionProps = {
  heading:
    | MovieCategoryHeadingsType
    | TvCategoryHeadingsType
    | CelebrityCategoryHeadingsType;
  type: MediaType;
};

type EntityType = MovieType | TvType | CelebrityType;

type MediaListResult = {
  results: EntityType[];
};

type ListEndpointByEntity = {
  [Media.Movie]: Exclude<
    TmdbApiMovieEndpointsType,
    typeof TmdbApiMovieEndpoints.Latest
  >;
  [Media.TV]: Exclude<TmdbApiTvEndpointsType, typeof TmdbApiTvEndpoints.Latest>;
  [Media.Celebrity]: Exclude<
    TmdbApiCelebrityEndpointsType,
    typeof TmdbApiCelebrityEndpoints.Latest
  >;
};

const CategorySliderSection = async ({
  heading,
  type,
}: CategorySliderSectionProps) => {
  const isMovie = type === Media.Movie;
  const isTV = type === Media.TV;
  const noWhitespaceHeading = heading.replace(/\s+/g, "");
  const slugHeading = heading.toLowerCase().replace(/ /g, "-");

  let mediaCategory:
    | EntityType[]
    | [MovieDetailsType | TvDetailsType | CelebrityDetailsType];

  const detailFetchers: Record<
    MediaType,
    () => Promise<MovieDetailsType | TvDetailsType | CelebrityDetailsType>
  > = {
    [Media.Movie]: () => cachedMovieDetails(),
    [Media.TV]: () => cachedTvDetails(),
    [Media.Celebrity]: () => cachedCelebrityDetails(),
  };

  const fetchDetailsByType = () => detailFetchers[type]();

  const endpointMaps = {
    [Media.Movie]: TmdbApiMovieEndpoints,
    [Media.TV]: TmdbApiTvEndpoints,
    [Media.Celebrity]: TmdbApiCelebrityEndpoints,
  } as const;

  const listFetchers: Record<
    MediaType,
    (endpoint: ListEndpointByEntity[MediaType]) => Promise<MediaListResult>
  > = {
    [Media.Movie]: (endpoint) =>
      cachedMovieList(endpoint as ListEndpointByEntity[typeof Media.Movie]),
    [Media.TV]: (endpoint) =>
      cachedTvList(endpoint as ListEndpointByEntity[typeof Media.TV]),
    [Media.Celebrity]: (endpoint) =>
      cachedCelebrityList(
        endpoint as ListEndpointByEntity[typeof Media.Celebrity],
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
            type={type}
          />
        ))}
      </CategorySlider>
    </section>
  );
};

export default CategorySliderSection;
