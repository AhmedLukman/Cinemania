import { SliderProvider } from "@/context/SliderContext";
import {
  Media,
  TmdbApiMovieEndpoints,
  TmdbApiTvEndpoints,
} from "@/lib/constants";
import { cachedMediaList } from "@/lib/serverService";
import type { MediaType, MovieType, TvType } from "@/lib/validators";
import BigSlider from "./BigSlider";
import BigSliderContent from "./BigSliderContent";
import SmallSlider from "./SmallSlider";
import SmallSliderContent from "./SmallSliderContent";

type DoubleSliderProps = {
  type: MediaType;
};

const DoubleSlider = async ({ type }: DoubleSliderProps) => {
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
            <BigSliderContent
              key={item.id}
              popularMedia={item}
              isFirstMedia={index === 0}
              type={type}
            />
          ))}
        </BigSlider>
        <SmallSlider>
          {popularMedia.map((item, index) => (
            <SmallSliderContent
              key={item.id}
              popularMedia={item}
              index={index}
              type={type}
            />
          ))}
        </SmallSlider>
      </section>
    </SliderProvider>
  );
};

export default DoubleSlider;
