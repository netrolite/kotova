import Loading from "../Loading/Loading";
import { Button, ButtonProps } from "../ui/button";

type Props = {
  isLoading?: boolean;
} & ButtonProps;

export default function BtnWithLoading({
  isLoading,
  children,
  ...props
}: Props) {
  return (
    <Button {...props} className="flex gap-1" disabled={isLoading}>
      {isLoading && <Loading className="h-4 w-4 text-white" />}
      <span>{children}</span>
    </Button>
  );
}
