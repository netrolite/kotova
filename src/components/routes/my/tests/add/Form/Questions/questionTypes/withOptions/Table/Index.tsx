import BtnWithIcon from "@/components/Btns/WithIcon";
import FormItemField from "@/components/Form/ItemField";
import { Button } from "@/components/ui/button";
import { FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import AddTestFormQuestionOptionContext from "@/lib/contexts/addTestForm/questionOption";
import useAddTestFormContext from "@/lib/hooks/addTestForm/context";
import useAddTestFormQuestionContext from "@/lib/hooks/addTestForm/questionContext";
import { cn } from "@/lib/shadcnUtils";
import { PlusIcon, TrashIcon } from "lucide-react";
import { useFieldArray } from "react-hook-form";
import AddTestFormTableQuestionOptionColumn from "./Column";
import AddTestFormTableQuestionOptionAnswer from "./Answer";
import AddTestFormTableQuestionOptionDeleteBtn from "./DeleteBtn";
import AddTestFormQuestionWithOptionsContext from "@/lib/contexts/addTestForm/questionWithOptions";
import AddTestFormQuestionAddOptionBtn from "../AddOptionBtn";

type Props = {};

export default function AddTestFormTableQuestion({}: Props) {
  const { control } = useAddTestFormContext();
  const { index } = useAddTestFormQuestionContext();
  const optionsFields = useFieldArray({
    control,
    name: `questions.${index}.options`,
  });

  return (
    <AddTestFormQuestionWithOptionsContext.Provider value={{ optionsFields }}>
      <FormLabel htmlFor={undefined}>Столбцы и ответы</FormLabel>
      <ul className="space-y-1">
        {optionsFields.fields.map((option, i) => (
          <AddTestFormQuestionOptionContext.Provider
            value={{ option, optionIndex: i }}
            key={option.id}
          >
            <div className="flex gap-2">
              <div className="grid w-full grid-cols-2 gap-1 md:gap-2">
                <AddTestFormTableQuestionOptionColumn />
                <AddTestFormTableQuestionOptionAnswer />
              </div>
              <AddTestFormTableQuestionOptionDeleteBtn />
            </div>
          </AddTestFormQuestionOptionContext.Provider>
        ))}
      </ul>
      <FormMessage />
      <AddTestFormQuestionAddOptionBtn />
    </AddTestFormQuestionWithOptionsContext.Provider>
  );
}
