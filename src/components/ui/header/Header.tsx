"use client";

import React, { useState } from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarMenuToggle,
} from "@nextui-org/navbar";
import Logo from "../Logo";
import NavButtonGroup from "./NavButtonGroup";
import NavEnd from "./NavEnd";
import NavMenu from "./NavMenu";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
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
          className="sm:hidden text-white"
        />
        <NavbarBrand>
          <Logo />
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavButtonGroup />
      </NavbarContent>

      <NavbarContent justify="end" className="">
        <NavEnd />
      </NavbarContent>

      <NavMenu />
    </Navbar>
  );
};

export default Header;
