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

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuItems = ["Login", "Sign up"];
  return (
    <Navbar
      className=" fixed w-full bg-transparent"
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
          <h1 className=" text-2xl italic text-white">Cinemania</h1>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <ButtonGroup>
          <Button
            variant="ghost"
            className="text-white hover:text-black"
            as={Link}
            href="/movies"
          >
            Movies
          </Button>
          <Button as={Link} href="/tvshows">
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
          endContent={<FontAwesomeIcon icon={faMagnifyingGlass} className="text-[#cecece]" />}
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
