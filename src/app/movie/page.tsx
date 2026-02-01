import MediaCategorySliderSection from "@/components/features/MovieCategorySliderSection";
import MovieDoubleSlider from "@/components/features/MovieDoubleSlider";
import { MovieCategoryHeadings } from "@/lib/constants";

const MovieHomePage = () => {
  return (
    <>
      <MovieDoubleSlider />
      <MediaCategorySliderSection heading={MovieCategoryHeadings.NowPlaying} />
      <MediaCategorySliderSection heading={MovieCategoryHeadings.Trending} />
      <MediaCategorySliderSection heading={MovieCategoryHeadings.TopRated} />
      <MediaCategorySliderSection heading={MovieCategoryHeadings.Upcoming} />
    </>
  )
};

export default MovieHomePage;
