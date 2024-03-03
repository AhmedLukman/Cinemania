import React from "react";
import Slider from "react-slick";
import PosterContainer from "./PosterContainer";

const BigSlider = ({
  media,
  nav2,
  sliderRef1,
}: {
  media: TMovie[] | TTVShow[];
  nav2: any;
  sliderRef1: any;
}) => {
  return (
    <Slider
      className="h-[75vh]"
      arrows={false}
      asNavFor={nav2}
      ref={(slider) => (sliderRef1.current = slider)}
    >
      {media?.map((media) => (
        <PosterContainer
          key={media?.id}
          rating={media?.vote_average?.toFixed(1)}
          genres={media?.genre_ids}
          title={
            "original_name" in media
              ? media.original_name
              : media.original_title
          }
          year={
            "release_date" in media
              ? media.release_date.substring(0, 4)
              : media.first_air_date.substring(0, 4)
          }
          description={media?.overview}
          posterPath={media?.poster_path || ''}
          mediaId={media?.id}
          backdropPath={media?.backdrop_path || ''}
        />
      ))}
    </Slider>
  );
};

export default BigSlider;
