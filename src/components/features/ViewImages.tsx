import { Button, Modal } from "@heroui/react";
import { FaImage } from "react-icons/fa6";
import type { CollectionImagesType } from "@/lib/validators";
import BorderButton from "../ui/BorderButton";
import ImageModalSection from "./ImageModalSection";

type ViewImagesProps = {
  imageData: CollectionImagesType;
  title: string;
};

const ViewImages = ({ imageData, title }: ViewImagesProps) => {
  return (
    <Modal>
      <BorderButton>
        View images
        <FaImage />
      </BorderButton>

      <Modal.Backdrop variant="blur">
        <Modal.Container scroll="outside">
          <Modal.Dialog className="border border-[#292f46] bg-black/40 text-white max-w-5xl">
            <Modal.CloseTrigger className="text-[#292f46]" />
            <Modal.Header className="text-4xl font-bold font-serif border-b border-[#292f46] pb-4">
              {title} images
            </Modal.Header>
            <Modal.Body>
              {imageData.backdrops.length > 0 && (
                <ImageModalSection
                  images={imageData.backdrops}
                  title={title}
                  heading="Backdrops"
                />
              )}

              {imageData.posters.length > 0 && (
                <ImageModalSection
                  images={imageData.posters}
                  title={title}
                  heading="Posters"
                />
              )}

              {(!(imageData.backdrops.length > 0) ||
                !(imageData.posters.length > 0)) && (
                <p className="text-gray-500">
                  😢 Sorry, no images available at the moment
                </p>
              )}
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

export default ViewImages;
