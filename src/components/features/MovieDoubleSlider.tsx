import { SliderProvider } from "@/context/SliderContext";
import { TmdbApiMovieEndpoints } from "@/lib/constants";
import { cachedFetchMedia } from "@/lib/serverService";
import type { Movie, MovieResponse } from "@/lib/types";
import BigSlider from "./BigSlider";
import PopularMovieSliderContent from "./PopularMovieSliderContent";

const MovieDoubleSlider = async () => {
  let popularMovies: Movie[];
  try {
    const { results } = await cachedFetchMedia(TmdbApiMovieEndpoints.Popular) as MovieResponse;
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
            <PopularMovieSliderContent
              key={popularMovie.id}
              popularMovie={popularMovie}
              isFirstMovie={index === 0}
            />
          ))}
        </BigSlider>
      </section>
    </SliderProvider>
  );
};

export default MovieDoubleSlider;
