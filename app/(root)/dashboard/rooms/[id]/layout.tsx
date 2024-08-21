import RoomSidebar from "@/components/dashboard/admin/rooms/RoomSidebar";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import React, { PropsWithChildren } from "react";
interface IDashboardRoomsLayoutProps extends PropsWithChildren {
  params: { id: string };
}
const DashboardRoomsLayout = ({
  children,
  params: { id },
}: IDashboardRoomsLayoutProps) => {
  return (
    <div className="container mx-auto">
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
            <RoomSidebar roomId={id} />
          </div>
          <div className="flex-grow">{children}</div>
        </div>
        <SheetContent side={"left"}>
          <RoomSidebar roomId={id} />
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default DashboardRoomsLayout;
