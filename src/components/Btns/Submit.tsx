import { ReactNode, forwardRef } from "react";
import { Button, ButtonProps } from "../ui/button";
import Loading from "../Loading/Loading";

type Props = {
  children: ReactNode;
  isLoading?: boolean;
} & ButtonProps;

const FormSubmitBtn = forwardRef<HTMLButtonElement, Props>(
  ({ children, isLoading, ...restProps }, ref) => {
    return (
      <Button
        type="submit"
        disabled={isLoading}
        className="flex items-center gap-1"
        ref={ref}
        {...restProps}
      >
        {isLoading && <Loading className="h-4 w-4 text-white" />}
        <span>{children}</span>
      </Button>
    );
  },
);

FormSubmitBtn.displayName = "FormSubmitBtn";

export default FormSubmitBtn;
