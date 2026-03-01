import { ImageSize } from "@/lib/constants";
import type { ImageType } from "@/lib/validators";
import ImageWithBlur from "../ui/ImageWithBlur";

const ImageModalSection = async ({
  images,
  title,
  heading,
}: {
  images: ImageType[];
  title: string;
  heading: string;
}) => {
  return (
    <section>
      <h3 className="text-2xl font-bold text-white my-4">{heading}</h3>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {images.map((image) => {
          const aspectRatio =
            heading === "Backdrops"
              ? "aspect-video"
              : heading === "Posters"
                ? "aspect-[2/3]"
                : "aspect-square";

          return (
            <div
              key={image.file_path}
              className={`relative w-full ${aspectRatio}`}
            >
              <ImageWithBlur
                alt={`${title} ${heading.slice(0, -1)} image`}
                path={image.file_path}
                blurImageSize={ImageSize.ExtraSmall}
                imageSize={ImageSize.Medium}
                sizes="(max-width: 768px) 50vw, 33vw"
                className="rounded-md object-cover"
              />
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default ImageModalSection;
