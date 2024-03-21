import React from "react";
import MediaCard from "./MediaCard";

const AllCategoryMedia = ({
  id,
  media,
  heading,
}: {
  id?: string;
  media: TMovie[] | TTVShow[] | TCast[] | TCrew[];
  heading: string;
}) => {
  const buzz = id
    ? id?.startsWith("top")
      ? id
          .split("-")
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(" ")
      : id.charAt(0).toUpperCase() + id.slice(1)
    : "";

  return (
    <div className="md:p-14 pt-10">
      <h2 className="text-3xl font-serif text-white my-10 mx-2 md:mx-4">
        {buzz} {heading}s
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-y-8">
        {media?.map((media) => (
          <MediaCard key={media.id} {...media} />
        ))}
      </div>
    </div>
  );
};

export default AllCategoryMedia;
