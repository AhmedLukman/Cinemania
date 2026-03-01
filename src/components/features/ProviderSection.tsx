import { cachedProviders } from "@/lib/serverService";
import { ProviderSelector } from "./ProviderSelector";

type ProviderSectionProps = {
  id: string;
};

const ProviderSection = async ({ id }: ProviderSectionProps) => {
  const { results } = await cachedProviders(`/movie/${id}/watch/providers`);
  const regionNames = new Intl.DisplayNames(["en"], { type: "region" });

  const countryCodes = Object.keys(results ?? {}).sort((a, b) =>
    (regionNames.of(a) ?? "").localeCompare(regionNames.of(b) ?? ""),
  );

  return (
    <section className="md:mx-5 lg:mx-10 mt-12 md:pb-10">
      <ProviderSelector results={results} countryCodes={countryCodes} />
    </section>
  );
};

export default ProviderSection;
