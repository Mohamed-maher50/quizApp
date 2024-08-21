"use client";
import Image from "next/image";
import React from "react";
import { ModeToggle } from "./ToggleTheme";
import Link from "next/link";
import { UserButton, useUser } from "@clerk/nextjs";
import { Button } from "./ui/button";

const Navbar = () => {
  const { isSignedIn } = useUser();
  return (
    <nav className="bg-secondary  dark:bg-transparent">
      <div className="container  mx-auto  px-5 ">
        <div className="flex gap-3 p-2 items-center">
          <Link href={"/"} className="flex-1 ">
            <Image
              src="/headlight (1).png"
              alt="QuizWiz"
              width={40}
              height={40}
              className=" object-contain"
              priority
            />
          </Link>
          {isSignedIn && (
            <>
              <Button asChild variant={"ghost"}>
                <Link href={"/dashboard/exams"}>Dashboard</Link>
              </Button>
            </>
          )}
          <div>
            <ModeToggle />
          </div>
          {isSignedIn && <UserButton />}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
