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

export const TmdbApiTvEndpoints = {
  Popular: "/tv/popular",
  Trending: "/trending/tv/day",
  TopRated: "/tv/top_rated",
  AiringToday: "/tv/airing_today",
  OnTheAir: "/tv/on_the_air",
  Latest: "/tv/latest",
} as const;

export const TmdbApiCelebrityEndpoints = {
  Popular: "/person/popular",
  Trending: "/trending/person/day",
  Latest: "/person/latest",
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

export const Entity = {
  Movie: "Movie",
  TV: "TV",
  Celebrity: "People",
} as const;

export const MovieCategoryHeadings = {
  NowPlaying: "Now Playing",
  Trending: "Trending",
  Upcoming: "Upcoming",
  TopRated: "Top Rated",
  Latest: "Latest",
} as const;

export const TvCategoryHeadings = {
  Trending: "Trending",
  TopRated: "Top Rated",
  AiringToday: "Airing Today",
  OnTheAir: "On The Air",
  Latest: "Latest",
} as const;

export const CelebrityCategoryHeadings = {
  Popular: "Popular",
  Trending: "Trending",
  Latest: "Latest",
} as const;
