import Navbar from "@/components/Navbar";
import React, { ReactNode } from "react";

const layout = async ({ children }: { children: ReactNode }) => {
  return (
    <div className="min-h-screen">
      <Navbar />
      {children}
    </div>
  );
};
export default layout;
