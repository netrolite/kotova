"use client";

import { Test, TestQuestion, TestQuestionOption } from "@prisma/client";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import TakeTestQuestion from "./Question";
import { FieldErrors, FormProvider, useForm } from "react-hook-form";
import { toast } from "sonner";
import TakeTestSchema, { TakeTestSchemaType } from "@/lib/zod/schemas/takeTest";
import { zodResolver } from "@hookform/resolvers/zod";
import TakeTestQuestionContext from "@/lib/contexts/takeTest/question";
import FormSubmitBtn from "../Btns/Submit";
import useLoading from "@/lib/hooks/loading";
import takeTestFormGetDefaultValues from "@/lib/takeTest/formGetDefaultValues";
import TakeTestQuestionError from "./QuestionError";
import checkTestAnswers from "@/lib/actions/checkTestAnswers";
import { GENERIC_ERROR_MSG } from "@/lib/constants";

type Props = Test & { questions: TakeTestQuestion[] };
export type TakeTestQuestion = TestQuestion & {
  options: TestQuestionOption[];
};

export default function TakeTestQuestions({ id: testId, questions }: Props) {
  const { isLoading, setIsLoading } = useLoading();
  const form = useForm<TakeTestSchemaType>({
    resolver: zodResolver(TakeTestSchema),
    defaultValues: takeTestFormGetDefaultValues({ questions, testId }),
  });

  async function handleSubmit(formData: TakeTestSchemaType) {
    console.info(formData);
    setIsLoading(true);
    const result = await checkTestAnswers(formData);
    if (result.data) toast.success("Тест отправлен на проверку");
    else toast.error(GENERIC_ERROR_MSG);
    setIsLoading(false);
  }

  function handleSubmitError(err: FieldErrors<TakeTestSchemaType>) {
    toast.error(
      "Не удалось отправить ответы на проверку. Пожалуйста, проверьте введенные данные на ошибки",
    );
    console.error(err);
  }

  return (
    <FormProvider {...form}>
      <form
        className="space-y-8"
        onSubmit={form.handleSubmit(handleSubmit, handleSubmitError)}
      >
        <ul className="space-y-6">
          {questions.map((question, i) => (
            <li key={question.id}>
              <TakeTestQuestionContext.Provider
                value={{ ...question, questionIndex: i }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle>{question.question}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <TakeTestQuestion />
                  </CardContent>
                  <CardFooter>
                    <TakeTestQuestionError questionIndex={i} />
                  </CardFooter>
                </Card>
              </TakeTestQuestionContext.Provider>
            </li>
          ))}
        </ul>
        <FormSubmitBtn {...{ isLoading }}>Проверить</FormSubmitBtn>
      </form>
    </FormProvider>
  );
}
