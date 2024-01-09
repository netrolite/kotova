import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import BtnWithIcon from "@/components/Btns/WithIcon";
import FormItemField from "@/components/Form/ItemField";
import { Button } from "@/components/ui/button";
import { FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import AddTestFormQuestionContext from "@/lib/contexts/addTestForm/question";
import useAddTestFormContext from "@/lib/hooks/addTestForm/context";
import useContextVal from "@/lib/hooks/contextVal";
import { CheckIcon, FileDiff, PlusIcon, TrashIcon, XIcon } from "lucide-react";
import { useFieldArray } from "react-hook-form";
import { cn } from "@/lib/shadcnUtils";

export default function AddTestFormRadioQuestion() {
  const { index } = useContextVal(AddTestFormQuestionContext);
  const { control } = useAddTestFormContext();
  const optionsFields = useFieldArray({
    control,
    name: `questions.${index}.options`,
  });

  function handleMarkAnswerAsCorrect(indexToUpdate: number) {
    optionsFields.fields.forEach((option, i) => {
      optionsFields.update(i, {
        ...option,
        isCorrect: i === indexToUpdate ? !option.isCorrect : false,
      });
    });
  }

  return (
    <>
      <FormItemField
        control={control}
        name={`questions.${index}.options`}
        render={({ field: { value: options }, fieldState }) => (
          <>
            <FormLabel>Варианты ответа</FormLabel>
            <ul className="space-y-1">
              {options.map((option, i) => (
                <li className="flex gap-1" key={i}>
                  <FormItemField
                    control={control}
                    name={`questions.${index}.options.${i}.content`}
                    formItemClassName="w-full"
                    render={({ field }) => (
                      <>
                        <Input
                          {...field}
                          placeholder={`Ответ ${i + 1}`}
                          className={cn(
                            "border",
                            option.isCorrect && "border-2 border-green-600",
                          )}
                        />
                        <FormMessage />
                      </>
                    )}
                  />

                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="ghost"
                          type="button"
                          className={cn(
                            "border-2 border-transparent text-muted-foreground duration-0 hover:text-green-600",
                            option.isCorrect &&
                              "border-green-600 text-green-600",
                          )}
                          onClick={() => handleMarkAnswerAsCorrect(i)}
                        >
                          <CheckIcon />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        {option.isCorrect
                          ? "Убрать отметку правильного ответа"
                          : "Отметить как правильный ответ"}
                      </TooltipContent>
                    </Tooltip>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="ghost"
                          type="button"
                          className="text-muted-foreground hover:text-destructive"
                          onClick={() => optionsFields.remove(i)}
                        >
                          <TrashIcon />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>Удалить</TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
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
          </>
        )}
      />
    </>
  );
}
