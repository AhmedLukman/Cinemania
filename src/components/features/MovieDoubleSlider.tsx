import { SliderProvider } from "@/context/SliderContext";
import { TmdbApiMovieEndpoints } from "@/lib/constants";
import { cachedMovieList } from "@/lib/serverService";
import type { MovieType } from "@/lib/validators";
import BigSlider from "./BigSlider";
import PopularMoviesBigSliderContent from "./PopularMoviesBigSliderContent";
import PopularMoviesSmallSliderContent from "./PopularMoviesSmallSliderContent";
import SmallSlider from "./SmallSlider";

const MovieDoubleSlider = async () => {
  let popularMovies: MovieType[];
  try {
    const { results } = await cachedMovieList(TmdbApiMovieEndpoints.Popular);
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
            />
          ))}
        </BigSlider>
        <SmallSlider>
          {popularMovies.map((popularMovie, index) => (
            <PopularMoviesSmallSliderContent
              key={popularMovie.id}
              popularMovie={popularMovie}
              index={index}
            />
          ))}
        </SmallSlider>
      </section>
    </SliderProvider>
  );
};

export default MovieDoubleSlider;
