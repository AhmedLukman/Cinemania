"use client";

import {
  createContext,
  type Dispatch,
  type PropsWithChildren,
  type RefObject,
  type SetStateAction,
  use,
  useState,
} from "react";
import type Slider from "react-slick";
import useSliderSync from "@/hooks/useSliderSync";

type SliderContextType = {
  bigSliderRef: RefObject<Slider | null>;
  smallSliderNav: Slider | undefined;
  smallSliderRef: RefObject<Slider | null>;
  bigSliderNav: Slider | undefined;
  activeSlide: number;
  setActiveSlide: Dispatch<SetStateAction<number>>;
  handleBeforeChange: (current: number, next: number) => void;
};

const SliderContext = createContext<SliderContextType | undefined>(undefined);

export const SliderProvider = ({ children }: PropsWithChildren) => {
  const { bigSliderRef, smallSliderNav, smallSliderRef, bigSliderNav } =
    useSliderSync();
  const [activeSlide, setActiveSlide] = useState(0);

  const handleBeforeChange = (_: number, next: number) => {
    setActiveSlide(next);
  };

  const value = {
    bigSliderRef,
    smallSliderNav,
    smallSliderRef,
    bigSliderNav,
    activeSlide,
    setActiveSlide,
    handleBeforeChange,
  };

  return <SliderContext value={value}>{children}</SliderContext>;
};

export const useSliderContext = (): SliderContextType => {
  const context = use(SliderContext);
  if (context === undefined) {
    throw new Error("useSliderContext must be used within a SliderProvider");
  }
  return context;
};
