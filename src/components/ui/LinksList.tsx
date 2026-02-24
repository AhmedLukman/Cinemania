import { Link, Tooltip } from "@heroui/react";
import {
  FaFacebook,
  FaGlobe,
  FaImdb,
  FaInstagram,
  FaSquareXTwitter,
} from "react-icons/fa6";
import type { ExternalIdsType } from "@/lib/validators";

const linksConfig = [
  {
    key: "homepage",
    icon: FaGlobe,
    label: "Official Website",
    baseUrl: "",
  },
  {
    key: "twitter_id",
    icon: FaSquareXTwitter,
    label: "X",
    baseUrl: "https://x.com/",
  },
  {
    key: "instagram_id",
    icon: FaInstagram,
    label: "Instagram",
    baseUrl: "https://instagram.com/",
  },
  {
    key: "facebook_id",
    icon: FaFacebook,
    label: "Facebook",
    baseUrl: "https://facebook.com/",
  },
  {
    key: "imdb_id",
    icon: FaImdb,
    label: "IMDb",
    baseUrl: "https://www.imdb.com/title/",
  },
] as const;

type LinksListProps = {
  links: Omit<ExternalIdsType, "id"> | null;
  homepage: string;
};

const LinksList = ({ links, homepage }: LinksListProps) => {
  if (!links) return null;

  return (
    <div className="flex justify-center gap-4 pt-2">
      {linksConfig.map(({ key, icon: Icon, label, baseUrl }) => {
        const href =
          key === "homepage"
            ? homepage
            : links[key as keyof typeof links] &&
              `${baseUrl}${links[key as keyof typeof links]}`;
        if (!href) return null;
        return (
          <Tooltip key={key} delay={0}>
            <Tooltip.Trigger>
              <Link
                rel="noopener noreferrer"
                target="_blank"
                href={href}
                aria-label={label}
              >
                <Icon className="w-5 h-5" />
              </Link>
            </Tooltip.Trigger>
            <Tooltip.Content offset={5}>{label}</Tooltip.Content>
          </Tooltip>
        );
      })}
    </div>
  );
};

export default LinksList;
