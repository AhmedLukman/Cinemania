"use client";

import React, { useEffect, useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "@nextui-org/react";
import { usePathname } from "next/navigation";
import { fetchMedia, getPath } from "@/lib/utils";

const VideoModal = ({ isOpen, onOpenChange, mediaId, title }: TVideoModal) => {
  const [videoData, setVideoData] = useState<TVideo[] | null>(null);
  const [error, setError] = useState("");

  const pathname = usePathname();

  const path = getPath(pathname, mediaId);

  useEffect(() => {
    const fetchVideoData = async () => {
      try {
        const mediaUrl = `https://api.themoviedb.org/3${path}/videos`;
        const videoRes = (await fetchMedia(mediaUrl)) as TVideoResponse;
        setVideoData(videoRes.results);
      } catch (error) {
        setError("Failed to fetch data");
      }
    };

    fetchVideoData();
  }, [mediaId, path]);

  return (
    <Modal
      scrollBehavior="outside"
      backdrop="blur"
      classNames={{
        body: "py-6",
        base: "border-[#292f46] bg-[#000]/40 text-white",
        header: "border-b-[1px] border-[#292f46]",
        footer: "border-t-[1px] border-[#292f46]",
      }}
      size="3xl"
      isOpen={isOpen}
      onOpenChange={onOpenChange}
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="text-4xl font-serif">{title}</ModalHeader>
            <ModalBody>
              {videoData?.map((video) => (
                <iframe
                  key={video.id}
                  height="400"
                  src={`https://www.youtube.com/embed/${video.key}`}
                  className=" rounded-lg"
                  title={video.name}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              ))}
              {!error && videoData?.length === 0 && (
                <p>😢 Sorry, no clips available at the moment</p>
              )}
              {error && <p className="text-red-500">Oops, an error occurred</p>}
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="light" onPress={onClose}>
                Close
              </Button>
              <Button onPress={onClose}>More details</Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default VideoModal;
