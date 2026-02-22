import { cardVariants } from "@heroui/react";
import Link from "next/link";
import { Entity, TmdbPosterSizes } from "@/lib/constants";
import type {
  CelebrityDetailsType,
  CelebrityType,
  EntityType,
  MovieDetailsType,
  MovieType,
  TvDetailsType,
  TvType,
} from "@/lib/validators";
import ImageWithBlur from "./ImageWithBlur";
import RippleUI from "./RippleUI";

type EntityCardProps = {
  media:
    | MovieType
    | MovieDetailsType
    | TvType
    | TvDetailsType
    | CelebrityType
    | CelebrityDetailsType;
  priority: boolean;
  href: string;
  type: EntityType;
};

const EntityCard = ({ media, priority, href, type }: EntityCardProps) => {
  const title =
    type === Entity.Movie
      ? (media as MovieType | MovieDetailsType).title
      : (media as TvType | TvDetailsType | CelebrityDetailsType | CelebrityType)
          .name;

  const src =
    type === Entity.Celebrity
      ? (media as CelebrityType | CelebrityDetailsType).profile_path || ""
      : (media as MovieType | MovieDetailsType | TvType | TvDetailsType)
          .poster_path || "";

  const styles = cardVariants();

  return (
    <Link
      href={href}
      className={styles.base({
        className:
          "border-none relative hover:cursor-pointer hover:opacity-100 active:opacity-100 group h-72 xl:h-92 2xl:h-112 shadow-sm shadow-gray-500",
      })}
    >
      <RippleUI />
      <ImageWithBlur
        alt={`${title} image`}
        blurImageSize={TmdbPosterSizes.W92}
        imageSize={TmdbPosterSizes.W500}
        priority={priority}
        sizes="
        (max-width: 640px) calc((100vw - 2rem) / 2),   
        (max-width: 767px) calc((100vw - 3rem) / 3),
        (max-width: 899px) calc(100vw - 6rem - 2.5rem)/3,   
        calc(100vw - 6rem - 5rem)/4                        
      "
        className="object-cover md:group-hover:scale-110 transition duration-300"
        path={src}
      />
      <div className="absolute bottom-0 left-0 w-full min-h-10 bg-black/90 md:group-hover:bg-black/75 md:group-hover:min-h-full z-30 transition-all duration-300 flex items-center justify-center p-1">
        <h4 className="text-center text-white text-lg">{title}</h4>
      </div>
    </Link>
  );
};

export default EntityCard;
