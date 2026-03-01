import { Entity, TmdbBackdropSizes } from "@/lib/constants";
import {
  cachedCollectionImages,
  cachedMovieCollections,
} from "@/lib/serverService";
import { getImageUrl } from "@/lib/utils";
import type { CollectionPreviewType } from "@/lib/validators";
import EntityCard from "../ui/EntityCard";
import CategorySlider from "./CategorySlider";
import ViewImages from "./ViewImages";

type CollectionSectionProps = {
  collection: CollectionPreviewType | null;
};

const CollectionSection = async ({ collection }: CollectionSectionProps) => {
  if (!collection) return;

  const [collectionResult, imagesResult] = await Promise.allSettled([
    cachedMovieCollections(`/collection/${collection.id}`),
    cachedCollectionImages(`/collection/${collection.id}/images`),
  ]);

  const collectionData = collectionResult.status === "fulfilled" ? collectionResult.value : null;

  if(!collectionData) return null;

  const collectionImages =
    imagesResult.status === "fulfilled" ? imagesResult.value : null;

  const { overview, parts, name, backdrop_path } = collectionData;

  const backgroundImage = backdrop_path
    ? getImageUrl(backdrop_path, TmdbBackdropSizes.ORIGINAL)
    : "";

  return (
    <>
      {collection.id && (
        <section
          style={{
            backgroundImage: `url(${backgroundImage})`,
            backgroundPosition: "50% 20%",
          }}
          className={`px-3 py-7 bg-fixed md:px-10 md:py-16 bg-center bg-no-repeat bg-cover relative`}
        >
          <div className="absolute inset-0 bg-black/60" />
          <div className="relative z-10">
            <div className="flex p-5 md:pt-10 md:pb-14 gap-5 md:px-20 justify-between items-center">
              <h3 className="text-white z-10 text-2xl md:text-3xl font-serif font-bold">
                {name}
              </h3>
              {collectionImages && (
                <ViewImages imageData={collectionImages} title={name} />
              )}
            </div>
            {overview && (
              <p className="mb-14 -mt-3 md:-mt-6 px-5 md:px-20 text-gray-300">
                {overview}
              </p>
            )}
            <CategorySlider length={parts.length}>
              {parts.map((result, index) => (
                <EntityCard
                  href={`/movie/${result.id}`}
                  priority={index < 4}
                  key={result.id}
                  media={result}
                  type={Entity.Movie}
                />
              ))}
            </CategorySlider>
          </div>
        </section>
      )}
    </>
  );
};

export default CollectionSection;
