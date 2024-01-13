import { ReactElement, ReactNode, forwardRef } from "react";
import { Button, ButtonProps } from "../ui/button";
import { cn } from "@/lib/shadcnUtils";

type Props = ButtonProps & {
  icon?: ReactElement;
  children: ReactNode;
};

const BtnWithIcon = forwardRef<HTMLButtonElement, Props>(
  ({ icon, children, ...props }: Props, ref) => {
    return (
      <Button
        {...props}
        ref={ref}
        className={cn("flex gap-1", props.className)}
      >
        {icon}
        <span>{children}</span>
      </Button>
    );
  },
);

BtnWithIcon.displayName = "BtnWithIcon";

export default BtnWithIcon;
