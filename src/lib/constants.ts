export const TMDB_BASE_URL = "https://api.themoviedb.org/3";

export const TMDB_IMAGE_BASE_URL = "https://image.tmdb.org/t/p";

export const TmdbApiMovieEndpoints = {
  Popular: "/movie/popular",
  NowPlaying: "/movie/now_playing",
  Trending: "/trending/movie/day",
  Upcoming: "/movie/upcoming",
  TopRated: "/movie/top_rated",
  Latest: "/movie/latest",
} as const;

export type TmdbApiMovieEndpointsType =
  (typeof TmdbApiMovieEndpoints)[keyof typeof TmdbApiMovieEndpoints];

export const TmdbBackdropSizes = {
  W300: "/w300",
  W780: "/w780",
  W1280: "/w1280",
  ORIGINAL: "/original",
} as const;

export type TmdbBackdropSizesType =
  (typeof TmdbBackdropSizes)[keyof typeof TmdbBackdropSizes];

export const TmdbPosterSizes = {
  W92: "/w92",
  W154: "/w154",
  W185: "/w185",
  W342: "/w342",
  W500: "/w500",
  W780: "/w780",
  ORIGINAL: "/original",
} as const;

export type TmdbPosterSizesType =
  (typeof TmdbPosterSizes)[keyof typeof TmdbPosterSizes];

export const TmdbApiGenreEndpoints = {
  MovieGenres: "/genre/movie/list",
  TvGenres: "/genre/tv/list",
} as const;

export type TmdbApiGenreEndpointsType =
  (typeof TmdbApiGenreEndpoints)[keyof typeof TmdbApiGenreEndpoints];

export const TmdbProfileSizes = {
  W45: "/w45",
  W185: "/w185",
  H632: "/h632",
  ORIGINAL: "/original",
} as const;

export type TmdbProfileSizesType =
  (typeof TmdbProfileSizes)[keyof typeof TmdbProfileSizes];

export const TmdbStillSizes = {
  W92: "/w92",
  W185: "/w185",
  W300: "/w300",
  ORIGINAL: "/original",
} as const;

export type TmdbStillSizesType =
  (typeof TmdbStillSizes)[keyof typeof TmdbStillSizes];

export const TmdbLogoSizes = {
  W45: "/w45",
  W92: "/w92",
  W154: "/w154",
  W185: "/w185",
  W300: "/w300",
  W500: "/w500",
  ORIGINAL: "/original",
} as const;

export type TmdbLogoSizesType =
  (typeof TmdbLogoSizes)[keyof typeof TmdbLogoSizes];
