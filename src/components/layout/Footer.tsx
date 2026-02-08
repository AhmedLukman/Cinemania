import Image from "next/image";
import Logo from "../ui/Logo";

const Footer = () => {
  return (
    <footer className="p-10 md:px-20 flex justify-between items-center text-white">
      <Logo />
      <Image
        alt="TMDB logo"
        src="/assets/icons/tmdb-logo.svg"
        width={100}
        height={43}
      />
    </footer>
  );
};

export default Footer;
