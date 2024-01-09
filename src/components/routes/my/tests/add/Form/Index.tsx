"use client";

import useLoading from "@/lib/hooks/loading";
import AddTestFormSchema, {
  AddTestFormSchemaInputType,
  AddTestFormSchemaType,
} from "@/lib/zod/schemas/addTestForm/Index";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  FieldErrors,
  FormProvider,
  UseFieldArrayReturn,
  useFieldArray,
  useForm,
} from "react-hook-form";
import FormSubmitBtn from "@/components/Btns/Submit";
import wait from "@/lib/wait";
import { toast } from "sonner";
import AddTestFormAddQuestionBtn, {
  QUESTION_DEFAULT_VALUES,
} from "./AddQuestionBtn";
import usePersistAddTestForm from "@/lib/hooks/addTestForm/persistForm";
import AddTestFormQuestions from "./Questions/Index";
import AddTestFormSubject from "./Subject";
import SelectItemType from "@/lib/types/SelectItem";
import AddTestFormName from "./Name";
import { useCallback } from "react";
import AddTestFormGrades from "./Grades";
import AddTestFormContext from "@/lib/contexts/addTestForm";

type Props = {
  subjects: SelectItemType<string>[];
};

export const ADD_TEST_FORM_DEFAULT_VALUES: AddTestFormSchemaType = {
  grades: [],
  name: "",
  questions: [],
  subject: "",
};

export type AddTestFormQuestions = UseFieldArrayReturn<AddTestFormSchemaType>;

export default function AddTestForm({ subjects }: Props) {
  const form = useForm<AddTestFormSchemaType>({
    resolver: zodResolver(AddTestFormSchema),
    defaultValues: ADD_TEST_FORM_DEFAULT_VALUES,
  });
  const questions = useFieldArray<AddTestFormSchemaType>({
    control: form.control,
    name: "questions",
  });
  usePersistAddTestForm(form);
  const { isLoading, setIsLoading } = useLoading();

  const handleSubmit = useCallback(async (data: AddTestFormSchemaType) => {
    setIsLoading(true);
    await wait(1000);
    // setData(await action(data));
    setIsLoading(false);
    toast.success(
      <div>
        Submitted values:
        <pre>{JSON.stringify(data, null, 2)}</pre>
      </div>,
    );
  }, []);

  const handleSubmitError = useCallback(
    (errs: FieldErrors<AddTestFormSchemaType>) => {
      console.error(errs);
      toast.error(
        "Не удалось создать тест. Пожалуйста, проверьте его на ошибки",
      );
    },
    [],
  );

  return (
    <FormProvider {...form}>
      <AddTestFormContext.Provider
        value={{ questionsFields: questions, subjects }}
      >
        <form
          className="space-y-16"
          onSubmit={form.handleSubmit(handleSubmit, handleSubmitError)}
        >
          <div className="space-y-10">
            <AddTestFormName />
            <AddTestFormSubject />
            <AddTestFormGrades />
          </div>
          <AddTestFormQuestions />
          <div className="space-y-12">
            <AddTestFormAddQuestionBtn />
            <FormSubmitBtn {...{ isLoading }}>Создать тест</FormSubmitBtn>
          </div>
        </form>
      </AddTestFormContext.Provider>
    </FormProvider>
  );
}
