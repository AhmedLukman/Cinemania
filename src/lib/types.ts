type TMediaBase = {
  adult: boolean;
  backdrop_path: string;
  id: number;
  original_language: string;
  overview: string;
  popularity: number;
  poster_path: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
};

type TMovie = TMediaBase & {
  original_title: string;
  genre_ids: number[];
  release_date: string;
};

type TTVShow = TMediaBase & {
  original_name: string;
  genre_ids: number[];
  first_air_date: string;
};

type TMediaResponse<T> = {
  page: number;
  results: T[];
  total_pages: number;
  total_results: number;
};

type TPosterSideImage = { posterPath: string; title: string };

type TVideoModal = {
  isOpen: boolean;
  onOpenChange: () => void;
  mediaId: number;
  title: string;
};

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
};

type TVideoResponse = {
  id: number;
  results: TVideo[];
};

type CreatedBy = {
  id: number;
  credit_id: string;
  name: string;
  gender: number;
  profile_path: string;
}

type Genre = {
  id: number;
  name: string;
}

type LastEpisodeToAir = {
  id: number;
  name: string;
  overview: string;
  episode_number: number;
  production_code: string;
  season_number: number;
  still_path: string;
  air_date: string;
}

type Network = {
  id: number;
  logo_path: string;
  name: string;
  origin_country: string;
}

type ProductionCompany = {
  id: number;
  logo_path: string;
  name: string;
  origin_country: string;
}

type ProductionCountry = {
  iso_3166_1: string;
  name: string;
}

type Season = {
  air_date: string;
  episode_count: number;
  id: number;
  name: string;
  overview: string;
  poster_path: string;
  season_number: number;
  vote_average: number;
}

type SpokenLanguage = {
  english_name: string;
  iso_639_1: string;
  name: string;
}


type TTVShowDetailsResponse = TMediaBase & {
  created_by: CreatedBy[];
  episode_run_time: number[];
  first_air_date: string;
  genres: Genre[];
  homepage: string;
  id: number;
  in_production: boolean;
  languages: string[];
  last_air_date: string;
  last_episode_to_air: LastEpisodeToAir;
  name: string;
  number_of_episodes: number;
  number_of_seasons: number;
  origin_country: string[];
  original_name: string;
  production_companies: ProductionCompany[];
  production_countries: ProductionCountry[];
  seasons: Season[];
  spoken_languages: SpokenLanguage[];
  status: string;
  tagline: string;
  type: string;
};

type TMovieDetailsResponse = TMediaBase & {
  belongs_to_collection: string;
  budget: number;
  homepage: string;
  imdb_id: string;
  original_title: string;
  genres: Genre[];
  production_companies: ProductionCompany[];
  production_countries: ProductionCountry[];
  release_date: string;
  revenue: number;
  runtime: number;
  spoken_languages: SpokenLanguage[];
  status: string;
  tagline: string;
  title: string;
};

type TCast = {
  adult: boolean;
  gender: number;
  id: number;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: string; 
  cast_id: number;
  character: string;
  credit_id: string;
  order: number;
}

type TCrew = {
  adult: boolean;
  gender: number;
  id: number;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: string; 
  credit_id: string;
  department: string;
  job: string;
}

type TMediaCreditsResponse = {
  id: number;
  cast: TCast[];
  crew: TCrew[];
}
