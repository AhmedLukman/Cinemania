type TMediaBase = {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
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
  release_date: string;
};

type TTVShow = TMediaBase & {
  original_name: string;
  first_air_date: string;
};

type TMediaResponse<T> = {
  page: number;
  results: T[];
  total_pages: number;
  total_results: number;
};

// type TPosterContainer = {
//   title: string;
//   description: string;
//   year: string;
//   rating: string;
//   genres: number[] | { id: number; name: string }[];
//   mediaId: number;
//   posterPath: string;
//   backdropPath: string;
// };

// type TPosterContent = {
//   title: string;
//   year: string;
//   rating: number;
//   genres: number[] | { id: number; name: string }[];
//   description: string;
//   mediaId: number;
// };

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

// type TAllMedia = {
//   adult: boolean;
//   backdrop_path: string;
//   genre_ids:
//     | number[]
//     | {
//         id: number;
//         name: string;
//       }[];
//   id: number;
//   original_language: string;
//   overview: string;
//   popularity: number;
//   poster_path: string;
//   video: boolean;
//   vote_average: number;
//   vote_count: number;
//   belongs_to_collection: string;
//   budget: number;
//   homepage: string;
//   imdb_id: string;
//   original_title: string;
//   production_companies: {
//     id: number;
//     logo_path: string;
//     name: string;
//     origin_country: string;
//   }[];
//   production_countries: {
//     iso_3166_1: string;
//     name: string;
//   }[];
//   release_date: string;
//   revenue: number;
//   runtime: number;
//   spoken_languages: {
//     english_name: string;
//     iso_639_1: string;
//     name: string;
//   }[];
//   status: string;
//   tagline: string;
//   title: string;
// };

type TMovieDetailsResponse = TMediaBase & {
  belongs_to_collection: string;
  budget: number;
  homepage: string;
  imdb_id: string;
  original_title: string;
  genres: { id: number; name: string }[];
  production_companies: {
    id: number;
    logo_path: string;
    name: string;
    origin_country: string;
  }[];
  production_countries: {
    iso_3166_1: string;
    name: string;
  }[];
  release_date: string;
  revenue: number;
  runtime: number;
  spoken_languages: {
    english_name: string;
    iso_639_1: string;
    name: string;
  }[];
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
  profile_path: string; // Assuming profile_path can be null
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
  profile_path: string; // Assuming profile_path can be null
  credit_id: string;
  department: string;
  job: string;
}

type TMovieCreditsResponse = {
  id: number;
  cast: TCast[];
  crew: TCrew[];
}
