import z from "zod";
import type {
  CelebrityCategoryHeadings,
  Entity,
  MovieCategoryHeadings,
  TmdbApiCelebrityEndpoints,
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

export type TmdbApiCelebrityEndpointsType =
  (typeof TmdbApiCelebrityEndpoints)[keyof typeof TmdbApiCelebrityEndpoints];

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

export type ProductionCompany = z.infer<typeof ProductionCompaniesSchema>;

const ProductionCountriesSchema = z.object({
  iso_3166_1: z.string(),
  name: z.string(),
});

const GenreSchema = z.object({
  id: z.number(),
  name: z.string(),
});

const BaseMediaSchema = z.object({
  backdrop_path: z.string().nullable(),
  id: z.number(),
  original_language: z.string(),
  overview: z.string(),
  popularity: z.number(),
  poster_path: z.string().nullable(),
  vote_average: z.number(),
  vote_count: z.number(),
});

const BaseDetailsSchema = BaseMediaSchema.extend({
  adult: z.boolean(),
  genres: z.array(GenreSchema),
  homepage: z.string(),
  production_companies: z.array(ProductionCompaniesSchema),
  production_countries: z.array(ProductionCountriesSchema),
  spoken_languages: z.array(SpokenLanguagesSchema),
  status: z.string(),
  tagline: z.string(),
});

export const MovieSchema = BaseMediaSchema.extend({
  adult: z.boolean(),
  genre_ids: z.array(z.number()),
  original_title: z.string(),
  release_date: z.string(),
  title: z.string(),
  video: z.boolean(),
});

export const TvSchema = BaseMediaSchema.extend({
  first_air_date: z.string(),
  genre_ids: z.array(z.number()),
  name: z.string(),
  origin_country: z.array(z.string()),
  original_name: z.string(),
});

const createPaginatedResponseSchema = <
  T extends typeof MovieSchema | typeof TvSchema | typeof CelebritySchema,
>(
  schema: T,
) =>
  z.object({
    page: z.number(),
    results: z.array(schema),
    total_pages: z.number(),
    total_results: z.number(),
  });

export const MovieResponseSchema = createPaginatedResponseSchema(MovieSchema);

export type MovieType = z.infer<typeof MovieSchema>;

export type MovieResponseType = z.infer<typeof MovieResponseSchema>;

export const TvResponseSchema = createPaginatedResponseSchema(TvSchema);

export type TvType = z.infer<typeof TvSchema>;

export type TvResponseType = z.infer<typeof TvResponseSchema>;

const KnownForItemSchema = z.object({
  adult: z.boolean().optional(),
  backdrop_path: z.string().nullable().optional(),
  genre_ids: z.array(z.number()).optional(),
  id: z.number(),
  media_type: z.string(),
  original_language: z.string().optional(),
  original_title: z.string().optional(),
  original_name: z.string().optional(),
  overview: z.string().optional(),
  poster_path: z.string().nullable().optional(),
  release_date: z.string().optional(),
  first_air_date: z.string().optional(),
  title: z.string().optional(),
  name: z.string().optional(),
  video: z.boolean().optional(),
  vote_average: z.number().optional(),
  vote_count: z.number().optional(),
  origin_country: z.array(z.string()).optional(),
});

export const CelebritySchema = z.object({
  adult: z.boolean(),
  gender: z.number(),
  id: z.number(),
  known_for: z.array(KnownForItemSchema).nullish(),
  known_for_department: z.string().nullable(),
  name: z.string(),
  popularity: z.number(),
  profile_path: z.string().nullable(),
});

export const CelebrityResponseSchema =
  createPaginatedResponseSchema(CelebritySchema);

export type CelebrityType = z.infer<typeof CelebritySchema>;

export type CelebrityResponseType = z.infer<typeof CelebrityResponseSchema>;

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

const BelongsToCollectionSchema = z.object({
  id: z.number(),
  name: z.string(),
  poster_path: z.string().nullable(),
  backdrop_path: z.string().nullable(),
});

const CastMemberSchema = z.object({
  adult: z.boolean(), // Defaults to true
  gender: z.number(), // Defaults to 0
  id: z.number(), // Defaults to 0
  known_for_department: z.string(),
  name: z.string(),
  original_name: z.string(),
  popularity: z.number(), // Defaults to 0
  profile_path: z.string().nullable(),
  cast_id: z.number(), // Defaults to 0
  character: z.string(),
  credit_id: z.string(),
  order: z.number(), // Defaults to 0
});

const CrewMemberSchema = z.object({
  adult: z.boolean(), // Defaults to true
  gender: z.number(), // Defaults to 0
  id: z.number(), // Defaults to 0
  known_for_department: z.string(),
  name: z.string(),
  original_name: z.string(),
  popularity: z.number(), // Defaults to 0
  profile_path: z.string().nullable(),
  credit_id: z.string(),
  department: z.string(),
  job: z.string(),
});

export const CreditsSchema = z.object({
  id: z.number(), // Defaults to 0
  cast: z.array(CastMemberSchema),
  crew: z.array(CrewMemberSchema),
});

export type CreditsType = z.infer<typeof CreditsSchema>;

export const ExternalIdsSchema = z.object({
  id: z.number(), // Defaults to 0
  imdb_id: z.string().nullable(),
  wikidata_id: z.string().nullable(),
  facebook_id: z.string().nullable(),
  instagram_id: z.string().nullable(),
  twitter_id: z.string().nullable(),
});

export type ExternalIdsType = z.infer<typeof ExternalIdsSchema>;

export const MovieDetailsSchema = BaseDetailsSchema.extend({
  belongs_to_collection: BelongsToCollectionSchema.nullable(),
  budget: z.number(),
  imdb_id: z.string().nullable(),
  original_title: z.string(),
  release_date: z.string(),
  revenue: z.number(),
  runtime: z.number(),
  title: z.string(),
  video: z.boolean(),
});

export type MovieDetailsType = z.infer<typeof MovieDetailsSchema>;

export const TvDetailsSchema = BaseDetailsSchema.extend({
  created_by: z.array(CreatedBySchema),
  episode_run_time: z.array(z.number()),
  first_air_date: z.string(),
  in_production: z.boolean(),
  languages: z.array(z.string()),
  last_air_date: z.string().nullable(),
  last_episode_to_air: EpisodeSchema.nullable(),
  name: z.string(),
  next_episode_to_air: EpisodeSchema.nullable(),
  networks: z.array(NetworkSchema),
  number_of_episodes: z.number(),
  number_of_seasons: z.number(),
  origin_country: z.array(z.string()),
  original_name: z.string(),
  seasons: z.array(SeasonSchema),
  type: z.string(),
});

export type TvDetailsType = z.infer<typeof TvDetailsSchema>;

export const CelebrityDetailsSchema = z.object({
  adult: z.boolean(), // Defaults to true
  also_known_as: z.array(z.string()),
  biography: z.string(),
  birthday: z.string().nullable(),
  deathday: z.string().nullable(),
  gender: z.number(), // Defaults to 0
  homepage: z.string().nullable(),
  id: z.number(), // Defaults to 0
  imdb_id: z.string().nullable(),
  known_for_department: z.string().nullable(),
  name: z.string(),
  place_of_birth: z.string().nullable(),
  popularity: z.number(), // Defaults to 0
  profile_path: z.string().nullable(),
});

export type CelebrityDetailsType = z.infer<typeof CelebrityDetailsSchema>;

export const GenreResponseSchema = z.object({
  genres: z.array(GenreSchema),
});

export type GenreResponse = z.infer<typeof GenreResponseSchema>;

export type EntityType = (typeof Entity)[keyof typeof Entity];

export type MediaType = typeof Entity.Movie | typeof Entity.TV;

export type MovieCategoryHeadingsType =
  (typeof MovieCategoryHeadings)[keyof typeof MovieCategoryHeadings];

export type TvCategoryHeadingsType =
  (typeof TvCategoryHeadings)[keyof typeof TvCategoryHeadings];

export type CelebrityCategoryHeadingsType =
  (typeof CelebrityCategoryHeadings)[keyof typeof CelebrityCategoryHeadings];

export type MovieListEndpoint = Exclude<
  TmdbApiMovieEndpointsType,
  typeof TmdbApiMovieEndpoints.Latest
>;

export type TvListEndpoint = Exclude<
  TmdbApiTvEndpointsType,
  typeof TmdbApiTvEndpoints.Latest
>;

export type CelebrityListEndpoint = Exclude<
  TmdbApiCelebrityEndpointsType,
  typeof TmdbApiCelebrityEndpoints.Latest
>;
