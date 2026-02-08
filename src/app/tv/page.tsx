import CategorySliderSection from "@/components/features/CategorySliderSection";
import DoubleSlider from "@/components/features/DoubleSlider";
import { Media, TvCategoryHeadings } from "@/lib/constants";

const TvHomePage = () => {
  return (
    <>
      <DoubleSlider type={Media.TV} />
      {Object.values(TvCategoryHeadings).map((heading) => (
        <CategorySliderSection
          key={heading}
          heading={heading}
          type={Media.TV}
        />
      ))}
    </>
  );
};

export default TvHomePage;
