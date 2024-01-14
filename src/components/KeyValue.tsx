import { cn } from "@/lib/shadcnUtils";
import { ReactNode } from "react";

type Props = {
  label: string;
  labelClassName?: string;
  children: ReactNode;
  childrenContainerClassName?: string;
};

export default function KeyValue({
  label,
  labelClassName,
  children,
  childrenContainerClassName,
}: Props) {
  return (
    <div className="space-x-2">
      <span className={cn("text-muted-foreground", labelClassName)}>
        {label}
      </span>
      <span className={cn("font-semibold", childrenContainerClassName)}>
        {children}
      </span>
    </div>
  );
}
