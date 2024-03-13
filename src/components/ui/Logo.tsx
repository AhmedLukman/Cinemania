import Image from "next/image";

const Logo = () => {
  return (
    <Image
      src={"/assets/images/cinemania-logo.png"}
      alt="Cinemania logo"
      width={100}
      height={100}
    />
  );
}

export default Logo