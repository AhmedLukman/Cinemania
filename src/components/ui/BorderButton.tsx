import { Button, type ButtonProps, buttonVariants } from "@heroui/react";
import Link from "next/link";
import RippleUI from "./RippleUI";

type BorderButtonProps = {
  href?: string;
  children: React.ReactNode;
} & ButtonProps;

const BorderButton = ({ href, children, ...props }: BorderButtonProps) => {
  const className = buttonVariants({
    variant: "outline",
    className:
      "text-white rounded-xl border-2 transition-all duration-300 2xl:p-5 bg-transparent relative hover:opacity-75",
  });

  if (href) {
    return (
      <Link href={href} className={className}>
        <RippleUI />
        {children}
      </Link>
    );
  }

  return (
    <Button {...props} className={className}>
      <RippleUI />
      {children}
    </Button>
  );
};

export default BorderButton;
