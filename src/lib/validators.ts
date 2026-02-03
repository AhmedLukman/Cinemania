import z from "zod";
import type {
  Media,
  MovieCategoryHeadings,
  TmdbApiGenreEndpoints,
  TmdbApiMovieEndpoints,
  TmdbApiTvEndpoints,
  TmdbBackdropSizes,
  TmdbLogoSizes,
  TmdbPosterSizes,
  TmdbProfileSizes,
  TmdbStillSizes,
  TvCategoryHeadings,
} from "@/lib/constants";

export type TmdbApiMovieEndpointsType =
  (typeof TmdbApiMovieEndpoints)[keyof typeof TmdbApiMovieEndpoints];

export type TmdbApiTvEndpointsType =
  (typeof TmdbApiTvEndpoints)[keyof typeof TmdbApiTvEndpoints];

export type TmdbBackdropSizesType =
  (typeof TmdbBackdropSizes)[keyof typeof TmdbBackdropSizes];

export type TmdbPosterSizesType =
  (typeof TmdbPosterSizes)[keyof typeof TmdbPosterSizes];

export type TmdbApiGenreEndpointsType =
  (typeof TmdbApiGenreEndpoints)[keyof typeof TmdbApiGenreEndpoints];

export type TmdbProfileSizesType =
  (typeof TmdbProfileSizes)[keyof typeof TmdbProfileSizes];

export type TmdbStillSizesType =
  (typeof TmdbStillSizes)[keyof typeof TmdbStillSizes];

export type TmdbLogoSizesType =
  (typeof TmdbLogoSizes)[keyof typeof TmdbLogoSizes];

export type TmdbImageSizes =
  | TmdbPosterSizesType
  | TmdbBackdropSizesType
  | TmdbProfileSizesType
  | TmdbStillSizesType
  | TmdbLogoSizesType;

export const MovieSchema = z.object({
  adult: z.boolean(), // Defaults to true
  backdrop_path: z.string().nullable(),
  genre_ids: z.array(z.number()),
  id: z.number(), // Defaults to 0
  original_language: z.string(),
  original_title: z.string(),
  overview: z.string(),
  popularity: z.number(), // Defaults to 0
  poster_path: z.string().nullable(),
  release_date: z.string(),
  title: z.string(),
  video: z.boolean(), // Defaults to true
  vote_average: z.number(), // Defaults to 0
  vote_count: z.number(), // Defaults to 0
});

export const MovieResponseSchema = z.object({
  page: z.number(), // Defaults to 0
  results: z.array(MovieSchema),
  total_pages: z.number(), // Defaults to 0
  total_results: z.number(), // Defaults to 0
});

export type MovieType = z.infer<typeof MovieSchema>;

export type MovieResponseType = z.infer<typeof MovieResponseSchema>;

export const TvSchema = z.object({
  backdrop_path: z.string().nullable(),
  first_air_date: z.string(),
  genre_ids: z.array(z.number()),
  id: z.number(), // Defaults to 0
  name: z.string(),
  origin_country: z.array(z.string()),
  original_language: z.string(),
  original_name: z.string(),
  overview: z.string(),
  popularity: z.number(), // Defaults to 0
  poster_path: z.string().nullable(),
  vote_average: z.number(), // Defaults to 0
  vote_count: z.number(), // Defaults to 0
});

export const TvResponseSchema = z.object({
  page: z.number(), // Defaults to 0
  results: z.array(TvSchema),
  total_pages: z.number(), // Defaults to 0
  total_results: z.number(), // Defaults to 0
});

export type TvType = z.infer<typeof TvSchema>;

export type TvResponseType = z.infer<typeof TvResponseSchema>;

const SpokenLanguagesSchema = z.object({
  english_name: z.string(),
  iso_639_1: z.string(),
  name: z.string(),
});

const ProductionCompaniesSchema = z.object({
  id: z.number(),
  logo_path: z.string().nullable(),
  name: z.string(),
  origin_country: z.string(),
});

const ProductionCountriesSchema = z.object({
  iso_3166_1: z.string(),
  name: z.string(),
});

const GenreSchema = z.object({
  id: z.number(),
  name: z.string(),
});

const CreatedBySchema = z.object({
  id: z.number(), // Defaults to 0
  credit_id: z.string(),
  name: z.string(),
  gender: z.number(), // Defaults to 0
  profile_path: z.string().nullable(),
});

