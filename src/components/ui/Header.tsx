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
import { Button, ButtonGroup } from "@nextui-org/button";
import { Input } from "@nextui-org/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { usePathname } from "next/navigation";
import Image from "next/image";
import Logo from "./Logo";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuItems = ["Login", "Sign up"];
  const pathname = usePathname();
  return (
    <Navbar
      className=" fixed w-full z-50 bg-transparent"
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
          <Logo />
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <ButtonGroup>
          <Button
            variant={pathname.startsWith("/movie") ? "ghost" : "faded"}
            className={
              pathname.startsWith("/movie")
                ? "text-white hover:text-black"
                : "text-black"
            }
            as={Link}
            href="/movie"
          >
            Movies
          </Button>
          <Button
            className={
              pathname.startsWith("/tv")
                ? "text-white hover:text-black"
                : "text-black"
            }
            as={Link}
            variant={pathname.startsWith("/tv") ? "ghost" : "faded"}
            href="/tv"
          >
            People
          </Button>
          <Button
            className={
              pathname.startsWith("/tv")
                ? "text-white hover:text-black"
                : "text-black"
            }
            as={Link}
            variant={pathname.startsWith("/tv") ? "ghost" : "faded"}
            href="/tv"
          >
            TV Shows
          </Button>
        </ButtonGroup>
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
          endContent={
            <FontAwesomeIcon
              icon={faMagnifyingGlass}
              className="text-[#cecece]"
            />
          }
        />
        <NavbarItem>
          <Button as={Link} href="#" variant="flat" className="text-white">
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
  );
};

export default Header;
