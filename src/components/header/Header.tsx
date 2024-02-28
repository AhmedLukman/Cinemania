"use client";

import React, { useState } from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
} from "@nextui-org/navbar";
import { Link } from "@nextui-org/link";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuItems = ["Login", "Sign up"];
  return (
    <header>
      <nav>
        <Navbar
          maxWidth="xl"
          isMenuOpen={isMenuOpen}
          shouldHideOnScroll
          onMenuOpenChange={setIsMenuOpen}
        >
          <NavbarContent>
            <NavbarMenuToggle
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              className="sm:hidden"
            />
            <NavbarBrand>
              <p className="font-bold text-inherit">Cinemania</p>
            </NavbarBrand>
          </NavbarContent>

          <NavbarContent className="hidden sm:flex gap-4" justify="center">
            <NavbarItem>
              <Link color="foreground" href="#">
                Text1
              </Link>
            </NavbarItem>
            <NavbarItem isActive>
              <Link href="#" aria-current="page">
                Text2
              </Link>
            </NavbarItem>
          </NavbarContent>
          <NavbarContent justify="end">
            <Input
              classNames={{
                base: "max-w-full sm:max-w-[10rem] h-10",
                mainWrapper: "h-full",
                input: "text-small",
                inputWrapper:
                  "h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20",
              }}
              placeholder="Search..."
              size="sm"
              type="search"
            />
            <NavbarItem className="hidden lg:flex">
              <Link href="#">Login</Link>
            </NavbarItem>
            <NavbarItem>
              <Button as={Link} color="primary" href="#" variant="flat">
                Sign Up
              </Button>
            </NavbarItem>
          </NavbarContent>
          <NavbarMenu>
            {menuItems.map((item, index) => (
              <NavbarMenuItem key={`${item}-${index}`}>
                <Link
                  color={
                    index === 2
                      ? "primary"
                      : index === menuItems.length - 1
                      ? "danger"
                      : "foreground"
                  }
                  className="w-full"
                  href="#"
                  size="lg"
                >
                  {item}
                </Link>
              </NavbarMenuItem>
            ))}
          </NavbarMenu>
        </Navbar>
      </nav>
    </header>
  );
};

export default Header;
