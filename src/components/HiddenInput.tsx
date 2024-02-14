import { InputHTMLAttributes, forwardRef } from "react";
import { UseFormRegisterReturn } from "react-hook-form";

type Props = Omit<UseFormRegisterReturn<string>, "onChange" | "onBlur"> & {
  value: InputHTMLAttributes<HTMLInputElement>["value"];
};

const HiddenInput = forwardRef<HTMLInputElement, Props>((props, ref) => {
  return (
    <input {...props} type="hidden" readOnly onChange={undefined} ref={ref} />
  );
});
HiddenInput.displayName = "HiddenInput";

export default HiddenInput;
