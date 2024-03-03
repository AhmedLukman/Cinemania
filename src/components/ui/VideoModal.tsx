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
import { MOVIES_OPTIONS } from "@/lib/constants";
import { usePathname } from "next/navigation";

const VideoModal = ({ isOpen, onOpenChange, mediaId, title }: TVideoModal) => {
  const [data, setData] = useState<TVideoResponse | null>(null);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const pathname = usePathname();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const mediaUrl = `https://api.themoviedb.org/3${pathname}/${mediaId}/videos`;

        const res = await fetch(mediaUrl, MOVIES_OPTIONS);
        if (!res.ok) throw new Error();
        const data = (await res.json()) as TVideoResponse;
        setData(data);
      } catch (error) {
        setError("Failed to fetch data");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [mediaId, pathname]);

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
              {data?.results.map((result) => (
                <iframe
                  key={result.id}
                  height="400"
                  src={`https://www.youtube.com/embed/${result.key}`}
                  className=" rounded-lg"
                  title={result.name}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              ))}
              {data?.results.length === 0 && (
                <p>😢 Sorry, no clips available at the moment</p>
              )}
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
