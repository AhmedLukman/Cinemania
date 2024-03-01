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
  movieId: number
};

type TPosterSideImage = { posterPath: string; title: string };

type TVideoModal = {
  isOpen: boolean;
  onOpenChange: () => void;
  movieId: number;
  title: string
}

type TVideo = {
  iso_639_1: string;
  iso_3166_1: string;
  name: string;
  key: string;
  published_at: string;
  site: string;
  size: number;
  type: string;
  official: boolean;
  id: string;
}

type TVideoResponse = {
  id: number;
  results: TVideo[];
}
