import { Button } from "@heroui/react";
import Link from "next/link";

type BorderButtonProps = {
  href: string;
  children: React.ReactNode;
};

const BorderButton = ({ href, children }: BorderButtonProps) => {
  return (
    <Link href={href} className="no-underline">
      <Button
        variant="outline"
        className="text-white rounded-xl border-2 transition-all duration-300 2xl:p-5 hover:bg-transparent hover:opacity-75"
      >
        {children}
      </Button>
    </Link>
  );
};

export default BorderButton;
