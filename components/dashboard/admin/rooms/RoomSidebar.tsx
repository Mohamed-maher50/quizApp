import React, { Fragment } from "react";
import Sidebar, { SidebarMenu, SidebarMenuItem } from "../Sidebar";
import Link from "next/link";
import { Lightbulb, Newspaper, Users } from "lucide-react";
import { SheetClose } from "@/components/ui/sheet";

type TLink = {
  href: string;
  icon: React.FC<any>;
  label: string;
  submenu?: TLink[];
};
const createRoomSidebarLinks = (roomId: string) => [
  {
    href: `/dashboard/admin/rooms/${roomId}/members`,
    icon: Users,
    label: "Members",
    submenu: [
      {
        href: `/dashboard/admin/rooms/${roomId}/answers`,
        icon: Newspaper,
        label: "answers",
      },
      {
        href: `/dashboard/admin/rooms/${roomId}/settings`,
        icon: Lightbulb,
        label: "insert",
      },
    ],
  },
  {
    href: `/dashboard/admin/rooms/${roomId}/questions`,
    icon: Lightbulb,
    label: "Questions",
    submenu: [
      {
        href: `/dashboard/admin/rooms/${roomId}/questions/insert`,
        icon: Lightbulb,
        label: "New Question",
      },
      {
        href: `/dashboard/admin/rooms/${roomId}/settings`,
        icon: Lightbulb,
        label: "insert",
      },
    ],
  },
];

const recursiveLinks = (data: TLink[]) => {
  return (
    <>
      {data.map((link, index) => {
        let paddingInline = 0;
        return (
          <Fragment key={index}>
            <SidebarMenuItem>
              <SheetClose asChild>
                <Link href={link.href}>
                  <link.icon className="mr-2 h-4 w-4" />
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
                {recursiveLinks(link.submenu)}
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
  return (
    <div>
      <Sidebar title="Room Dashboard" className="">
        <SidebarMenu>{recursiveLinks(roomLinks)}</SidebarMenu>
      </Sidebar>
    </div>
  );
};

export default RoomSidebar;
