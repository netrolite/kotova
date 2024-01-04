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
  TestQuestionType,
} from "@/lib/types/enums/TestQuestionType";
import { AddTestSchemaInputType } from "@/lib/zod/schemas/AddTest";
import { PlusIcon } from "lucide-react";
import { FormProvider, useForm, useFormContext } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FormEvent, useState } from "react";
import NumberUnionToStringUnion from "@/lib/types/NumberUnionToStringUnion";
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
import AddTestQuestionSchema, {
  AddTestQuestionSchemaInputType,
  AddTestQuestionSchemaType,
} from "@/lib/zod/schemas/AddTestQuestionSchema";

type Props = {};

export default function AddTestFormAddQuestionBtn({}: Props) {
  const form = useForm<
    AddTestQuestionSchemaInputType,
    any,
    AddTestQuestionSchemaType
  >({
    resolver: zodResolver(AddTestQuestionSchema),
    defaultValues: {
      type: null,
    },
  });
  const {
    questions,
    addTextQuestion,
    addOptionsQuestion,
    isDialogOpen,
    setIsDialogOpen,
  } = useAddTestStore((s) => ({
    questions: s.questions,
    addTextQuestion: s.addTextQuestion,
    addOptionsQuestion: s.addOptionsQuestion,
    isDialogOpen: s.isQuestionTypeDialogOpen,
    setIsDialogOpen: s.setIsQuestionTypeDialogOpen,
  }));
  console.log(questions);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    e.stopPropagation(); // prevents the other form from triggering
    form.handleSubmit(async ({ type }) => {
      form.reset();
      if (type === TEST_QUESTION_TYPE.TEXT) {
        addTextQuestion();
      } else {
        addOptionsQuestion(type);
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
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Добавить вопрос</DialogTitle>
        </DialogHeader>
        <FormProvider {...form}>
          <form className="space-y-4" onSubmit={(e) => handleSubmit(e)}>
            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Тип вопроса</FormLabel>
                  <Select onValueChange={(val) => field.onChange(Number(val))}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Выберите тип вопроса" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {Object.values(TEST_QUESTION_TYPE).map((type) => (
                        <SelectItem key={type} value={type.toString()}>
                          {TEST_QUESTION_TYPE_LABEL[type]}
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
