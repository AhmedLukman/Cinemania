import { Entity } from "@/lib/constants";
import type { MediaType, MovieType, TvType } from "@/lib/validators";
import MediaDetailsLayout from "../layout/MediaDetailsLayout";
import MediaDetailsPreview from "./MediaDetailsPreview";

type BigSliderContentProps = {
  popularMedia: MovieType | TvType;
  isFirstMedia: boolean;
  type: MediaType;
};

const BigSliderContent = ({
  popularMedia,
  isFirstMedia,
  type,
}: BigSliderContentProps) => {
  const isMovie = type === Entity.Movie;

  const title = isMovie
    ? (popularMedia as MovieType).title
    : (popularMedia as TvType).name;

  const releaseDate = isMovie
    ? (popularMedia as MovieType).release_date
    : (popularMedia as TvType).first_air_date;

  const { backdrop_path, poster_path, id, overview, vote_average, genre_ids } =
    popularMedia;

  return (
    <MediaDetailsLayout
      title={title}
      backdrop_path={backdrop_path}
      poster_path={poster_path}
      priority={isFirstMedia}
    >
      <MediaDetailsPreview
        genreIds={genre_ids}
        id={id}
        overview={overview}
        releaseDate={releaseDate}
        title={title}
        voteAverage={vote_average}
        type={type}
      />
    </MediaDetailsLayout>
  );
};

export default BigSliderContent;
