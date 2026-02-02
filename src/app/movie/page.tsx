import MediaCategorySliderSection from "@/components/features/MediaCategorySliderSection";
import MediaDoubleSlider from "@/components/features/MediaDoubleSlider";
import { Media, MovieCategoryHeadings } from "@/lib/constants";

const MovieHomePage = () => {
  return (
    <>
      <MediaDoubleSlider type={Media.Movie} />
      {Object.values(MovieCategoryHeadings).map((heading) => (
        <MediaCategorySliderSection
          key={heading}
          heading={heading}
          type={Media.Movie}
        />
      ))}
    </>
  );
};

export default MovieHomePage;
