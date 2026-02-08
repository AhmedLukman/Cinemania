"use client";

import { FaArrowUp } from "react-icons/fa6";
import ScrollToTop from "react-scroll-to-top";

const ScrollToTopUI = () => {
  return (
    <ScrollToTop
      smooth
      component={<FaArrowUp />}
      className="hidden md:flex items-center justify-center shadow-lg! shadow-neutral-600! -mr-4"
    />
  );
};

export default ScrollToTopUI;
