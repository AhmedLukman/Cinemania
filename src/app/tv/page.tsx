import CategorySliderSection from "@/components/features/CategorySliderSection";
import DoubleSlider from "@/components/features/DoubleSlider";
import { Entity, TvCategoryHeadings } from "@/lib/constants";

const TvHomePage = () => {
  return (
    <>
      <DoubleSlider type={Entity.TV} />
      {Object.values(TvCategoryHeadings).map((heading) => (
        <CategorySliderSection
          key={heading}
          heading={heading}
          type={Entity.TV}
        />
      ))}
    </>
  );
};

export default TvHomePage;
