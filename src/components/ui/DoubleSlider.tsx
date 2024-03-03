"use client";

import React, { useState, useEffect, useRef } from "react";

import BigSlider from "./BigSlider";
import MiniSlider from "./MiniSlider";

const DoubleSlider = ({
  media,
}: {
  media: TMovie[] | TTVShow[];
}) => {
  const [nav1, setNav1] = useState<any>(null);
  const [nav2, setNav2] = useState<any>(null);
  let sliderRef1 = useRef<any>(null);
  let sliderRef2 = useRef<any>(null);

  useEffect(() => {
    setNav1(sliderRef1.current);
    setNav2(sliderRef2.current);
  }, []);

  return (
    <div className="slider-container">
      <BigSlider
        nav2={nav2}
        media={media}
        sliderRef1={sliderRef1}
      />
      <MiniSlider
        nav1={nav1}
        media={media}
        sliderRef2={sliderRef2}
      />
    </div>
  );
};

export default DoubleSlider;
