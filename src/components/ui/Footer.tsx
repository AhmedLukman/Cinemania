import Image from "next/image";
import React from "react";

const Footer = () => {
  return (
    <footer className="py-10 px-20 flex justify-between items-center text-white">
      <h3 className="text-2xl italic">Cinemania</h3>
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
