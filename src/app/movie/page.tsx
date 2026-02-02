import MediaCategorySliderSection from "@/components/features/MovieCategorySliderSection";
import MovieDoubleSlider from "@/components/features/MovieDoubleSlider";
import { Media, MovieCategoryHeadings } from "@/lib/constants";

const MovieHomePage = () => {
  return (
    <>
      <MovieDoubleSlider type={Media.Movie}/>
      {Object.values(MovieCategoryHeadings).map((heading) => (
        <MediaCategorySliderSection key={heading} heading={heading} />
      ))}
    </>
  );
};

export default MovieHomePage;
