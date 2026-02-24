import { Card, Link, Tooltip } from "@heroui/react";
import Image from "next/image";
import { TmdbLogoSizes } from "@/lib/constants";
import { getImageUrl } from "@/lib/utils";
import type { ProductionCompany } from "@/lib/validators";
import RippleUI from "./RippleUI";

type CompanyCardProps = {
  company: ProductionCompany & { logo_path: string | null };
};

const CompanyCard = ({
  company: { name, logo_path, id, origin_country },
}: CompanyCardProps) => (
  <Tooltip delay={0}>
    <Tooltip.Trigger>
      <Link
        rel="noopener noreferrer"
        target="_blank"
        href={`https://www.themoviedb.org/company/${id}`} // TODO: Consider linking to Cinemania's own company page if implemented in the future
        aria-label={name}
      >
        <Card className="h-6 w-12 xl:h-9 xl:w-15 2xl:h-12 2xl:w-24">
          <Image
            src={logo_path ? getImageUrl(logo_path, TmdbLogoSizes.W154) : ""} // TODO: Add placeholder image for companies without logo
            alt={name}
            fill
            className="object-contain p-2"
          />
          <RippleUI />
        </Card>
      </Link>
    </Tooltip.Trigger>
    <Tooltip.Content>{name} ({origin_country})</Tooltip.Content>
  </Tooltip>
);

export default CompanyCard;
