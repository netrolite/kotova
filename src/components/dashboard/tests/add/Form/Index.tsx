"use client";

import useLoading from "@/lib/hooks/loading";
import AddTestFormSchema, {
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
import { toast } from "sonner";
import AddTestFormAddQuestionBtn from "./AddQuestionBtn";
import usePersistAddTestForm from "@/lib/hooks/addTestForm/persistForm";
import AddTestFormQuestions from "./Questions/Index";
import AddTestFormSubjectId from "./SubjectId";
import SelectItemType from "@/lib/types/SelectItem";
import AddTestFormName from "./Name";
import { useCallback } from "react";
import AddTestFormGrades from "./Grades";
import AddTestFormContext from "@/lib/contexts/addTestForm";
import createTestAction from "@/lib/actions/createTest";
import { useRouter } from "next/navigation";
import isProduction from "@/lib/isProduction";

type Props = {
  subjects: SelectItemType<string>[];
};

export const ADD_TEST_FORM_DEFAULT_VALUES: AddTestFormSchemaType = {
  grades: [],
  name: "",
  questions: [],
  subjectId: "",
};

export type AddTestFormQuestions = UseFieldArrayReturn<AddTestFormSchemaType>;

export default function AddTestForm({ subjects }: Props) {
  const router = useRouter();
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

  const handleSubmit = useCallback(async (formData: AddTestFormSchemaType) => {
    setIsLoading(true);
    console.log(formData);
    const { data, error } = await createTestAction(formData);
    if (error) {
      setIsLoading(false);
      return toast.error(
        "Что-то пошло не так при создании теста. Пожалуйста, попробуйте позже",
      );
    }
    router.replace(`/my/tests/${data.testId}`);
    toast.success("Тест успешно создан");
  }, []);

  const handleSubmitError = useCallback(
    (errs: FieldErrors<AddTestFormSchemaType>) => {
      toast.error(
        "Не удалось создать тест. Пожалуйста, проверьте его на ошибки",
      );
      if (!isProduction()) console.error(errs);
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
            <AddTestFormSubjectId />
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