import { ReactElement, ReactNode } from "react";
import { Button, ButtonProps } from "../ui/button";
import { cn } from "@/lib/shadcnUtils";

type Props = ButtonProps & {
  icon: ReactElement;
  children: ReactNode;
};

export default function BtnWithIcon({ icon, children, ...restProps }: Props) {
  return (
    <Button {...restProps} className={cn("flex gap-1", restProps.className)}>
      {icon}
      <span>{children}</span>
    </Button>
  );
}
