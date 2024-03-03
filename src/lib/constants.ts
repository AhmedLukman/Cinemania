export const MOVIES_OPTIONS = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyZmM1NzhlZmRjMTUxMWQzNmRhNzQ5OTFmM2MxY2JlOSIsInN1YiI6IjY1ZGRlY2JlYzkyYzVkMDE2MzQ3NWY0MiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.DqTP9erV2P9APWWUGBDG7N1jTx6Q26q9dADAy4aU1vY",
  },
};

export enum MoviesUrl {
  Popular = "https://api.themoviedb.org/3/movie/popular",
  Trending = "https://api.themoviedb.org/3/trending/movie",
  TopRated = "https://api.themoviedb.org/3/movie/top_rated",
  Upcoming = "https://api.themoviedb.org/3/movie/upcoming",
}

export enum TVShowsUrl {
  Popular = "https://api.themoviedb.org/3/tv/popular",
  Trending = "https://api.themoviedb.org/3/trending/tv/",
  TopRated = "https://api.themoviedb.org/3/tv/top_rated",
  Upcoming = "https://api.themoviedb.org/3/tv/on_the_air",
}

export const BASE_URL = "http://image.tmdb.org/t/p/";

export const IMAGE_SIZE = "original";

export const IMAGE_URL = `${BASE_URL}${IMAGE_SIZE}`;

export const GENRES = [
  { id: 10759, name: "Action & Adventure" },
  { id: 16, name: "Animation" },
  { id: 35, name: "Comedy" },
  { id: 80, name: "Crime" },
  { id: 99, name: "Documentary" },
  { id: 18, name: "Drama" },
  { id: 10751, name: "Family" },
  { id: 10762, name: "Kids" },
  { id: 9648, name: "Mystery" },
  { id: 10763, name: "News" },
  { id: 10764, name: "Reality" },
  { id: 10765, name: "Sci-Fi & Fantasy" },
  { id: 10766, name: "Soap" },
  { id: 10767, name: "Talk" },
  { id: 10768, name: "War & Politics" },
  { id: 37, name: "Western" },
  { id: 28, name: "Action" },
  { id: 12, name: "Adventure" },
  { id: 14, name: "Fantasy" },
  { id: 36, name: "History" },
  { id: 27, name: "Horror" },
  { id: 10402, name: "Music" },
  { id: 10749, name: "Romance" },
  { id: 878, name: "Science Fiction" },
  { id: 10770, name: "TV Movie" },
  { id: 53, name: "Thriller" },
  { id: 10752, name: "War" },
];
