import { MENU } from "@/lib/constants";
import { Divider, Link, NavbarMenu, NavbarMenuItem, cn } from "@nextui-org/react";
import { usePathname } from "next/navigation";
import React from "react";

const NavMenu = () => {
  const pathname = usePathname();
  return (
    <NavbarMenu>
      {MENU.map((item) => (
        <NavbarMenuItem key={item.route}>
          <Link
            className={cn("w-full", {
              "text-blue": !pathname.startsWith(item.route),
            })}
            href={item.route}
            size="lg"
          >
            {item.value}
          </Link>
        </NavbarMenuItem>
      ))}
      <Divider />
      <NavbarMenuItem>
        <Link color="foreground" size="lg" href="/sign-up">Sign Up</Link>
      </NavbarMenuItem>
    </NavbarMenu>
  );
};

export default NavMenu;
