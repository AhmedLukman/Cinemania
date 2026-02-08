import CategorySliderSection from "@/components/features/CategorySliderSection";
import DoubleSlider from "@/components/features/DoubleSlider";
import { Media, MovieCategoryHeadings } from "@/lib/constants";

const MovieHomePage = () => {
  return (
    <>
      <DoubleSlider type={Media.Movie} />
      {Object.values(MovieCategoryHeadings).map((heading) => (
        <CategorySliderSection
          key={heading}
          heading={heading}
          type={Media.Movie}
        />
      ))}
    </>
  );
};

export default MovieHomePage;
