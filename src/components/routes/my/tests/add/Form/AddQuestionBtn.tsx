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
import {
  TEST_QUESTION_TYPE,
  TEST_QUESTION_TYPE_LABEL,
} from "@/lib/types/enums/TestQuestionType";
import { PlusIcon } from "lucide-react";
import { FormProvider, useForm, useFormContext } from "react-hook-form";
import { FormEvent } from "react";
import useAddTestStore from "@/lib/stores/routes/my/tests/add/addTest";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { AddTestQuestionSchemaInputType } from "@/lib/zod/schemas/AddTestQuestion";
import { getQuestionTypeLabelByNumber } from "@/lib/getQuestionType";
import { AddTestSchemaInputType } from "@/lib/zod/schemas/AddTest";
import AddTestQuestionTypeSchema from "@/lib/zod/schemas/AddTestQuestionType";
import AddTestQuestionModalSchema, {
  AddTestQuestionModalSchemaInputType,
  AddTestQuestionModalSchemaType,
} from "@/lib/zod/schemas/AddTestQuestionModal";

type Props = {};

const QUESTION_DEFAULT_VALUES = {
  correctAnswerText: "",
  explanation: "",
  options: [],
  question: "",
} satisfies Omit<AddTestQuestionSchemaInputType, "type">;

export default function AddTestFormAddQuestionBtn({}: Props) {
  const form = useForm<
    AddTestQuestionModalSchemaInputType,
    any,
    AddTestQuestionModalSchemaType
  >({
    resolver: zodResolver(AddTestQuestionModalSchema),
    defaultValues: {
      type: null,
    },
  });
  const addTestForm = useFormContext<AddTestSchemaInputType>();
  const { setValue } = addTestForm;
  const questions = addTestForm.watch("questions");
  const { isDialogOpen, setIsDialogOpen } = useAddTestStore((s) => ({
    isDialogOpen: s.isQuestionTypeDialogOpen,
    setIsDialogOpen: s.setIsQuestionTypeDialogOpen,
  }));

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    e.stopPropagation(); // prevents the other form from triggering
    form.handleSubmit(async ({ type }) => {
      form.reset();
      setValue("questions", [
        ...questions,
        { ...QUESTION_DEFAULT_VALUES, type },
      ]);
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
                      {Object.values(TEST_QUESTION_TYPE).map((type) => (
                        <SelectItem key={type} value={type.toString()}>
                          {getQuestionTypeLabelByNumber(type)}
                        </SelectItem>
                      ))}
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
