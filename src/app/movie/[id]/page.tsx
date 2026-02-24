import MediaDetailsLayout from "@/components/layout/MediaDetailsLayout";
import CompanyCard from "@/components/ui/CompanyCard";
import GenreList from "@/components/ui/GenreList";
import LinksList from "@/components/ui/LinksList";
import {
  cachedMovieCredits,
  cachedMovieDetails,
  cachedMovieLinks,
} from "@/lib/serverService";
import { getDirector } from "@/lib/utils";

const MovieDetailsPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;
  const details = await cachedMovieDetails(`/movie/${id}`);
  const {
    title,
    backdrop_path,
    poster_path,
    budget,
    revenue,
    production_countries,
    spoken_languages,
    tagline,
    release_date,
    vote_average,
    genres,
    overview,
    homepage,
    production_companies,
  } = details;
  const [creditsResult, linksResult] = await Promise.allSettled([
    cachedMovieCredits(`/movie/${id}/credits`),
    cachedMovieLinks(`/movie/${id}/external_ids`),
  ]);

  const credits =
    creditsResult.status === "fulfilled" ? creditsResult.value : null;
  const links = linksResult.status === "fulfilled" ? linksResult.value : null;
  const director = credits ? getDirector(credits) : null;
  return (
    <MediaDetailsLayout
      backdrop_path={backdrop_path}
      poster_path={poster_path}
      title={title}
      priority={true}
    >
      <div className="lg:w-7/12 xl:w-8/12 pt-24">
        <h2 className="text-3xl xl:text-5xl font-bold font-serif md:max-w-prose">
          {title}
        </h2>
        <div className="flex justify-between items-center gap-5 md:gap-0 flex-wrap md:max-w-prose">
          <div className="space-x-5 text-sm mt-4">
            <time dateTime={release_date.substring(0, 4)}>
              {release_date.substring(0, 4)}
            </time>
            <span className="border rounded-md p-1">
              {vote_average?.toFixed(1)}
            </span>
          </div>
          <GenreList genres={genres} />
        </div>
        <p className="max-w-prose mt-10 2xl:text-lg line-clamp-6">
          {overview || "No overview available."}
        </p>
        <div className="mt-5 space-y-2 p-6 rounded-lg bg-linear-to-b from-white/20 via-white/10 to-white/20">
          <div className="flex gap-2 flex-col md:flex-row md:gap-5">
            <div className="space-y-2 md:w-1/2">
              <p>
                <span className="text-[#cecece] text-sm mr-3">
                  Directed by:
                </span>
                {director?.name || "-"}
              </p>
              <p>
                <span className="text-[#cecece] text-sm mr-3">Budget:</span>
                {budget !== 0 ? `$${budget.toLocaleString()}` : "-"}
              </p>
              <p>
                <span className="text-[#cecece] text-sm mr-3">Revenue:</span>
                {revenue !== 0 ? `$${revenue.toLocaleString()}` : "-"}
              </p>
              <p>
                <span className="text-[#cecece] text-sm mr-3">
                  Production Countries:
                </span>
                {production_countries.map((country) => country.name).join(", ")}
                .
              </p>
              <p>
                <span className="text-[#cecece] text-sm mr-3">
                  Spoken Languages:
                </span>
                {spoken_languages.map((language) => language.name).join(", ")}.
              </p>
            </div>
            <div className="space-y-2 md:w-1/2">
              <p className="text-[#cecece] text-sm">Production Companies:</p>
              <div className="flex flex-wrap gap-4">
                {production_companies.map((company) => (
                  <CompanyCard key={company.id} company={company} />
                ))}
              </div>
            </div>
          </div>
          {tagline && (
            <p className="italic text-sm text-[#cecece] pt-5 text-center">
              ~ {tagline}
            </p>
          )}
          <LinksList links={links} homepage={homepage} />
        </div>
      </div>
    </MediaDetailsLayout>
  );
};

export default MovieDetailsPage;
