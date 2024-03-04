import Footer from "@/components/ui/Footer";
import Header from "@/components/ui/Header";
import React, { PropsWithChildren } from "react";

const layout = ({ children }: PropsWithChildren) => {
  return (
    <div className="flex flex-col justify-between min-h-screen">
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  );
};

export default layout;
