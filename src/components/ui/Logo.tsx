import Image from "next/image";

const Logo = () => {
  return (
    <Image
      src="/assets/icons/cinemania-logo.png"
      alt="Cinemania logo"
      priority
      width={100}
      height={27}
    />
  );
};

export default Logo;
