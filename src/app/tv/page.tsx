import MediaCategorySliderSection from "@/components/features/MediaCategorySliderSection";
import MediaDoubleSlider from "@/components/features/MediaDoubleSlider";
import { Media, TvCategoryHeadings } from "@/lib/constants";

const TvHomePage = () => {
  return (
    <>
      <MediaDoubleSlider type={Media.TV} />
      {Object.values(TvCategoryHeadings).map((heading) => (
        <MediaCategorySliderSection
          key={heading}
          heading={heading}
          type={Media.TV}
        />
      ))}
    </>
  );
};

export default TvHomePage;
