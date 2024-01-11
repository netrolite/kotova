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
import AddTestFormQuestionWithOptionsContext from "@/lib/contexts/addTestForm/questionWithOptions";
import AddTestFormQuestionOptionContext from "@/lib/contexts/addTestForm/questionOption";
import useAddTestFormQuestionContext from "@/lib/hooks/addTestForm/questionContext";
import AddTestFormQuestionAddOptionBtn from "../AddOptionBtn";

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
                <AddTestFormRadioQuestionOptionInput />
                <AddTestFormRadioQuestionOptionActionBtns />
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
