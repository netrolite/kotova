import { ReactNode } from "react";
import { Button, ButtonProps } from "../ui/button";
import Loading from "../Loading/Loading";

type Props = {
  children: ReactNode;
  isLoading?: boolean;
} & ButtonProps;

export default function FormSubmitBtn({
  children,
  isLoading,
  ...restProps
}: Props) {
  return (
    <Button
      type="submit"
      disabled={isLoading}
      className="flex items-center gap-1"
      {...restProps}
    >
      {isLoading && <Loading className="h-4 w-4 text-white" />}
      <span>{children}</span>
    </Button>
  );
}
