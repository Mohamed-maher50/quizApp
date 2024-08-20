"use client";
import React, { Fragment } from "react";
import Sidebar, { SidebarMenu, SidebarMenuItem } from "../Sidebar";
import Link from "next/link";
import { FlaskConical, Lightbulb, Users } from "lucide-react";
import { SheetClose } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

type TLink = {
  href: string;
  icon: React.FC<any>;
  label: string;
  submenu?: TLink[];
};
const createRoomSidebarLinks = (roomId: string) => [
  {
    href: `/dashboard/exams`,
    icon: FlaskConical,
    label: "Exams",
    submenu: [
      // {
      //   href: `/dashboard/rooms/${roomId}/answers`,
      //   icon: Newspaper,
      //   label: "answers",
      // },
    ],
  },
  {
    href: `/dashboard/rooms/${roomId}/students`,
    icon: Users,
    label: "Students",
    submenu: [
      // {
      //   href: `/dashboard/rooms/${roomId}/answers`,
      //   icon: Newspaper,
      //   label: "answers",
      // },
    ],
  },
  {
    href: `/dashboard/rooms/${roomId}/questions`,
    icon: Lightbulb,
    label: "Questions",
    submenu: [
      {
        href: `/dashboard/rooms/${roomId}/questions/insert`,
        icon: Lightbulb,
        label: "New Question",
      },
    ],
  },
  {
    href: `/dashboard/rooms/${roomId}/settings`,
    icon: Lightbulb,
    label: "Settings",
  },
];

const recursiveLinks = (data: TLink[], path: string) => {
  return (
    <>
      {data.map((link, index) => {
        let paddingInline = 0;
        console.log(path);
        console.log(link.href);
        return (
          <Fragment key={index}>
            <SidebarMenuItem>
              <SheetClose asChild>
                <Link
                  href={link.href}
                  className={cn(path == link.href && "bg-primary")}
                >
                  <link.icon className={cn("mr-2 h-4 w-4")} />
                  {link.label}
                </Link>
              </SheetClose>
            </SidebarMenuItem>

            {link.submenu && (
              <SidebarMenu
                style={{
                  paddingInline: (paddingInline += 1.2) + "rem",
                }}
              >
                {recursiveLinks(link.submenu, path)}
              </SidebarMenu>
            )}
          </Fragment>
        );
      })}
    </>
  );
};
const RoomSidebar = ({ roomId }: { roomId: string }) => {
  const roomLinks = createRoomSidebarLinks(roomId);
  const path = usePathname();
  console.log(path);
  return (
    <div>
      <Sidebar title="Room Dashboard" className="">
        <SidebarMenu>{recursiveLinks(roomLinks, path)}</SidebarMenu>
      </Sidebar>
    </div>
  );
};

export default RoomSidebar;
