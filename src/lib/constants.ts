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

export const TmdbBackdropSizes = {
  W300: "/w300",
  W780: "/w780",
  W1280: "/w1280",
  ORIGINAL: "/original",
} as const;

export const TmdbPosterSizes = {
  W92: "/w92",
  W154: "/w154",
  W185: "/w185",
  W342: "/w342",
  W500: "/w500",
  W780: "/w780",
  ORIGINAL: "/original",
} as const;

export const TmdbApiGenreEndpoints = {
  Movie: "/genre/movie/list",
  TV: "/genre/tv/list",
} as const;

export const TmdbProfileSizes = {
  W45: "/w45",
  W185: "/w185",
  H632: "/h632",
  ORIGINAL: "/original",
} as const;

export const TmdbStillSizes = {
  W92: "/w92",
  W185: "/w185",
  W300: "/w300",
  ORIGINAL: "/original",
} as const;

export const TmdbLogoSizes = {
  W45: "/w45",
  W92: "/w92",
  W154: "/w154",
  W185: "/w185",
  W300: "/w300",
  W500: "/w500",
  ORIGINAL: "/original",
} as const;

export const Media = {
  Movie: "Movie",
  TV: "TV",
} as const;

export const MovieCategoryHeadings = {
  NowPlaying: "Now Playing",
  Trending: "Trending",
  Upcoming: "Upcoming",
  TopRated: "Top Rated",
  Latest: "Latest",
} as const;