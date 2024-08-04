import Image from "next/image";
import React from "react";
import { ModeToggle } from "./ToggleTheme";
import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="bg-secondary  dark:bg-transparent">
      <div className="container  mx-auto  px-5 ">
        <div className="flex items-center">
          <Link href={"/"} className="flex-1 ">
            <Image
              src="/logo.png"
              alt="QuizWiz"
              width={60}
              height={60}
              className="object-cover"
            />
          </Link>
          <div>
            <ModeToggle />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
