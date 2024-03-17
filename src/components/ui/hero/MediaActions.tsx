"use client";

import { faHeart as faFilledHeart } from "@fortawesome/free-solid-svg-icons";
import { faPlay } from "@fortawesome/free-solid-svg-icons/faPlay";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { faCircleInfo } from "@fortawesome/free-solid-svg-icons/faCircleInfo";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Link, useDisclosure } from "@nextui-org/react";
import React, { useState } from "react";
import VideoModal from "./VideoModal";
import { usePathname } from "next/navigation";

const MediaActions = ({id, title}: {id: number, title: string}) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [isIconClicked, setIsIconClicked] = useState(false);
  const pathname = usePathname();
  return (
    <div className="mt-16">
      <Button onPress={onOpen} endContent={<FontAwesomeIcon icon={faPlay} />}>
        Watch Clips
      </Button>
      <VideoModal
        mediaId={id}
        title={title}
        isOpen={isOpen}
        onOpenChange={onOpenChange}
      />
      <Button
        as={Link}
        href={`${pathname}/${id}`}
        variant="bordered"
        className="text-white ml-3"
        endContent={<FontAwesomeIcon icon={faCircleInfo} />}
      >
        More details
      </Button>
      <FontAwesomeIcon
        onClick={() => setIsIconClicked((prevState) => !prevState)}
        icon={isIconClicked ? faFilledHeart : faHeart}
        className="ml-5 cursor-pointer"
        size="xl"
      />
      <span className="ml-2">168</span>
    </div>
  );
};

export default MediaActions;
