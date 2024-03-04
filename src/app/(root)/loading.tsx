
import { CircularProgress } from "@nextui-org/react";
import React from "react";

const Loading = () => {
  return (
    <div className="h-screen bg-gradient-to-b from-[#141414] to-black w-screen flex items-center justify-center">
      <CircularProgress color="secondary" size="lg" aria-label="Loading..." />
    </div>
  );
};

export default Loading;
