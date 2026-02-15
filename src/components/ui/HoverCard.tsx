"use client";

import { cn } from "@heroui/styles";
import { AnimatePresence, motion } from "framer-motion";
import { type ReactNode, useState } from "react";
import { useSliderContext } from "@/context/SliderContext";
import RippleUI from "./RippleUI";

const ANIMATE_DIRECTION = "right";

const IMAGE_VARIANTS = {
  initial: {
    x: 0,
    y: 0,
    opacity: 1,
  },
  exit: {
    x: 0,
    y: 0,
    opacity: 1,
  },
  top: {
    y: -20,
    opacity: 1,
  },
  bottom: {
    y: 20,
    opacity: 1,
  },
  left: {
    x: -20,
    opacity: 1,
  },
  right: {
    x: 20,
    opacity: 1,
  },
} as const;

const TEXT_VARIANTS = {
  initial: {
    y: 0,
    x: 0,
    opacity: 0,
  },
  exit: {
    y: 0,
    x: 0,
    opacity: 0,
  },
  top: {
    y: -20,
    opacity: 1,
  },
  bottom: {
    y: 20,
    opacity: 1,
  },
  left: {
    x: -20,
    opacity: 1,
  },
  right: {
    x: 20,
    opacity: 1,
  },
} as const;

const HoverCard = ({
  children,
  index,
  title,
}: {
  children: ReactNode;
  index: number;
  title: string;
}) => {
  const [hasMouseEntered, setHasMouseEntered] = useState(false);
  const { activeSlide } = useSliderContext();

  const handleMouseEnter = () => {
    setHasMouseEntered(true);
  };

  const handleMouseLeave = () => {
    setHasMouseEntered(false);
  };

  const isActive = index === activeSlide;


  return (
    <div className="h-[25svh] p-2 rounded-xl">
      <motion.div
        onMouseLeave={handleMouseLeave}
        onMouseEnter={handleMouseEnter}
        className={cn(
          "rounded-xl overflow-hidden group/card relative h-full w-full cursor-pointer",
          { "cursor-default": isActive },
        )}
      >
        <RippleUI />
        <AnimatePresence mode="wait">
          <motion.div
            className="relative h-full w-full"
            initial="initial"
            animate={
              isActive || hasMouseEntered ? ANIMATE_DIRECTION : "initial"
            }
            exit="exit"
          >
            <div
              className={cn(
                "absolute left-0 top-0 h-full bg-black/60 z-30 transition-all duration-300",
                isActive || hasMouseEntered ? "w-full " : "w-0",
              )}
            />
            <motion.div
              variants={IMAGE_VARIANTS}
              className="h-full w-full relative"
              transition={{
                duration: 0.2,
                ease: "easeOut",
              }}
            >
              {children}
            </motion.div>
            <motion.div
              variants={TEXT_VARIANTS}
              transition={{
                duration: 0.5,
                ease: "easeOut",
              }}
              className="text-white absolute bottom-4 w-full left-10 z-40"
              animate={
                isActive || hasMouseEntered ? ANIMATE_DIRECTION : "initial"
              }
            >
              <p className="font-bold text-xl max-w-[80%] xl:max-w-[88.5%]">
                {hasMouseEntered || isActive ? title : ""}
              </p>
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default HoverCard;
