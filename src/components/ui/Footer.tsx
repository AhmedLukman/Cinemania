import Image from "next/image";
import React from "react";
import Logo from "./Logo";

const Footer = () => {
  return (
    <footer className="px-10 h-[15vh] md:px-20 flex justify-between items-center text-white">
      <Logo />
      <Image
        alt="TMDB logo"
        src={
          "https://www.themoviedb.org/assets/2/v4/logos/v2/blue_square_1-5bdc75aaebeb75dc7ae79426ddd9be3b2be1e342510f8202baf6bffa71d7f5c4.svg"
        }
        width={100}
        height={50}
      />
    </footer>
  );
};

export default Footer;
