import FormItemField from "@/components/Form/ItemField";
import { Checkbox } from "@/components/ui/checkbox";
import { FormControl, FormLabel } from "@/components/ui/form";
import useTakeTestQuestionContext from "@/lib/hooks/takeTest/questionContext";
import useTakeTestQuestionOptionsContext from "@/lib/hooks/takeTest/questionOptionsContext";
import useTakeTestFormContext from "@/lib/hooks/takeTest/formContext";
import parseCheckedState from "@/lib/parseCheckboxState";
import { CheckedState } from "@radix-ui/react-checkbox";

export default function TakeTestCheckboxQuestion() {
  const { questionIndex, options: questionOptions } =
    useTakeTestQuestionContext();
  const { control } = useTakeTestFormContext();
  const { optionsFields } = useTakeTestQuestionOptionsContext();

  function handleCheckedChange(isChecked: CheckedState, indexToUpdate: number) {
    isChecked = parseCheckedState(isChecked);
    const prev = optionsFields.fields[indexToUpdate];
    optionsFields.update(indexToUpdate, { ...prev, isChecked });
  }

  return (
    <ul className="space-y-2">
      {optionsFields.fields.map((option, i) => (
        <FormItemField
          key={option.id}
          control={control}
          name={`answers.${questionIndex}.options.${i}.isChecked`}
          formItemClassName="flex gap-2 items-start space-y-0"
          render={({ field }) => {
            return (
              <>
                <FormControl>
                  <Checkbox
                    checked={field.value || false}
                    onCheckedChange={(val) => handleCheckedChange(val, i)}
                    className="mt-1"
                  />
                </FormControl>
                <FormLabel className="text-sm font-normal">
                  {questionOptions[i].content}
                </FormLabel>
              </>
            );
          }}
        />
      ))}
    </ul>
  );
}
