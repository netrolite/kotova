import FormItemField from "@/components/Form/ItemField";
import {
  FormDescription,
  FormField,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { AddTestFormSchemaType } from "@/lib/zod/schemas/addTestForm/Index";
import { Controller, useFormContext } from "react-hook-form";
import { Grade, allGrades as allGrades } from "@/lib/constants";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

type Props = {};

export default function AddTestFormGrades({}: Props) {
  const { control, setValue, watch } = useFormContext<AddTestFormSchemaType>();
  const selectedGrades = watch("grades");

  function handleCheckedChange(grade: Grade, isSelected: boolean) {
    if (isSelected) setValue("grades", [...selectedGrades, grade]);
    else {
      setValue(
        "grades",
        selectedGrades.filter((selectedGrade) => selectedGrade !== grade),
      );
    }
  }

  return (
    <FormItemField
      control={control}
      name={`grades`}
      formItemClassName="space-y-3"
      render={() => (
        <>
          <div>
            <FormLabel htmlFor={undefined}>Классы</FormLabel>
            <FormDescription>
              Выберите классы, для которых предназначен этот тест
            </FormDescription>
          </div>
          <Controller
            name="grades"
            control={control}
            render={() => (
              <div className="flex flex-col gap-2">
                {allGrades.map((grade, i) => (
                  <Label key={i} className="flex items-center gap-2">
                    <Checkbox
                      checked={selectedGrades.includes(grade)}
                      onCheckedChange={(isChecked) => {
                        isChecked =
                          typeof isChecked === "string" ? true : isChecked;
                        handleCheckedChange(grade, isChecked);
                      }}
                    />
                    <span>{grade} класс</span>
                  </Label>
                ))}

                <FormMessage />
              </div>
            )}
          />
        </>
      )}
    />
  );
}
