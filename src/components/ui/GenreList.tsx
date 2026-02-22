import { cachedGenres } from "@/lib/serverService";
import type { MediaType } from "@/lib/validators";

type GenreListProps =
  | { genreIds: number[]; type: MediaType; genres?: never }
  | { genres: { id: number; name: string }[]; genreIds?: never; type?: never };

const GenreList = async ({ genreIds, genres, type }: GenreListProps) => {
  let resolvedGenres: { id: number; name: string }[] | undefined;

  if (genres) {
    resolvedGenres = genres;
  } else if (genreIds && type) {
    const { genres: fetchedGenres } = (await cachedGenres(type)) || {};
    resolvedGenres = genreIds.map((id) => ({
      id,
      name: fetchedGenres?.find((g) => g.id === id)?.name || "Unknown",
    }));
  }

  if (!resolvedGenres?.length) return null;

  return (
    <ul className="gap-3 md:gap-5 flex flex-wrap text-sm mt-2 md:mt-6">
      {resolvedGenres.map((genre) => (
        <li key={genre.id} className="border rounded-md p-2 bg-black/40">
          {genre.name}
        </li>
      ))}
    </ul>
  );
};

export default GenreList;
