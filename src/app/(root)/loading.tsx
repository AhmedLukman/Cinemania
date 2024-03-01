
import { CircularProgress } from "@nextui-org/react";
import React from "react";

const Loading = () => {
  return (
    <div className="h-screen bg-purple-50 w-screen flex items-center justify-center">
      <CircularProgress color="secondary" size="lg" aria-label="Loading..." />
    </div>
  );
};

export default Loading;
