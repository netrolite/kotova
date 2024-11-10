import FormItemField from "@/components/Form/ItemField";
import { Checkbox } from "@/components/ui/checkbox";
import { FormControl, FormLabel, FormMessage } from "@/components/ui/form";
import useTakeTestFormContext from "@/lib/hooks/takeTest/formContext";
import useTakeTestQuestionContext from "@/lib/hooks/takeTest/questionContext";
import useTakeTestQuestionOptionsContext from "@/lib/hooks/takeTest/questionOptionsContext";
import { CheckedState } from "@radix-ui/react-checkbox";

export default function TakeTestRadioQuestion() {
  const { questionIndex, options: questionOptions } =
    useTakeTestQuestionContext();
  const { control } = useTakeTestFormContext();
  const { optionsFields } = useTakeTestQuestionOptionsContext();

  function handleCheckedChange(val: CheckedState, indexToUpdate: number) {
    optionsFields.fields.forEach((field, i) => {
      val = val === "indeterminate" ? false : val;
      const isChecked = i === indexToUpdate ? val : false;
      optionsFields.update(i, { ...field, isChecked });
    });
  }

  return (
    <ul className="space-y-2">
      {optionsFields.fields.map((option, i) => (
        <FormItemField
          key={option.id}
          control={control}
          name={`answers.${questionIndex}.options.${i}.isChecked`}
          formItemClassName="flex gap-2 items-center space-y-0"
          render={({ field }) => {
            return (
              <>
                <FormControl>
                  <Checkbox
                    checked={field.value || false}
                    onCheckedChange={(val) => handleCheckedChange(val, i)}
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
      <FormMessage />
    </ul>
  );
}
