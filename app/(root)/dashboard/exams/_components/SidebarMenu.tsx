import React, { Fragment } from "react";

import Link from "next/link";
import { BookText, FlaskConical, Lightbulb } from "lucide-react";
import { SheetClose } from "@/components/ui/sheet";
import {
  Sidebar,
  SidebarMenu,
  SidebarMenuItem,
} from "@/components/dashboard/admin/Sidebar";

type TLink = {
  href: string;
  icon: React.FC<any>;
  label: string;
  submenu?: TLink[];
};
const createRoomSidebarLinks = (roomId: string) => [
  {
    href: `/dashboard/exams/`,
    icon: FlaskConical,
    label: "Exams",
  },
  {
    href: `/dashboard/rooms`,
    icon: BookText,
    label: "Your Rooms",
    submenu: [],
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
              <Link href={link.href}>
                <link.icon className="mr-2 h-4 w-4" />
                {link.label}
              </Link>
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
const ASidebar = ({ roomId }: { roomId: string }) => {
  const roomLinks = createRoomSidebarLinks(roomId);
  return (
    <div>
      <Sidebar title="Room Dashboard" className="">
        <SidebarMenu>{recursiveLinks(roomLinks)}</SidebarMenu>
      </Sidebar>
    </div>
  );
};

export default ASidebar;
