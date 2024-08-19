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
        <div className="flex gap-3 items-center">
          <Link href={"/"} className="flex-1 ">
            <Image
              src="/logo.png"
              alt="QuizWiz"
              width={60}
              height={60}
              className="object-cover"
            />
          </Link>
          {isSignedIn && (
            <>
              <Button asChild variant={"ghost"}>
                <Link href={"/my/rooms/exams"}>My Exams</Link>
              </Button>
              <Button asChild variant={"outline"}>
                <Link href={"/rooms/my"}>my Rooms</Link>
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
