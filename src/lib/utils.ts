import type { RefObject } from "react";
import type Slider from "react-slick";
import type { Settings } from "react-slick";
import { TMDB_IMAGE_BASE_URL } from "./constants";
import type { TmdbImageSizes } from "./validators";

type SliderConfig = Settings & {
  ref?: RefObject<Slider | null>;
};

export const getBigSliderConfig = ({
  ref,
  asNavFor,
  beforeChange,
}: {
  ref: RefObject<Slider | null>;
  asNavFor: Slider | undefined;
  beforeChange?: (current: number, next: number) => void;
}): SliderConfig => ({
  arrows: false,
  dots: false,
  ref,
  asNavFor,
  beforeChange,
});

export const getImageUrl = (path: string, size: TmdbImageSizes) =>
  `${TMDB_IMAGE_BASE_URL}${size}${path}`;

export const isURL = (url: string) => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

export const getSmallSliderConfig = ({
  ref,
  asNavFor,
}: {
  asNavFor: Slider | undefined;
  ref: RefObject<Slider | null>;
}): SliderConfig => ({
  swipeToSlide: true,
  focusOnSelect: true,
  arrows: false,
  accessibility: false,
  autoplay: true,
  autoplaySpeed: 5000,
  responsive: [
    {
      breakpoint: 540, // <540 screen width
      settings: {
        slidesToShow: 2,
      },
    },
    {
      breakpoint: 800, // <800 screen width
      settings: {
        slidesToShow: 3,
      },
    },
  ],
  slidesToShow: 5,
  ref,
  asNavFor,
});

export const getCategorySliderConfig = (mediaLength: number): SliderConfig => ({
  infinite: mediaLength > 4,
  slidesToShow: 4,
  slidesToScroll: 4,
  dots: true,
  draggable: mediaLength > 4,
  autoplay: true,
  arrows: false,
  autoplaySpeed: 6000,
  responsive: [
    {
      breakpoint: 900,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
        infinite: mediaLength > 3,
      },
    },
    {
      breakpoint: 640,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
        infinite: mediaLength > 2,
        arrows: false,
      },
    },
  ],
});
