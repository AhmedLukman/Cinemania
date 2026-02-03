import { SliderProvider } from "@/context/SliderContext";
import {
  Media,
  TmdbApiMovieEndpoints,
  TmdbApiTvEndpoints,
} from "@/lib/constants";
import { cachedMediaList } from "@/lib/serverService";
import type { MediaType, MovieType, TvType } from "@/lib/validators";
import BigSlider from "./BigSlider";
import PopularMoviesBigSliderContent from "./PopularMoviesBigSliderContent";
import PopularMoviesSmallSliderContent from "./PopularMoviesSmallSliderContent";
import SmallSlider from "./SmallSlider";

type MediaDoubleSliderProps = {
  type: MediaType;
};

const MediaDoubleSlider = async ({ type }: MediaDoubleSliderProps) => {
  let popularMedia: (MovieType | TvType)[];
  try {
    const { results } = await cachedMediaList(
      type,
      type === Media.Movie
        ? TmdbApiMovieEndpoints.Popular
        : TmdbApiTvEndpoints.Popular,
    );
    popularMedia = results;
  } catch {
    return (
      <section className="h-screen flex items-center 2xl:text-lg justify-center">
        <p className="text-red-500">
          ⚠️ Error fetching popular{" "}
          {type === Media.Movie ? "movies" : "TV shows"} ⚠️
        </p>
      </section>
    );
  }

  if (popularMedia.length === 0) {
    return (
      <section className="h-screen flex items-center 2xl:text-lg justify-center">
        <p className="text-gray-500">
          No popular {type === Media.Movie ? "movies" : "TV shows"} found. 😢
        </p>
      </section>
    );
  }

  return (
    <SliderProvider>
      <section className="slider-container">
        <BigSlider>
          {popularMedia.map((item, index: number) => (
            <PopularMoviesBigSliderContent
              key={item.id}
              popularMovie={item}
              isFirstMovie={index === 0}
              type={type}
            />
          ))}
        </BigSlider>
        <SmallSlider>
          {popularMedia.map((item, index) => (
            <PopularMoviesSmallSliderContent
              key={item.id}
              popularMovie={item}
              index={index}
              type={type}
            />
          ))}
        </SmallSlider>
      </section>
    </SliderProvider>
  );
};

export default MediaDoubleSlider;
