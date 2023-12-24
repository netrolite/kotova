import { cn } from "@/lib/shadcnUtils";
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
};

export default function PageTitle({ children, className }: Props) {
  return (
    <h1 className={cn("text-3xl font-semibold", className)}>{children}</h1>
  );
}
