import { Button, Link } from "@heroui/react";
import { FaCircleInfo } from "react-icons/fa6";
import GenreList from "../ui/GenreList";

type MovieDetailsProps = {
  title: string;
  releaseDate: string;
  voteAverage: number;
  genreIds: number[];
  overview: string;
  id: number;
};

const MovieDetails = ({
  title,
  releaseDate,
  voteAverage,
  genreIds,
  overview,
  id,
}: MovieDetailsProps) => {
  return (
    <div className="lg:w-7/12 xl:w-8/12 pt-24">
      <h2 className="text-3xl xl:text-5xl font-bold font-serif md:max-w-prose">
        {title}
      </h2>
      <div className="flex justify-between items-center gap-5 md:gap-0 flex-wrap md:max-w-prose">
        <div className="space-x-5 text-sm mt-4">
          <time dateTime={releaseDate.substring(0, 4)}>
            {releaseDate.substring(0, 4)}
          </time>
          <span className="border rounded-md p-1">
            {voteAverage?.toFixed(1)}
          </span>
        </div>
        <GenreList type="movie" genreIds={genreIds} />
      </div>
      <p className="max-w-prose mt-10 2xl:text-lg line-clamp-6">
        {overview || "No overview available."}
      </p>
      <div className="mt-5 2xl:mt-8">
        <Link href={`movie/${id}`} className="no-underline">
          <Button
            variant="outline"
            className="text-white rounded-xl border-2 transition-all duration-300 2xl:p-5 hover:bg-transparent hover:opacity-75"
          >
            More details
            <FaCircleInfo />
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default MovieDetails;
