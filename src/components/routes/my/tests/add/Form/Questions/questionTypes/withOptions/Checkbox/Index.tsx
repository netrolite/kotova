import { FormLabel, FormMessage } from "@/components/ui/form";
import useAddTestFormContext from "@/lib/hooks/addTestForm/context";
import { useFieldArray } from "react-hook-form";
import AddTestFormQuestionWithOptionsContext from "@/lib/contexts/addTestForm/questionWithOptions";
import AddTestFormQuestionOptionContext from "@/lib/contexts/addTestForm/questionOption";
import useAddTestFormQuestionContext from "@/lib/hooks/addTestForm/questionContext";
import AddTestFormQuestionAddOptionBtn from "../AddOptionBtn";
import AddTestFormCheckboxQuestionOptionActionBtns from "./Option/ActionBtns/Index";
import AddTestFormCheckboxQuestionOptionInput from "./Option/Input";

export default function AddTestFormRadioQuestion() {
  const { index } = useAddTestFormQuestionContext();
  const { control } = useAddTestFormContext();
  const optionsFields = useFieldArray({
    control,
    name: `questions.${index}.options`,
  });

  return (
    <>
      <AddTestFormQuestionWithOptionsContext.Provider value={{ optionsFields }}>
        <FormLabel htmlFor={undefined}>Варианты ответа</FormLabel>
        <ul className="space-y-1">
          {optionsFields.fields.map((option, i) => (
            <AddTestFormQuestionOptionContext.Provider
              value={{ option, optionIndex: i }}
              key={option.id}
            >
              <li className="flex gap-2">
                <AddTestFormCheckboxQuestionOptionInput />
                <AddTestFormCheckboxQuestionOptionActionBtns />
              </li>
            </AddTestFormQuestionOptionContext.Provider>
          ))}
        </ul>
        <FormMessage />
        <AddTestFormQuestionAddOptionBtn />
      </AddTestFormQuestionWithOptionsContext.Provider>
    </>
  );
}
