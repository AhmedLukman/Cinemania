import { FaCircleInfo } from "react-icons/fa6";
import type { MediaType } from "@/lib/validators";
import BorderButton from "../ui/BorderButton";
import GenreList from "../ui/GenreList";

type MediaDetailsProps = {
  title: string;
  releaseDate: string;
  voteAverage: number;
  genreIds: number[];
  overview: string;
  id: number;
  type: MediaType;
};

const MediaDetails = ({
  title,
  releaseDate,
  voteAverage,
  genreIds,
  overview,
  id,
  type,
}: MediaDetailsProps) => {
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
        <GenreList type={type} genreIds={genreIds} />
      </div>
      <p className="max-w-prose mt-10 2xl:text-lg line-clamp-6">
        {overview || "No overview available."}
      </p>
      <div className="mt-5 2xl:mt-8">
        <BorderButton href={`${type.toLowerCase()}/${id}`}>
          More details
          <FaCircleInfo />
        </BorderButton>
      </div>
    </div>
  );
};

export default MediaDetails;
