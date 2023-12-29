import { ReactNode } from "react";
import { Button } from "../ui/button";
import Loading from "../Loading/Loading";

type Props = {
  children: ReactNode;
  isLoading?: boolean;
};

export default function FormSubmitBtn({ children, isLoading }: Props) {
  return (
    <Button
      type="submit"
      disabled={isLoading}
      className="flex items-center gap-1"
    >
      {isLoading && <Loading className="h-4 w-4 text-white" />}
      <span>{children}</span>
    </Button>
  );
}
