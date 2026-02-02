import MediaDoubleSlider from "@/components/features/MediaDoubleSlider";
import MediaCategorySliderSection from "@/components/features/MovieCategorySliderSection";
import { Media, MovieCategoryHeadings } from "@/lib/constants";

const MovieHomePage = () => {
  return (
    <>
      <MediaDoubleSlider type={Media.Movie} />
      {Object.values(MovieCategoryHeadings).map((heading) => (
        <MediaCategorySliderSection key={heading} heading={heading} />
      ))}
    </>
  );
};

export default MovieHomePage;
