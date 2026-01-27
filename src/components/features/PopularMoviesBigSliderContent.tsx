import { TmdbBackdropSizes, TmdbPosterSizes } from "@/lib/constants";
import type { Movie } from "@/lib/types";
import Backdrop from "../ui/Backdrop";
import ImageWithBlur from "../ui/ImageWithBlur";
import MovieDetails from "./MovieDetails";

type PopularMoviesBigSliderContentProps = {
  popularMovie: Movie;
  isFirstMovie: boolean;
};

const PopularMoviesBigSliderContent = async ({
  popularMovie: {
    title,
    backdrop_path,
    poster_path,
    id,
    overview,
    release_date,
    vote_average,
    genre_ids,
  },
  isFirstMovie,
}: PopularMoviesBigSliderContentProps) => {
  return (
    <div className="h-screen relative focus:outline-none">
      {/* Full Screen Image */}
      <ImageWithBlur
        className="object-cover object-center -z-20"
        alt={`${title} backdrop`}
        sizes="100vw"
        priority={isFirstMovie}
        path={backdrop_path}
        imageSize={TmdbBackdropSizes.ORIGINAL}
        blurImageSize={TmdbBackdropSizes.W300}
      />

      <Backdrop />

      <div className="h-full md:gap-5 lg:flex px-5 md:px-12 lg:px-16 xl:px-20 2xl:px-28 text-white">
        <MovieDetails
          genreIds={genre_ids}
          id={id}
          overview={overview}
          releaseDate={release_date}
          title={title}
          voteAverage={vote_average}
        />
        {/* Side Image */}
        <aside className="mt-10 hidden lg:block w-4/12 max-w-xl h-[68svh] rounded-xl relative mx-auto">
          <ImageWithBlur
            className=" object-cover object-center"
            path={poster_path}
            alt={`${title} poster`}
            blurImageSize={TmdbPosterSizes.W92}
            imageSize={TmdbPosterSizes.W780}
            priority={isFirstMovie}
            sizes="(min-width: 1280px) 33vw, (min-width: 1024px) 41.666vw, 0vw"
          />
        </aside>
      </div>
    </div>
  );
};

export default PopularMoviesBigSliderContent;
