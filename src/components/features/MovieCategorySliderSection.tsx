import {
  type MovieCategoryHeadings,
  TmdbApiMovieEndpoints,
} from "@/lib/constants";
import { cachedMovieList } from "@/lib/serverService";
import type { MovieCategoryHeadingsType, MovieType } from "@/lib/validators";
import BorderButton from "../ui/BorderButton";
import MediaCard from "./MediaCard";
import MediaCategorySlider from "./MovieCategorySlider";

type MediaCategorySliderSectionProps = {
  heading: Exclude<
    MovieCategoryHeadingsType,
    typeof MovieCategoryHeadings.Latest
  >;
};

const MediaCategorySliderSection = async ({
  heading,
}: MediaCategorySliderSectionProps) => {
  const noWhitespaceHeading = heading.replace(/\s+/g, "") as Exclude<
    keyof typeof TmdbApiMovieEndpoints,
    "Latest"
  >;
  const slugHeading = heading.toLowerCase().replace(/ /g, "-");

  let mediaCategory: MovieType[];

  try {
    const { results } = await cachedMovieList(
      TmdbApiMovieEndpoints[noWhitespaceHeading],
    );

    mediaCategory = results;
  } catch {
    return (
      <p className="text-red-500 text-center">
        ⚠️ Error fetching {heading} movies ⚠️
      </p>
    );
  }

  if (mediaCategory.length === 0) {
    return (
      <p className="text-gray-500 text-center">No {heading} movies found.</p>
    );
  }

  return (
    <section className="md:mx-5 lg:mx-10 mt-12 pb-10">
      <div className="flex p-4 md:pb-14 justify-between items-center">
        <h3 className="text-white z-10 text-2xl md:text-3xl font-serif font-bold">
          {heading}
        </h3>
        <BorderButton href={`/movie/category/${slugHeading}`}>
          View more
        </BorderButton>
      </div>
      <MediaCategorySlider length={mediaCategory.length}>
        {mediaCategory.map((result, index) => (
          <MediaCard
            href={`/movie/${result.id}`}
            priority={index < 4}
            key={result.id}
            media={result}
          />
        ))}
      </MediaCategorySlider>
    </section>
  );
};

export default MediaCategorySliderSection;
