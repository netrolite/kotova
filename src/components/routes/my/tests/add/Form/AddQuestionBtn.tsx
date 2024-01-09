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
import AddTestFormAddQuestionFormSchema, {
  AddTestFormAddQuestionFormSchemaInputType,
  AddTestFormAddQuestionFormSchemaType,
} from "@/lib/zod/schemas/addTestForm/AddQuestionForm";
import QuestionTypesList from "@/components/QuestionTypesList";
import useAddTestFormStore from "@/lib/stores/addTestForm";
import useAddTestFormContext from "@/lib/hooks/addTestForm/context";

export const QUESTION_DEFAULT_VALUES = {
  correctAnswerText: "",
  explanation: "",
  options: [],
  question: "",
} satisfies Omit<AddTestFormAddQuestionFormSchemaType, "type">;

export default function AddTestFormAddQuestionBtn() {
  const { questionsFields: questions } = useAddTestFormContext();
  const form = useForm<
    AddTestFormAddQuestionFormSchemaInputType,
    any,
    AddTestFormAddQuestionFormSchemaType
  >({
    resolver: zodResolver(AddTestFormAddQuestionFormSchema),
    defaultValues: {
      type: null,
    },
  });

  const { isDialogOpen, setIsDialogOpen } = useAddTestFormStore((s) => ({
    isDialogOpen: s.isQuestionTypeDialogOpen,
    setIsDialogOpen: s.setIsQuestionTypeDialogOpen,
  }));

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    e.stopPropagation(); // prevents the other form from triggering
    form.handleSubmit(({ type }) => {
      form.reset();
      questions.append({
        ...QUESTION_DEFAULT_VALUES,
        type,
      });
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
      <DialogContent>
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
