import CategorySliderSection from "@/components/features/CategorySliderSection";
import { CelebrityCategoryHeadings, Entity } from "@/lib/constants";

const CelebrityHomePage = () => {
  return (
    <>
      {Object.values(CelebrityCategoryHeadings).map((heading) => (
        <CategorySliderSection
          key={heading}
          heading={heading}
          type={Entity.Celebrity}
        />
      ))}
    </>
  );
};

export default CelebrityHomePage;
