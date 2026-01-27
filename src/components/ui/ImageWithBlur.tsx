import Image from "next/image";
import { cachedGetBase64 } from "@/lib/serverService";
import type { TmdbImageSizes } from "@/lib/types";
import { getImageUrl, isURL } from "@/lib/utils";

type ImageWithBlurProps = {
  sizes: string;
  className?: string;
  alt: string;
  priority?: boolean;
  path: string;
  blurImageSize: TmdbImageSizes;
  imageSize: TmdbImageSizes;
};

const ImageWithBlur = async ({
  path,
  imageSize,
  blurImageSize,
  sizes,
  className,
  alt,
  priority = false,
}: ImageWithBlurProps) => {
  if (!path) return null; // TODO: Change this later to place dummy film image. Tip: Latest film has null path
  const isPathURL = isURL(path);
  const imageUrl = isPathURL ? path : getImageUrl(path, imageSize);
  const blurDataURL = await cachedGetBase64(
    isPathURL ? path : getImageUrl(path, blurImageSize),
  );

  return (
    <Image
      alt={alt}
      className={className}
      placeholder={blurDataURL ? "blur" : "empty"}
      blurDataURL={blurDataURL}
      priority={priority}
      fill
      src={imageUrl}
      sizes={sizes}
    />
  );
};

export default ImageWithBlur;
