import CategorySliderSection from "@/components/features/CategorySliderSection";
import DoubleSlider from "@/components/features/DoubleSlider";
import { Entity, MovieCategoryHeadings } from "@/lib/constants";

const MovieHomePage = () => {
  return (
    <>
      <DoubleSlider type={Entity.Movie} />
      {Object.values(MovieCategoryHeadings).map((heading) => (
        <CategorySliderSection
          key={heading}
          heading={heading}
          type={Entity.Movie}
        />
      ))}
    </>
  );
};

export default MovieHomePage;
