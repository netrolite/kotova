import BtnWithIcon from "@/components/Btns/WithIcon";
import FormItemField from "@/components/Form/ItemField";
import { FormLabel, FormMessage } from "@/components/ui/form";
import AddTestFormQuestionContext from "@/lib/contexts/addTestForm/question";
import useAddTestFormContext from "@/lib/hooks/addTestForm/context";
import useContextVal from "@/lib/hooks/contextVal";
import { PlusIcon } from "lucide-react";
import { useFieldArray } from "react-hook-form";
import AddTestFormRadioQuestionOptionInput from "./Option/Input";
import AddTestFormRadioQuestionOptionActionBtns from "./Option/ActionBtns/Index";
import AddTestFormRadioQuestionContext from "@/lib/contexts/addTestForm/radioQuestion";

export default function AddTestFormRadioQuestion() {
  const { index } = useContextVal(AddTestFormQuestionContext);
  const { control } = useAddTestFormContext();
  const optionsFields = useFieldArray({
    control,
    name: `questions.${index}.options`,
  });

  return (
    <>
      <FormItemField
        control={control}
        name={`questions.${index}.options`}
        render={({ field: { value: options }, fieldState }) => (
          <AddTestFormRadioQuestionContext.Provider value={{ optionsFields }}>
            <FormLabel>Варианты ответа</FormLabel>
            <ul className="space-y-1">
              {options.map((option, i) => (
                <li className="flex gap-1" key={i}>
                  <AddTestFormRadioQuestionOptionInput
                    {...{ option, optionIndex: i }}
                  />
                  <AddTestFormRadioQuestionOptionActionBtns
                    {...{ option, optionIndex: i }}
                  />
                </li>
              ))}
            </ul>
            {fieldState.error?.message && <FormMessage />}
            <BtnWithIcon
              type="button"
              variant="outline"
              icon={<PlusIcon />}
              onClick={() =>
                optionsFields.append({ content: "", isCorrect: false })
              }
            >
              Добавить вариант ответа
            </BtnWithIcon>
          </AddTestFormRadioQuestionContext.Provider>
        )}
      />
    </>
  );
}
