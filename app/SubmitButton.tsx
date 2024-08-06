import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Loader } from "lucide-react";
import React, {
  ButtonHTMLAttributes,
  forwardRef,
  PropsWithChildren,
} from "react";
interface ISubmitButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    PropsWithChildren {
  isLoading?: boolean;
  disabled?: boolean;
}
const SubmitButton = forwardRef<HTMLButtonElement, ISubmitButtonProps>(
  ({ isLoading = false, disabled, className, children, ...rest }, ref) => {
    return (
      <Button
        type="submit"
        disabled={isLoading}
        ref={ref}
        className={cn(className)}
        {...rest}
      >
        {isLoading && <Loader className="animate-spin" />}
        {children}
      </Button>
    );
  }
);

SubmitButton.displayName = "SubmitButton";

export default SubmitButton;