const EpisodeSchema = z.object({
  id: z.number(), // Defaults to 0
  name: z.string(),
  overview: z.string(),
  vote_average: z.number(), // Defaults to 0
  vote_count: z.number(), // Defaults to 0
  air_date: z.string(),
  episode_number: z.number(), // Defaults to 0
  production_code: z.string(),
  runtime: z.number().nullable(), // Defaults to 0
  season_number: z.number(), // Defaults to 0
  show_id: z.number(), // Defaults to 0
  still_path: z.string().nullable(),
});

const NetworkSchema = z.object({
  id: z.number(), // Defaults to 0
  logo_path: z.string().nullable(),
  name: z.string(),
  origin_country: z.string(),
});

const SeasonSchema = z.object({
  air_date: z.string().nullable(),
  episode_count: z.number(), // Defaults to 0
  id: z.number(), // Defaults to 0
  name: z.string(),
  overview: z.string(),
  poster_path: z.string().nullable(),
  season_number: z.number(), // Defaults to 0
  vote_average: z.number(), // Defaults to 0
});

export const MovieDetailsSchema = z.object({
  adult: z.boolean(), // Defaults to true
  backdrop_path: z.string().nullable(),
  belongs_to_collection: z.string().nullable(),
  budget: z.number(), // Defaults to 0
  genres: z.array(GenreSchema),
  homepage: z.string(),
  id: z.number(), // Defaults to 0
  imdb_id: z.string().nullable(),
  original_language: z.string(),
  original_title: z.string(),
  overview: z.string(),
  popularity: z.number(), // Defaults to 0
  poster_path: z.string().nullable(),
  production_companies: z.array(ProductionCompaniesSchema),
  production_countries: z.array(ProductionCountriesSchema),
  release_date: z.string(),
  revenue: z.number(), // Defaults to 0
  runtime: z.number(), // Defaults to 0
  spoken_languages: z.array(SpokenLanguagesSchema),
  status: z.string(),
  tagline: z.string(),
  title: z.string(),
  video: z.boolean(), // Defaults to true
  vote_average: z.number(), // Defaults to 0
  vote_count: z.number(), // Defaults to 0
});

export type MovieDetailsType = z.infer<typeof MovieDetailsSchema>;

export const TvDetailsSchema = z.object({
  adult: z.boolean(), // Defaults to true
  backdrop_path: z.string().nullable(),
  created_by: z.array(CreatedBySchema),
  episode_run_time: z.array(z.number()),
  first_air_date: z.string(),
  genres: z.array(GenreSchema),
  homepage: z.string(),
  id: z.number(), // Defaults to 0
  in_production: z.boolean(), // Defaults to true
  languages: z.array(z.string()),
  last_air_date: z.string(),
  last_episode_to_air: EpisodeSchema,
  name: z.string(),
  next_episode_to_air: EpisodeSchema.nullable(),
  networks: z.array(NetworkSchema),
  number_of_episodes: z.number(), // Defaults to 0
  number_of_seasons: z.number(), // Defaults to 0
  origin_country: z.array(z.string()),
  original_language: z.string(),
  original_name: z.string(),
  overview: z.string(),
  popularity: z.number(), // Defaults to 0
  poster_path: z.string().nullable(),
  production_companies: z.array(ProductionCompaniesSchema),
  production_countries: z.array(ProductionCountriesSchema),
  seasons: z.array(SeasonSchema),
  spoken_languages: z.array(SpokenLanguagesSchema),
  status: z.string(),
  tagline: z.string(),
  type: z.string(),
  vote_average: z.number(), // Defaults to 0
  vote_count: z.number(), // Defaults to 0
});

export type TvDetailsType = z.infer<typeof TvDetailsSchema>;

export const GenreResponseSchema = z.object({
  genres: z.array(GenreSchema),
});

export type GenreResponse = z.infer<typeof GenreResponseSchema>;

export type MediaType = (typeof Media)[keyof typeof Media];

export type MovieCategoryHeadingsType =
  (typeof MovieCategoryHeadings)[keyof typeof MovieCategoryHeadings];

export type TvCategoryHeadingsType =
  (typeof TvCategoryHeadings)[keyof typeof TvCategoryHeadings];
