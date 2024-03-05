
import { CircularProgress } from "@nextui-org/react";
import React from "react";

const Loading = () => {
  return (
    <div className="absolute inset-0 flex justify-center items-center">
      <CircularProgress color="secondary" size="lg" aria-label="Loading..." />
    </div>
  );
};

export default Loading;
