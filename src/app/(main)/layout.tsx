import Footer from "@/components/ui/Footer";
import Header from "@/components/ui/header/Header";
import React, { PropsWithChildren } from "react";

const MainLayout = ({ children }: PropsWithChildren) => {
  return (
    <div className="flex flex-col justify-between min-h-[100svh]">
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  );
};

export default MainLayout;
