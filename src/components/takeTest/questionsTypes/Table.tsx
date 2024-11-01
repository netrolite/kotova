import FormItemField from "@/components/Form/ItemField";
import { FormControl, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import useTakeTestFormContext from "@/lib/hooks/takeTest/formContext";
import useTakeTestQuestionContext from "@/lib/hooks/takeTest/questionContext";
import useTakeTestQuestionOptionsContext from "@/lib/hooks/takeTest/questionOptionsContext";

export default function TakeTestTableQuestion() {
  const { questionIndex, options: questionOptions } =
    useTakeTestQuestionContext();
  const { control } = useTakeTestFormContext();
  const { optionsFields } = useTakeTestQuestionOptionsContext();

  return (
    <div className="space-y-4">
      {optionsFields.fields.map((option, i) => (
        <FormItemField
          key={option.id}
          control={control}
          name={`answers.${questionIndex}.options.${i}.tableAnswer`}
          formItemClassName="flex space-y-0 items-center"
          render={({ field }) => (
            <div>
              <div className="mb-2 leading-5">
                <FormLabel className="font-normal">
                  {questionOptions[i].tableColumn}
                </FormLabel>
              </div>
              <div className="max-w-[220px]">
                <FormControl>
                  <Input
                    {...field}
                    value={field.value || ""}
                    placeholder={`Ответ ${i + 1}`}
                  />
                </FormControl>
                <FormMessage />
              </div>
            </div>
          )}
        />
      ))}
    </div>
  );
}
