import { Media, TmdbBackdropSizes } from "@/lib/constants";
import type { MediaType, MovieType, TvType } from "@/lib/validators";
import HoverCard from "../ui/HoverCard";
import ImageWithBlur from "../ui/ImageWithBlur";

type PopularMoviesSmallSliderContentProps = {
  popularMovie: MovieType | TvType;
  index: number;
  type: MediaType;
};

const PopularMoviesSmallSliderContent = ({
  popularMovie,
  index,
  type,
}: PopularMoviesSmallSliderContentProps) => {
  const title =
    type === Media.Movie
      ? (popularMovie as MovieType).title
      : (popularMovie as TvType).name;

  const { id, backdrop_path } = popularMovie;

  return (
    <HoverCard key={id} index={index} title={title}>
      <ImageWithBlur
        sizes="(max-width: 540px) calc(50vw - 1rem), (max-width: 800px) calc(33vw - 1rem), calc(20vw - 1rem)"
        path={backdrop_path || ""}
        alt={`${title} thumbnail`}
        priority={index < 5}
        className="object-cover scale-[1.15]"
        imageSize={TmdbBackdropSizes.W780}
        blurImageSize={TmdbBackdropSizes.W300}
      />
    </HoverCard>
  );
};

export default PopularMoviesSmallSliderContent;
