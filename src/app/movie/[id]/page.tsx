import { Link, Tooltip } from "@heroui/react";
import type { IconType } from "react-icons";
import {
  FaFacebook,
  FaGlobe,
  FaImdb,
  FaInstagram,
  FaSquareXTwitter,
} from "react-icons/fa6";
import MediaDetailsLayout from "@/components/layout/MediaDetailsLayout";
import CompanyCard from "@/components/ui/CompanyCard";
import GenreList from "@/components/ui/GenreList";
import {
  cachedMovieCredits,
  cachedMovieDetails,
  cachedMovieLinks,
} from "@/lib/serverService";
import { getDirector } from "@/lib/utils";
import type { ExternalIdsType } from "@/lib/validators";

const linksConfig: {
  key: Exclude<keyof ExternalIdsType, "id"> | "homepage";
  icon: IconType;
  label: string;
  baseUrl: string;
}[] = [
  {
    key: "homepage",
    icon: FaGlobe,
    label: "Official Website",
    baseUrl: "",
  },
  {
    key: "twitter_id",
    icon: FaSquareXTwitter,
    label: "X",
    baseUrl: "https://x.com/",
  },
  {
    key: "instagram_id",
    icon: FaInstagram,
    label: "Instagram",
    baseUrl: "https://instagram.com/",
  },
  {
    key: "facebook_id",
    icon: FaFacebook,
    label: "Facebook",
    baseUrl: "https://facebook.com/",
  },
  {
    key: "imdb_id",
    icon: FaImdb,
    label: "IMDb",
    baseUrl: "https://www.imdb.com/title/",
  },
] as const;

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
  const credits = await cachedMovieCredits(`/movie/${id}/credits`);
  const links = await cachedMovieLinks(`/movie/${id}/external_ids`);
  const director = getDirector(credits);
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
          <div className="flex justify-center gap-4 pt-2">
            {linksConfig.map(({ key, icon: Icon, label, baseUrl }) => {
              const href =
                key === "homepage"
                  ? homepage
                  : links[key] && `${baseUrl}${links[key]}`;
              if (!href) return null;
              return (
                <Tooltip key={key} delay={0}>
                  <Tooltip.Trigger>
                    <Link
                      rel="noopener noreferrer"
                      target="_blank"
                      href={href}
                      aria-label={label}
                    >
                      <Icon className="w-5 h-5" />
                    </Link>
                  </Tooltip.Trigger>
                  <Tooltip.Content offset={5}>{label}</Tooltip.Content>
                </Tooltip>
              );
            })}
          </div>
        </div>
      </div>
    </MediaDetailsLayout>
  );
};

export default MovieDetailsPage;
