'use client'

import { CircularProgress } from "@nextui-org/react";
import React, { useEffect, useState } from "react";

const Loading = () => {
  const [value, setValue] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setValue((v) => (v >= 100 ? 0 : v + 10));
    }, 500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-screen z-50 w-screen flex items-center justify-center">
      <CircularProgress
        aria-label="Loading..."
        size="lg"
        value={value}
        showValueLabel={true}
      />
    </div>
  );
};

export default Loading;
