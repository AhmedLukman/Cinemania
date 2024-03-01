type TPopularMovieResult = {
  page: number;
  results: TPopularMovie[];
  total_pages: number;
  total_results: number;
};

type TPopularMovie = {
  adult: boolean;
  backdrop_path: string | null;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string | null;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
};

type TPosterContainer = {
  title: string;
  description: string;
  year: string;
  rating: string;
  genres: number[];
  movieId: number;
  posterPath: string;
  backdropPath: string;
};

type TPosterContent = {
  title: string;
  year: string;
  rating: string;
  genres: number[];
  description: string;
};

type TPosterSideImage = { posterPath: string; title: string };
