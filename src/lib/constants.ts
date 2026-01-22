export const TMDB_BASE_URL = "https://api.themoviedb.org/3";

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
