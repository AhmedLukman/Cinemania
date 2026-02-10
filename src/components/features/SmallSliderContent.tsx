import { Entity, TmdbBackdropSizes } from "@/lib/constants";
import type { EntityType, MovieType, TvType } from "@/lib/validators";
import HoverCard from "../ui/HoverCard";
import ImageWithBlur from "../ui/ImageWithBlur";

type SmallSliderContentProps = {
  popularMedia: MovieType | TvType;
  index: number;
  type: EntityType;
};

const SmallSliderContent = ({
  popularMedia,
  index,
  type,
}: SmallSliderContentProps) => {
  const title =
    type === Entity.Movie
      ? (popularMedia as MovieType).title
      : (popularMedia as TvType).name;

  const { id, backdrop_path } = popularMedia;

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

export default SmallSliderContent;
