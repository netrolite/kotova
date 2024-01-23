import { GENERIC_ERROR_MSG } from "@/lib/constants";
import { cn } from "@/lib/shadcnUtils";
import { ReactNode } from "react";

type Props = {
  error?: string | null | undefined | boolean;
  className?: string;
};

export default function FormError({ error, className }: Props) {
  let content: ReactNode;
  if (!error) content = null;
  else if (typeof error === "boolean") {
    content = GENERIC_ERROR_MSG;
  } else content = error;

  return (
    <p aria-live="polite" className={cn("text-destructive", className)}>
      {content}
    </p>
  );
}
