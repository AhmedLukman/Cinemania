import { SliderProvider } from "@/context/SliderContext";
import {
  Media,
  TmdbApiMovieEndpoints,
  TmdbApiTvEndpoints,
} from "@/lib/constants";
import { cachedMovieList, cachedTvList } from "@/lib/serverService";
import type { MediaType, MovieType, TvType } from "@/lib/validators";
import BigSlider from "./BigSlider";
import PopularMoviesBigSliderContent from "./PopularMoviesBigSliderContent";
import PopularMoviesSmallSliderContent from "./PopularMoviesSmallSliderContent";
import SmallSlider from "./SmallSlider";

type MovieDoubleSliderProps = {
  type: MediaType;
};

const MovieDoubleSlider = async ({ type }: MovieDoubleSliderProps) => {
  let popularMovies: (MovieType | TvType)[];
  try {
    const { results } =
      type === Media.Movie
        ? await cachedMovieList(TmdbApiMovieEndpoints.Popular)
        : await cachedTvList(TmdbApiTvEndpoints.Popular);
    popularMovies = results;
  } catch {
    return (
      <section className="h-screen flex items-center 2xl:text-lg justify-center">
        <p className="text-red-500">⚠️ Error fetching popular movies ⚠️</p>
      </section>
    );
  }

  if (popularMovies.length === 0) {
    return (
      <section className="h-screen flex items-center 2xl:text-lg justify-center">
        <p className="text-gray-500">No popular movies found. 😢</p>
      </section>
    );
  }

  return (
    <SliderProvider>
      <section className="slider-container">
        <BigSlider>
          {popularMovies.map((popularMovie, index: number) => (
            <PopularMoviesBigSliderContent
              key={popularMovie.id}
              popularMovie={popularMovie}
              isFirstMovie={index === 0}
              type={type}
            />
          ))}
        </BigSlider>
        <SmallSlider>
          {popularMovies.map((popularMovie, index) => (
            <PopularMoviesSmallSliderContent
              key={popularMovie.id}
              popularMovie={popularMovie}
              index={index}
              type={type}
            />
          ))}
        </SmallSlider>
      </section>
    </SliderProvider>
  );
};

export default MovieDoubleSlider;
