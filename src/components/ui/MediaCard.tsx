import { Card, Link } from "@heroui/react";
import { TmdbPosterSizes } from "@/lib/constants";
import type { MovieDetailsType, MovieType } from "@/lib/validators";
import "m3-ripple/ripple.css";
import ImageWithBlur from "./ImageWithBlur";
import RippleClient from "./RippleClient";

type MediaCardProps = {
  media: MovieType | MovieDetailsType;
  priority: boolean;
  href: string;
};

const MediaCard = ({ media, priority, href }: MediaCardProps) => {
  const title = media.title;
  const src = media.poster_path || ""; // TODO: Add fallback image
  return (
    <Link href={href}>
      <Card className="border-none relative hover:cursor-pointer hover:opacity-100 active:opacity-100 group h-72 xl:h-92 2xl:h-112 shadow-sm shadow-gray-500">
        <RippleClient />
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
      </Card>
    </Link>
  );
};

export default MediaCard;
