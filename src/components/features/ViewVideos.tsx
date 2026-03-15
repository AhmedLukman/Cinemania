import { Button, Modal } from "@heroui/react";
import { FaPlay } from "react-icons/fa6";
import type { MediaVideosType } from "@/lib/validators";
import RippleUI from "../ui/RippleUI";

type ViewVideosProps = {
  videoData: MediaVideosType;
  title: string;
};

const ViewVideos = ({ videoData, title }: ViewVideosProps) => {
  const videos = videoData.results;

  return (
    <Modal>
      <Button
        variant="primary"
        className="bg-white rounded-xl text-black border-2 border-transparent 2xl:p-5"
      >
        Watch clips
        <RippleUI />
        <FaPlay />
      </Button>

      <Modal.Backdrop variant="blur">
        <Modal.Container scroll="outside">
          <Modal.Dialog className="border border-[#292f46] bg-black/40 text-white max-w-5xl">
            <Modal.CloseTrigger className="text-[#292f46]" />
            <Modal.Header className="text-4xl font-bold font-serif border-b border-[#292f46] pb-4">
              {title} clips
            </Modal.Header>
            <Modal.Body className="py-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {videos.length > 0 ? (
                  videos.map((video) => (
                    <div key={video.id} className="space-y-2">
                      <div className="aspect-video w-full relative">
                        <iframe
                          src={`https://www.youtube.com/embed/${video.key}`}
                          title={video.name}
                          className="absolute inset-0 w-full h-full rounded-lg"
                          allowFullScreen
                          loading="lazy"
                        />
                      </div>
                      <p className="text-sm font-medium line-clamp-1">
                        {video.name}
                      </p>
                      <p className="text-xs text-gray-400">
                        {video.type} • {video.site}
                      </p>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500 col-span-full">
                    😢 Sorry, no clips available at the moment
                  </p>
                )}
              </div>
            </Modal.Body>
            <Modal.Footer className="border-t border-[#292f46] pt-4">
              <Button variant="danger-soft" slot="close">
                Close
              </Button>
            </Modal.Footer>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  );
};

export default ViewVideos;
