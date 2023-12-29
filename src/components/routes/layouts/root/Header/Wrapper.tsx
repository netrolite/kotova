import { cn } from "@/lib/shadcnUtils";
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
  asDiv?: boolean;
  className?: string;
};

export default function HeaderWrapper({
  children,
  asDiv = false,
  className: classNameProp,
}: Props) {
  const classNameBase =
    "flex h-[60px] items-center justify-between border-b border-slate-300 px-4 py-3";
  const className = cn(classNameBase, classNameProp);

  if (asDiv) return <div {...{ className }}>{children}</div>;
  return <header {...{ className }}>{children}</header>;
}
