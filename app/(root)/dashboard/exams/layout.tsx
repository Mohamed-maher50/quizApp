import React, { ReactNode } from "react";
import ASidebar from "./_components/SidebarMenu";

const layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className=" container mx-auto">
      <div className="flex">
        <ASidebar roomId="2" />
        {children}
      </div>
    </div>
  );
};

export default layout;
