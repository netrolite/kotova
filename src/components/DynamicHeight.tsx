import { cn } from "@/lib/shadcnUtils";
import { ReactNode } from "react";
import useMeasure from "react-use-measure";

type Props = {
  children: ReactNode;
  isOpen: boolean;
  className?: string;
};

export default function DynamicHeight({ children, isOpen, className }: Props) {
  const [innerContainerRef, innerContainerBounds] = useMeasure();

  return (
    <div
      className={cn(
        "duration-200",
        !isOpen && "pointer-events-none opacity-0",
        className,
      )}
      aria-hidden={!isOpen}
      style={{ height: isOpen ? innerContainerBounds.height : 0 }}
    >
      <div ref={innerContainerRef}>{children}</div>
    </div>
  );
}
