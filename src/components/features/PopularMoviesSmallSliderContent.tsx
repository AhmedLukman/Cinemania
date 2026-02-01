import { TmdbBackdropSizes } from "@/lib/constants";
import type { MovieType } from "@/lib/validators";
import ImageWithBlur from "../ui/ImageWithBlur";
import HoverCard from "./HoverCard";

type PopularMoviesSmallSliderContentProps = {
  popularMovie: MovieType;
  index: number;
};

const PopularMoviesSmallSliderContent = ({
  popularMovie: { id, backdrop_path, title },
  index,
}: PopularMoviesSmallSliderContentProps) => {
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
