import MediaCategorySliderSection from "@/components/features/MovieCategorySliderSection";
import MovieDoubleSlider from "@/components/features/MovieDoubleSlider";
import { MovieCategoryHeadings } from "@/lib/constants";

const MovieHomePage = () => {
  return (
    <>
      <MovieDoubleSlider />
      <MediaCategorySliderSection heading={MovieCategoryHeadings.NowPlaying} />
    </>
  )
};

export default MovieHomePage;
