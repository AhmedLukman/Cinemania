import Image from "next/image";
import React from "react";

const NotFound = () => {
  return (
    <div className="w-full h-full text-white">
      <Image
        src={"/assets/images/venom404.jpeg"}
        alt="Venom"
        className=" object-cover object-center"
        layout="fill"
      />
      <div className="absolute bottom-[5%] md:bottom-[12%] flex justify-center items-center w-full px-5 text-xl ">
        <h3 className="max-w-md text-center">
          Sorry😢, the movie category could not be found, please try again
        </h3>
      </div>
    </div>
  );
};

export default NotFound;
