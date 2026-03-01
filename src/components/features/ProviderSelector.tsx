"use client";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  type Key,
  ListBox,
  Select,
} from "@heroui/react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import type z from "zod";
import { TmdbLogoSizes } from "@/lib/constants";
import { getImageUrl } from "@/lib/utils";
import type { ProvidersResponseSchema } from "@/lib/validators";

const renderProviderSection = (
  title: string,
  providers: { logo_path: string; provider_name: string }[] | null | undefined,
  link: string,
) => {
  return (
    <div className="mt-8">
      <h4 className="text-white px-5 md:px-20 pb-8 text-xl md:text-2xl font-serif font-bold capitalize">
        {title}
      </h4>
      <div className="flex flex-wrap gap-8 px-5 md:px-20">
        {providers && providers.length > 0 ? (
          providers.map((provider) => {
            const imageUrl = getImageUrl(provider.logo_path, TmdbLogoSizes.W185);
            return (
              <Link
                key={provider.provider_name}
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                className="relative w-12 h-12 md:w-16 md:h-16 rounded-xl overflow-hidden hover:scale-110 transition-transform"
              >
                <Image
                  alt={provider.provider_name}
                  className="object-cover"
                  fill
                  unoptimized
                  src={imageUrl}
                  sizes="(max-width: 768px) 48px, 64px"
                />
              </Link>
            );
          })
        ) : (
          <div className="w-full flex items-center h-12 md:h-16">
            <p className="text-gray-500">N/A</p>
          </div>
        )}
      </div>
    </div>
  );
};

type ProviderSelectorProps = {
  results: z.infer<typeof ProvidersResponseSchema>["results"];
  countryCodes: string[];
};

export const ProviderSelector = ({
  results,
  countryCodes,
}: ProviderSelectorProps) => {
  const [selectedCountry, setSelectedCountry] = useState<Key>(countryCodes[0]);
  const regionNames = new Intl.DisplayNames(["en"], { type: "region" });

  const currentProvider = results[selectedCountry];

  return (
    <>
      <div className="p-4 md:pb-14 flex justify-between items-center">
        <h3 className="z-10 text-white text-2xl md:text-3xl font-serif font-bold">
          Watch Providers
        </h3>
        <Select
          className="w-[256px]"
          value={selectedCountry}
          onChange={(val) => setSelectedCountry(val as Key)}
        >
          <Select.Trigger className="h-10 text-white rounded-xl border-2 transition-all duration-300 bg-transparent hover:opacity-75 flex gap-3 items-center 2xl:p-5 border-white">
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

      {currentProvider && (
        <div className="pb-10">
          {renderProviderSection(
            "stream",
            currentProvider.flatrate,
            currentProvider.link,
          )}
          {renderProviderSection(
            "buy",
            currentProvider.buy,
            currentProvider.link,
          )}
          {renderProviderSection(
            "rent",
            currentProvider.rent,
            currentProvider.link,
          )}
        </div>
      )}
    </>
  );
};
