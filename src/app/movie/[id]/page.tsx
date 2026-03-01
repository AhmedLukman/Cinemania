import { notFound } from "next/navigation";
import CollectionSection from "@/components/features/CollectionSection";
import MediaDetails from "@/components/features/MediaDetails";
import ProviderSection from "@/components/features/ProviderSection";
import MediaDetailsLayout from "@/components/layout/MediaDetailsLayout";
import {
  cachedMovieCredits,
  cachedMovieDetails,
  cachedMovieLinks,
} from "@/lib/serverService";

const MovieDetailsPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;
  const details = await cachedMovieDetails(`/movie/${id}`);

  if (!details) {
    notFound();
  }

  const [creditsResult, linksResult] = await Promise.allSettled([
    cachedMovieCredits(`/movie/${id}/credits`),
    cachedMovieLinks(`/movie/${id}/external_ids`),
  ]);

  const credits =
    creditsResult.status === "fulfilled" ? creditsResult.value : null;
  const links = linksResult.status === "fulfilled" ? linksResult.value : null;

  return (
    <>
      <MediaDetailsLayout
        backdrop_path={details.backdrop_path}
        poster_path={details.poster_path}
        title={details.title}
        priority={true}
      >
        <MediaDetails details={details} credits={credits} links={links} />
      </MediaDetailsLayout>
      <CollectionSection collection={details.belongs_to_collection} />
      <ProviderSection id={id} />
    </>
  );
};

export default MovieDetailsPage;
