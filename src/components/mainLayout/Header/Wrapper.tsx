import { cn } from "@/lib/shadcnUtils";
import { ReactNode } from "react";
import styles from "./styles.module.scss";

type Props = {
  children: ReactNode;
  asDiv?: boolean;
  className?: string;
};

export default function MainLayoutHeaderWrapper({
  children,
  asDiv = false,
  className: classNameProp,
}: Props) {
  const classNameBase =
    "flex items-center justify-between border-b border-slate-300 px-4";
  const className = cn(classNameBase, styles.header, classNameProp);

  if (asDiv) return <div {...{ className }}>{children}</div>;
  return <header {...{ className }}>{children}</header>;
}
