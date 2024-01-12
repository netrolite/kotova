import { InputHTMLAttributes, forwardRef } from "react";
import { UseFormRegisterReturn } from "react-hook-form";

type Props = UseFormRegisterReturn<string> & {
  value: InputHTMLAttributes<HTMLInputElement>["value"];
};

const HiddenInput = forwardRef<HTMLInputElement, Props>((props, ref) => {
  return (
    <input {...props} type="hidden" readOnly onChange={undefined} ref={ref} />
  );
});

export default HiddenInput;
