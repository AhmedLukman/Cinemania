import {
  Media,
  MovieCategoryHeadings,
  TmdbApiMovieEndpoints,
  TmdbApiTvEndpoints,
  TvCategoryHeadings,
} from "@/lib/constants";
import {
  cachedLatestMovie,
  cachedLatestTv,
  cachedMovieList,
  cachedTvList,
} from "@/lib/serverService";
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
import MediaCategorySlider from "./MediaCategorySlider";

type MediaCategorySliderSectionProps = {
  heading: MovieCategoryHeadingsType | TvCategoryHeadingsType;
  type: MediaType;
};

const MediaCategorySliderSection = async ({
  heading,
  type,
}: MediaCategorySliderSectionProps) => {
  const isMovie = type === Media.Movie;
  const noWhitespaceHeading = heading.replace(/\s+/g, "");
  const slugHeading = heading.toLowerCase().replace(/ /g, "-");

  let mediaCategory: (MovieType | TvType)[] | [MovieDetailsType | TvDetailsType];

  try {
    if (isMovie) {
      if (heading === MovieCategoryHeadings.Latest) {
        const data = await cachedLatestMovie();
        mediaCategory = [data];
      } else {
        const { results } = await cachedMovieList(
          TmdbApiMovieEndpoints[
            noWhitespaceHeading as Exclude<
              keyof typeof TmdbApiMovieEndpoints,
              "Latest"
            >
          ],
        );
        mediaCategory = results;
      }
    } else {
      if (heading === TvCategoryHeadings.Latest) {
        const data = await cachedLatestTv();
        mediaCategory = [data];
      } else {
        const { results } = await cachedTvList(
          TmdbApiTvEndpoints[
            noWhitespaceHeading as Exclude<
              keyof typeof TmdbApiTvEndpoints,
              "Latest"
            >
          ],
        );
        mediaCategory = results;
      }
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
      <MediaCategorySlider length={mediaCategory.length}>
        {mediaCategory.map((result, index) => (
          <MediaCard
            href={`/${type.toLowerCase()}/${result.id}`}
            priority={index < 4}
            key={result.id}
            media={result}
            type={type}
          />
        ))}
      </MediaCategorySlider>
    </section>
  );
};

export default MediaCategorySliderSection;
