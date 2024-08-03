import Image from "next/image";
import React from "react";
import { ModeToggle } from "./ToggleTheme";

const Navbar = () => {
  return (
    <nav className="bg-secondary absolute left-0 right-0 top-0 dark:bg-transparent">
      <div className="container  mx-auto  px-5 ">
        <div className="flex items-center">
          <div className="flex-1 ">
            <Image
              src="/logo.png"
              alt="QuizWiz"
              width={60}
              height={60}
              className="object-cover"
            />
          </div>
          <div>
            <ModeToggle />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
