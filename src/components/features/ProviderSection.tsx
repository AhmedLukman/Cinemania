import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  ListBox,
  Select,
} from "@heroui/react";
import { cachedProviders } from "@/lib/serverService";

type ProviderSectionProps = {
  id: string;
};

const ProviderSection = async ({ id }: ProviderSectionProps) => {
  const { results } = await cachedProviders(`/movie/${id}/watch/providers`);
  const regionNames = new Intl.DisplayNames(["en"], { type: "region" });

  const countryCodes = Object.keys(results).sort((a, b) =>
    (regionNames.of(a) ?? "").localeCompare(regionNames.of(b) ?? ""),
  );

  return (
    <section className="md:mx-5 lg:mx-10 mt-12 md:pb-10">
      <div className="p-4 md:pb-14 flex justify-between items-center">
        <h3 className="z-10 text-white text-2xl md:text-3xl font-serif font-bold">
          Watch Providers
        </h3>
        <Select className="w-[256px]" defaultValue={countryCodes[0]}>
          <Select.Trigger className="h-10">
            <Select.Value className="flex gap-3 items-center" />
            <Select.Indicator />
          </Select.Trigger>
          <Select.Popover>
            <ListBox>
              {countryCodes.map((code) => (
                <ListBox.Item key={code} id={code} textValue={code}>
                  <Avatar className="w-6 h-6">
                    <AvatarImage
                      src={`https://flagcdn.com/w80/${code.toLowerCase()}.webp`}
                    />
                    <AvatarFallback>{code}</AvatarFallback>
                  </Avatar>
                  {regionNames.of(code)}
                  <ListBox.ItemIndicator />
                </ListBox.Item>
              ))}
            </ListBox>
          </Select.Popover>
        </Select>
      </div>
    </section>
  );
};

export default ProviderSection;
