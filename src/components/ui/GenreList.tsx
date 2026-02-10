import type { Media } from "@/lib/constants";
import { cachedGenres } from "@/lib/serverService";
import type { MediaType } from "@/lib/validators";

type GenreListProps = {
  genreIds: number[];
  type: Exclude<MediaType, typeof Media.Celebrity>;
};

const GenreList = async ({ genreIds, type }: GenreListProps) => {
  const { genres } = (await cachedGenres(type)) || {};

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
