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
    <div className="space-y-2">
      {optionsFields.fields.map((option, i) => (
        <FormItemField
          key={option.id}
          control={control}
          name={`answers.${questionIndex}.options.${i}.tableAnswer`}
          formItemClassName="flex space-y-0"
          render={({ field }) => (
            <>
              <FormLabel className="p-4 pl-0">
                {questionOptions[i].tableColumn}
              </FormLabel>
              <div className="space-y-0.5">
                <FormControl>
                  <Input
                    {...field}
                    value={field.value || ""}
                    placeholder={`Ответ ${i + 1}`}
                  />
                </FormControl>
                <FormMessage />
              </div>
            </>
          )}
        />
      ))}
    </div>
  );
}
