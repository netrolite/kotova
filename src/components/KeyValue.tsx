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
    <div className="flex gap-2">
      <span className={cn("text-muted-foreground", labelClassName)}>
        {label}
      </span>
      <div className={cn("font-semibold", childrenContainerClassName)}>
        {children}
      </div>
    </div>
  );
}
