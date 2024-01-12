"use client";

import { Test, TestQuestion, TestQuestionOption } from "@prisma/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import TakeTestQuestion from "./Question";
import { FieldErrors, FormProvider, useForm } from "react-hook-form";
import { toast } from "sonner";
import TakeTestSchema, { TakeTestSchemaType } from "@/lib/zod/schemas/takeTest";
import { zodResolver } from "@hookform/resolvers/zod";
import TakeTestQuestionContext from "@/lib/contexts/takeTest/question";
import FormSubmitBtn from "../Btns/Submit";
import useLoading from "@/lib/hooks/loading";
import takeTestGetQuestionsDefaultValues from "@/lib/takeTest/formGetDefaultValues";
import wait from "@/lib/wait";

type Props = Test & { questions: TakeTestQuestion[] };
export type TakeTestQuestion = TestQuestion & {
  options: TestQuestionOption[];
};

export default function TakeTestQuestions({ id, questions }: Props) {
  const { isLoading, setIsLoading } = useLoading();
  const form = useForm<TakeTestSchemaType>({
    resolver: zodResolver(TakeTestSchema),
    defaultValues: takeTestGetQuestionsDefaultValues(questions),
  });

  async function handleSubmit(formData: TakeTestSchemaType) {
    console.info(formData);
    toast.success("submit success");
    setIsLoading(true);
    try {
      await wait(1000);
    } catch (err) {
      toast.error("something went wrong during sumission");
    }
    setIsLoading(false);
  }

  function handleSubmitError(err: FieldErrors<TakeTestSchemaType>) {
    toast.error("could not submit");
    console.error(err);
  }

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit, handleSubmitError)}>
        <ul>
          {questions.map((question, i) => (
            <li key={question.id}>
              <Card>
                <CardHeader>
                  <CardTitle>{question.question}</CardTitle>
                </CardHeader>
                <CardContent>
                  <TakeTestQuestionContext.Provider
                    value={{ ...question, questionIndex: i }}
                  >
                    <TakeTestQuestion />
                  </TakeTestQuestionContext.Provider>
                </CardContent>
              </Card>
            </li>
          ))}
        </ul>
        <FormSubmitBtn {...{ isLoading }}>Проверить</FormSubmitBtn>
      </form>
    </FormProvider>
  );
}
