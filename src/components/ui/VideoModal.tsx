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

const VideoModal = ({ isOpen, onOpenChange, movieId, title }: TVideoModal) => {
  const [data, setData] = useState<TVideoResponse | null>(null);
  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(
        `https://api.themoviedb.org/3/movie/${movieId}/videos`,
        MOVIES_OPTIONS
      );
      if (res.ok) {
        const data = (await res.json()) as TVideoResponse;
        setData(data);
      } else if (!res.ok) {
        const res = await fetch(
          `https://api.themoviedb.org/3/tv/${movieId}/videos`,
          MOVIES_OPTIONS
        );
        const data = await res.json();
        setData(data);
      }
    };

    fetchData();
  }, [movieId]);

  const key = data?.results?.[0]?.key;
  const name = data?.results?.[0]?.name;

  return (
    <Modal
      backdrop="blur"
      //  bg-[#19172c]/70
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
              <iframe
                height="400"
                src={`https://www.youtube.com/embed/${key}`}
                className=" rounded-lg"
                title={name}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
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
