import z from "zod";
import type {
  Media,
  TmdbApiGenreEndpoints,
  TmdbApiMovieEndpoints,
  TmdbBackdropSizes,
  TmdbLogoSizes,
  TmdbPosterSizes,
  TmdbProfileSizes,
  TmdbStillSizes,
} from "@/lib/constants";

export type TmdbApiMovieEndpointsType =
  (typeof TmdbApiMovieEndpoints)[keyof typeof TmdbApiMovieEndpoints];

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
  backdrop_path: z.string(),
  genre_ids: z.array(z.number()),
  id: z.number(), // Defaults to 0
  original_language: z.string(),
  original_title: z.string(),
  overview: z.string(),
  popularity: z.number(), // Defaults to 0
  poster_path: z.string(),
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

export const GenreResponseSchema = z.object({
  genres: z.array(
    z.object({
      id: z.number(),
      name: z.string(),
    }),
  ),
});

export type GenreResponse = z.infer<typeof GenreResponseSchema>;

export type MediaType = (typeof Media)[keyof typeof Media];
