import { Entity, TmdbBackdropSizes, TmdbPosterSizes } from "@/lib/constants";
import type { MediaType, MovieType, TvType } from "@/lib/validators";
import Backdrop from "../ui/Backdrop";
import ImageWithBlur from "../ui/ImageWithBlur";
import MediaDetails from "./MediaDetails";

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
    <div className="h-screen relative focus:outline-none">
      {/* Full Screen Image */}
      <ImageWithBlur
        className="object-cover object-center -z-20"
        alt={`${title} backdrop`}
        sizes="100vw"
        priority={isFirstMedia}
        path={backdrop_path || ""}
        imageSize={TmdbBackdropSizes.ORIGINAL}
        blurImageSize={TmdbBackdropSizes.W300}
      />

      <Backdrop />

      <div className="h-full md:gap-5 lg:flex px-5 md:px-12 lg:px-16 xl:px-20 2xl:px-28 text-white">
        <MediaDetails
          genreIds={genre_ids}
          id={id}
          overview={overview}
          releaseDate={releaseDate}
          title={title}
          voteAverage={vote_average}
          type={type}
        />
        {/* Side Image */}
        <aside className="mt-10 hidden lg:block w-4/12 max-w-xl h-[68svh] rounded-xl relative mx-auto">
          <ImageWithBlur
            className=" object-cover object-center"
            path={poster_path || ""}
            alt={`${title} poster`}
            blurImageSize={TmdbPosterSizes.W92}
            imageSize={TmdbPosterSizes.W780}
            priority={isFirstMedia}
            sizes="(min-width: 1280px) 33vw, (min-width: 1024px) 41.666vw, 0vw"
          />
        </aside>
      </div>
    </div>
  );
};

export default BigSliderContent;
