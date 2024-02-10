"use client";

import useLoading from "@/lib/hooks/loading";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  FieldErrors,
  FormProvider,
  UseFieldArrayReturn,
  useFieldArray,
  useForm,
} from "react-hook-form";
import { toast } from "sonner";
import MyTestEditFormAddQuestionBtn from "./AddQuestionBtn";
import MyTestEditFormQuestions from "./Questions/Index";
import MyTestEditFormSubjects from "./Subjects";
import SelectItemType from "@/lib/types/SelectItem";
import MyTestEditFormName from "./Name";
import { useCallback, useRef } from "react";
import MyTestEditFormGrades from "./Grades";
import MyTestEditFormContext from "@/lib/contexts/myTestEditForm";
import { useRouter } from "next/navigation";
import isProduction from "@/lib/isProduction";
import MyTestEditFormEditTestBtn from "./EditTestBtn";
import MyTestEditFormSchema, {
  MyTestEditFormSchemaType,
} from "@/lib/zod/schemas/myTestEditForm/Index";
import editTestAction from "@/lib/actions/editTest";
import { MyTestEditGetTestReturn } from "@/lib/fetchers/myTest/editGetTest";

type Props = {
  subjects: SelectItemType<string>[];
  test: MyTestEditGetTestReturn;
};

export const MY_TEST_EDIT_FORM_DEFAULT_VALUES: MyTestEditFormSchemaType = {
  grades: [],
  name: "",
  questions: [],
  subjectId: "",
};

export type MyTestEditFormQuestions =
  UseFieldArrayReturn<MyTestEditFormSchemaType>;

export default function MyTestEditForm({ subjects, test }: Props) {
  const router = useRouter();
  const form = useForm<MyTestEditFormSchemaType>({
    resolver: zodResolver(MyTestEditFormSchema),
    defaultValues: { ...test, subjectId: test.subjectId ?? undefined },
  });
  const formRef = useRef<HTMLFormElement>(null);
  const questions = useFieldArray<MyTestEditFormSchemaType>({
    control: form.control,
    name: "questions",
  });
  const { isLoading, setIsLoading } = useLoading();

  const handleSubmit = useCallback(
    async (formData: MyTestEditFormSchemaType) => {
      setIsLoading(true);
      const { data, error } = await editTestAction(formData);
      if (error) {
        setIsLoading(false);
        return toast.error(
          "Что-то пошло не так при изменении теста. Пожалуйста, попробуйте позже",
        );
      }
      toast.success("Тест успешно изменён");
      router.replace(`/my/tests/${data.testId}`);
    },
    [],
  );

  const handleSubmitError = useCallback(
    (errs: FieldErrors<MyTestEditFormSchemaType>) => {
      toast.error(
        "Не удалось изменить тест. Пожалуйста, проверьте его на ошибки",
      );
      if (!isProduction()) console.error(errs);
    },
    [],
  );

  return (
    <FormProvider {...form}>
      <MyTestEditFormContext.Provider
        value={{ questionsFields: questions, subjects, formRef, test }}
      >
        <form
          className="space-y-16"
          onSubmit={form.handleSubmit(handleSubmit, handleSubmitError)}
          ref={formRef}
        >
          <div className="space-y-10">
            <MyTestEditFormName />
            <MyTestEditFormSubjects />
            <MyTestEditFormGrades />
          </div>

          <div className="space-y-4">
            <MyTestEditFormQuestions />
            <MyTestEditFormAddQuestionBtn />
          </div>

          <MyTestEditFormEditTestBtn {...{ isLoading }} />
        </form>
      </MyTestEditFormContext.Provider>
    </FormProvider>
  );
}
