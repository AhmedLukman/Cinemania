"use client";

import React from "react";
import {
  faFacebook,
  faImdb,
  faInstagram,
  faXTwitter,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Image,
  Link,
  cn,
  useDisclosure,
} from "@nextui-org/react";
import { getImageUrl } from "@/lib/utils";
import { TPersonImageResponse, TPersonLink } from "@/lib/types";
import { SocialLink } from "../SocialLink";
import PersonImageModal from "./PersonImageModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage } from "@fortawesome/free-solid-svg-icons";

const ProfileCard = ({
  profilePath,
  name,
  homepage,
  links: { twitter_id, instagram_id, youtube_id, imdb_id },
  className,
  imageResponse,
}: {
  profilePath: string;
  name: string;
  homepage: string;
  links: TPersonLink;
  className?: string;
  imageResponse: TPersonImageResponse;
}) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  return (
    <Card  className={cn("bg-white shadow-xl shadow-gray-600", className)}>
      <CardBody className="overflow-visible p-0">
        <Image
          shadow="sm"
          radius="lg"
          alt={""}
          className=" w-96 h-96 md:h-[60vh] object-cover"
          src={getImageUrl(profilePath)}
        />
      </CardBody>
      <CardFooter className="text-small justify-between">
        <div className="flex gap-2 items-center jsutify-center">
          <h1 className="text-xl font-bold">{name}</h1>
          <Button isIconOnly onPress={onOpen}>
            <FontAwesomeIcon icon={faImage} />
          </Button>
        </div>
        <div className="space-x-3 flex items-center">
          <SocialLink
            id={twitter_id}
            baseUrl="www.x.com"
            icon={faXTwitter}
            type="Person"
          />
          <SocialLink
            id={instagram_id}
            baseUrl="www.instagram.com"
            icon={faInstagram}
            type="Person"
          />
          <SocialLink
            id={youtube_id}
            baseUrl="www.youtube.com"
            icon={faYoutube}
            type="Person"
          />
          <SocialLink
            id={imdb_id}
            baseUrl="www.imdb.com"
            type="Person"
            icon={faImdb}
          />
          <PersonImageModal
            isOpen={isOpen}
            onOpenChange={onOpenChange}
            title={name}
            imageResponse={imageResponse}
          />
          {homepage && (
            <Link
              className="text-black/60 ml-2"
              title="Visit homepage"
              isExternal
              href={homepage}
              showAnchorIcon
            />
          )}
        </div>
      </CardFooter>
    </Card>
  );
};

export default ProfileCard;
