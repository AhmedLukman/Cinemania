import React from 'react'
import { Button, ButtonGroup, Link } from '@nextui-org/react';
import { usePathname } from 'next/navigation';


const NavButtonGroup = () => {
  const pathname = usePathname();

  return (
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
          pathname.startsWith("/people")
            ? "text-white hover:text-black"
            : "text-black"
        }
        as={Link}
        variant={pathname.startsWith("/people") ? "ghost" : "faded"}
        href="/people"
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
  );
}

export default NavButtonGroup