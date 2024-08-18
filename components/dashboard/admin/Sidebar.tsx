import { Button } from "@/components/ui/button";

import { cn } from "@/lib/utils";

import React, { HTMLAttributes, PropsWithChildren, ReactNode } from "react";

export function Sidebar({
  className,
  title,
  children,
}: {
  className: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <div className={cn("pb-12 max-w-96 ", className)}>
      <div className="space-y-4 py-4">
        <div className="px-4 py-2">
          <h2 className="mb-2 px-2 text-lg font-semibold tracking-tight">
            Room Dashboard
          </h2>

          {children}
        </div>
      </div>
    </div>
  );
}
interface ISidebarMenuProps
  extends PropsWithChildren,
    HTMLAttributes<HTMLDivElement> {}
export const SidebarMenu = ({
  children,
  className,

  ...rest
}: ISidebarMenuProps) => {
  return (
    <div className={cn("space-y-1 ", className)} {...rest}>
      {children}
    </div>
  );
};

export const SidebarMenuItem = ({
  children,
  ...rest
}: {
  children: ReactNode;
}) => {
  return (
    <Button variant="ghost" asChild size="sm" className="w-full justify-start">
      {children}
    </Button>
  );
};

export default Sidebar;
