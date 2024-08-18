import Navbar from "@/components/Navbar";
import { currentUser } from "@clerk/nextjs/server";
import React, { ReactNode } from "react";

const layout = async ({ children }: { children: ReactNode }) => {
  const user = await currentUser();
  const mongoDBUserId = user?.publicMetadata.mongoDBId as string;

  return (
    <div className="min-h-screen">
      <Navbar />
      {children}
    </div>
  );
};
export default layout;
