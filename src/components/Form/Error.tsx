import { genericErrorMsg } from "@/lib/constants";
import { ReactNode } from "react";

type Props = {
  error?: string | null | undefined | boolean;
};

export default function FormError({ error }: Props) {
  let content: ReactNode;
  if (!error) content = null;
  else if (typeof error === "boolean") {
    content = genericErrorMsg;
  } else content = error;

  return <p className="text-destructive">{content}</p>;
}
