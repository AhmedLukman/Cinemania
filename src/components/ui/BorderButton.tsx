import { buttonVariants } from "@heroui/react";
import Link from "next/link";
import RippleUI from "./RippleUI";

type BorderButtonProps = {
  href: string;
  children: React.ReactNode;
};

const BorderButton = ({ href, children }: BorderButtonProps) => {
  return (
    <Link
      href={href}
      className={buttonVariants({
        variant: "outline",
        className:
          "text-white rounded-xl border-2 transition-all duration-300 2xl:p-5 hover:bg-transparent relative hover:opacity-75",
      })}
    >
      <RippleUI />
      {children}
    </Link>
  );
};

export default BorderButton;
