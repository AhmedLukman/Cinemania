import Header from "@/components/header/Header";
import React, { PropsWithChildren } from "react";

const layout = ({ children }: PropsWithChildren) => {
  return (
    <div>
      <Header />
      <main>{children}</main>
    </div>
  );
};

export default layout;
