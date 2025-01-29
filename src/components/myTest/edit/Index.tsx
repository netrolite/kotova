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
import MyTestEditFormCategories from "./Categories";
import SelectItemType from "@/lib/types/SelectItem";
import MyTestEditFormName from "./Name";
import { RefObject, useCallback, useRef } from "react";
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
import HiddenInput from "@/components/HiddenInput";
import useEditTestFormStore from "@/lib/stores/editTestForm";

type Props = {
  categories: SelectItemType<string>[];
  test: MyTestEditGetTestReturn;
};

export type MyTestEditFormQuestions =
  UseFieldArrayReturn<MyTestEditFormSchemaType>;

export default function MyTestEditForm({ categories, test }: Props) {
  const router = useRouter();
  const form = useForm<MyTestEditFormSchemaType>({
    resolver: zodResolver(MyTestEditFormSchema),
    defaultValues: { ...test, categoryId: test.categoryId ?? undefined, files: [] },
  });
  const formRef = useRef<HTMLFormElement>(null);
  const questions = useFieldArray<MyTestEditFormSchemaType>({
    control: form.control,
    name: "questions",
  });
  const { isLoading, setIsLoading } = useLoading();
  const [setIsEditTestDialogOpen] = useEditTestFormStore((s) => [
    s.setIsEditTestDialogOpen,
  ]);

  const handleSubmit = useCallback(
    async (formData: MyTestEditFormSchemaType) => {
      setIsLoading(true);
      const { error } = await editTestAction(formData);
      if (error) {
        setIsLoading(false);
        return toast.error(
          "Что-то пошло не так при изменении теста. Пожалуйста, попробуйте позже",
        );
      }
      toast.success("Тест успешно изменён");
      router.replace(`/my/tests/${test.id}`);
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
        value={{
          questionsFields: questions,
          categories: categories,
          formRef: formRef as RefObject<HTMLFormElement>,
          test,
        }}
      >
        <form
          className="space-y-16"
          onSubmit={(e) => {
            setIsEditTestDialogOpen(false);
            form.handleSubmit(handleSubmit, handleSubmitError)(e);
          }}
          ref={formRef}
        >
          <div className="space-y-10">
            <MyTestEditFormName />
            <MyTestEditFormCategories />
            <MyTestEditFormGrades />
          </div>

          <div className="space-y-4">
            <MyTestEditFormQuestions />
            <MyTestEditFormAddQuestionBtn />
          </div>

          <HiddenInput {...form.register("testId")} value={test.id} />
          <MyTestEditFormEditTestBtn {...{ isLoading }} />
        </form>
      </MyTestEditFormContext.Provider>
    </FormProvider>
  );
}
