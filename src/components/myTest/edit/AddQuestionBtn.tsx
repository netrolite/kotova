import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import BtnWithIcon from "@/components/Btns/WithIcon";
import { PlusIcon } from "lucide-react";
import { FormProvider, useForm } from "react-hook-form";
import { FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { getQuestionTypeLabelByNumber } from "@/lib/getQuestionType";
import QuestionTypesList from "@/components/QuestionTypesList";
import useMyTestEditFormStore from "@/lib/stores/myTestEditForm";
import useMyTestEditFormContext from "@/lib/hooks/myTestEditForm/context";
import { TEST_QUESTION_TYPE } from "@/lib/types/enums/TestQuestionType";
import { MyTestEditFormQuestionSchemaType } from "@/lib/zod/schemas/myTestEditForm/Question";
import MyTestEditFormAddQuestionSchema, {
  MyTestEditFormAddQuestionSchemaInputType,
  MyTestEditFormAddQuestionSchemaType,
} from "@/lib/zod/schemas/myTestEditForm/AddQuestionForm";

export const TEXT_QUESTION_DEFAULT_VALUES = {
  correctAnswerText: "",
  explanation: "",
  options: [],
  question: "",
  type: TEST_QUESTION_TYPE.TEXT,
} satisfies MyTestEditFormQuestionSchemaType;

export const QUESTION_WITH_OPTIONS_DEFAULT_VALUES = {
  correctAnswerText: null,
  explanation: "",
  options: [],
  question: "",
} satisfies Omit<MyTestEditFormQuestionSchemaType, "type">;

export default function MyTestEditFormAddQuestionBtn() {
  const { questionsFields: questions } = useMyTestEditFormContext();
  const form = useForm<
    MyTestEditFormAddQuestionSchemaInputType,
    any,
    MyTestEditFormAddQuestionSchemaType
  >({
    resolver: zodResolver(MyTestEditFormAddQuestionSchema),
    defaultValues: {
      type: null,
    },
  });

  const { isDialogOpen, setIsDialogOpen } = useMyTestEditFormStore((s) => ({
    isDialogOpen: s.isQuestionTypeDialogOpen,
    setIsDialogOpen: s.setIsQuestionTypeDialogOpen,
  }));

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    e.stopPropagation(); // prevents the other form from triggering
    form.handleSubmit(({ type }) => {
      form.reset();
      if (type === TEST_QUESTION_TYPE.TEXT) {
        questions.append(TEXT_QUESTION_DEFAULT_VALUES);
      } else {
        questions.append({
          ...QUESTION_WITH_OPTIONS_DEFAULT_VALUES,
          type,
        });
      }
      setIsDialogOpen(false);
    })(e);
  }

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <BtnWithIcon type="button" icon={<PlusIcon />}>
          Добавить вопрос
        </BtnWithIcon>
      </DialogTrigger>
      <DialogContent onCloseAutoFocus={(e) => e.preventDefault()}>
        <DialogHeader>
          <DialogTitle>Добавить вопрос</DialogTitle>
        </DialogHeader>
        <FormProvider {...form}>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <FormField
              control={form.control}
              name="type"
              render={({ field: { onChange, value } }) => (
                <FormItem>
                  <FormLabel>Тип вопроса</FormLabel>
                  <Select
                    value={value ? String(value) : undefined}
                    onValueChange={(val) => onChange(Number(val))}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Выберите тип вопроса" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <QuestionTypesList
                        render={({ type }) => (
                          <SelectItem key={type} value={type.toString()}>
                            {getQuestionTypeLabelByNumber(type)}
                          </SelectItem>
                        )}
                      />
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button>Добавить</Button>
          </form>
        </FormProvider>
      </DialogContent>
    </Dialog>
  );
}
