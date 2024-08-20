import React, { PropsWithChildren } from "react";

interface IDashboardRoomsLayoutProps extends PropsWithChildren {
  params: { id: string };
  Sidebar: React.ReactNode;
}
const DashboardLayout = ({ children }: IDashboardRoomsLayoutProps) => {
  return <>{children}</>;
};

export default DashboardLayout;
