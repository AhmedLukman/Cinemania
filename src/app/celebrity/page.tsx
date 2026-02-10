import CategorySliderSection from "@/components/features/CategorySliderSection"
import { CelebrityCategoryHeadings, Media } from "@/lib/constants"

const CelebrityHomePage = () => {
  return (
    <>
      {Object.values(CelebrityCategoryHeadings).map((heading) => (
        <CategorySliderSection
          key={heading}
          heading={heading}
          type={Media.Celebrity}
        />
      ))}
    </>
  );
}

export default CelebrityHomePage