import React, { ReactNode } from "react";
import ASidebar from "./_components/SidebarMenu";
import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className=" container mx-auto">
      <Sheet>
        <div className="">
          <div className="flex  border-secondary rounded-md shadow-sm border px-2 md:hidden  justify-between items-center w-full py-4">
            <span className="text-muted-foreground"> Navigation links </span>
            <SheetTrigger className="flex items-center gap-2">
              <Menu />
            </SheetTrigger>
          </div>
        </div>
        <div className="flex p-2">
          <div className="hidden md:block">
            <ASidebar roomId="2" />
          </div>
          <div className="flex-grow">{children}</div>
        </div>
        <SheetContent side={"left"}>
          <ASidebar roomId="2" />
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default layout;
