import { FieldPath, FieldValues } from "react-hook-form";
import { FormField, FormItem } from "../ui/form";
import { ComponentProps } from "react";

type Props<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = ComponentProps<typeof FormField<TFieldValues, TName>> & {
  formItemClassName?: string;
};

export default function FormItemField<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  formItemClassName,
  render,
  ...formFieldProps
}: Props<TFieldValues, TName>) {
  return (
    <FormField
      {...formFieldProps}
      render={(renderArgs) => (
        <FormItem className={formItemClassName}>{render(renderArgs)}</FormItem>
      )}
    />
  );
}
