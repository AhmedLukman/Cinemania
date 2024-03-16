import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Input, Link, NavbarItem } from "@nextui-org/react";
import React from "react";

const NavEnd = () => {
  return (
    <>
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
      <NavbarItem className="hidden md:block">
        <Button as={Link} href="#" variant="flat" className="text-white">
          Sign Up
        </Button>
      </NavbarItem>
    </>
  );
};

export default NavEnd;
