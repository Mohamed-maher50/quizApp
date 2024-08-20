import React, { FC, HTMLAttributes, PropsWithChildren } from "react";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";
import { Info } from "lucide-react";
import { cn } from "@/lib/utils";
interface INotFoundAlertProps
  extends PropsWithChildren,
    HTMLAttributes<HTMLDivElement> {
  description: string;
  Icon?: JSX.ElementType;
}
const NotFoundAlert: FC<INotFoundAlertProps> = ({
  description,
  Icon = Info,
  children,
  className,
}) => {
  return (
    <div className={cn("h-full flex items-center justify-center", className)}>
      <Alert className="flex min-w-96 justify-center items-start mx-auto gap-2 w-fit">
        <AlertTitle className="w-fit items-end  flex">
          {<Icon size={20} />}
        </AlertTitle>
        <AlertDescription>{description}</AlertDescription>
      </Alert>
      {children}
    </div>
  );
};

export default NotFoundAlert;
