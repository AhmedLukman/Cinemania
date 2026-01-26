import {
  cachedFetchMovieGenres,
  cachedFetchTvGenres,
} from "@/lib/serverService";

type GenreListProps = {
  genreIds: number[];
  type: "movie" | "tv";
};

const GenreList = async ({ genreIds, type }: GenreListProps) => {
  const { genres } =
    type === "movie"
      ? (await cachedFetchMovieGenres()) || {}
      : (await cachedFetchTvGenres()) || {};

  return (
    <ul className="gap-3 md:gap-5 flex flex-wrap text-sm mt-2 md:mt-6">
      {genreIds.map((genre) => (
        <li key={genre} className="border rounded-md p-2 bg-black/40">
          {genres?.find((g) => g.id === genre)?.name || "Unknown"}
        </li>
      ))}
    </ul>
  );
};

export default GenreList;
