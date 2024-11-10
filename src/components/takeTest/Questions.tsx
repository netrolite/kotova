"use client";

import { TestQuestion, TestQuestionOption } from "@prisma/client";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import TakeTestQuestion from "./Question";
import { FieldErrors, FormProvider, useForm } from "react-hook-form";
import { toast } from "sonner";
import TakeTestSchema, { TakeTestSchemaType } from "@/lib/zod/schemas/takeTest";
import { zodResolver } from "@hookform/resolvers/zod";
import TakeTestQuestionContext from "@/lib/contexts/takeTest/question/Index";
import FormSubmitBtn from "../Btns/Submit";
import useLoading from "@/lib/hooks/loading";
import takeTestFormGetDefaultValues from "@/lib/takeTest/formGetDefaultValues";
import TakeTestQuestionError from "./QuestionError";
import checkTestAnswers from "@/lib/actions/checkTestAnswers";
import { GENERIC_ERROR_MSG } from "@/lib/constants";
import { useRouter } from "next/navigation";
import useTakeTestContext from "@/lib/hooks/takeTest/context";

export type TakeTestQuestion = TestQuestion & {
  options: TestQuestionOption[];
};

export default function TakeTestQuestions() {
  const { id: testId, questions } = useTakeTestContext();
  const router = useRouter();
  const { isLoading, setIsLoading } = useLoading();
  const form = useForm<TakeTestSchemaType>({
    resolver: zodResolver(TakeTestSchema),
    defaultValues: takeTestFormGetDefaultValues({ questions, testId }),
  });

  async function handleSubmit(formData: TakeTestSchemaType) {
    try {
      setIsLoading(true);
      const result = await checkTestAnswers(formData);
      if (result.error || !result.data) throw new Error();
      router.replace(`/test-result/${result.data.testResultId}`);
    } catch (err) {
      setIsLoading(false);
      toast.error(GENERIC_ERROR_MSG);
    }
  }

  function handleSubmitError(err: FieldErrors<TakeTestSchemaType>) {
    toast.error(
      "Не удалось отправить ответы на проверку. Пожалуйста, проверьте введенные данные на ошибки",
    );
    console.error(err);
  }
  console.log(questions);

  return (
    <>
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
                      <h3 className="whitespace-pre-line text-lg font-semibold leading-normal">
                        {question.question}
                      </h3>
                    </CardHeader>
                    <CardContent>
                      <TakeTestQuestion />
                    </CardContent>
                    <TakeTestQuestionError questionIndex={i} />
                  </Card>
                </TakeTestQuestionContext.Provider>
              </li>
            ))}
          </ul>
          <FormSubmitBtn {...{ isLoading }}>Проверить</FormSubmitBtn>
        </form>
      </FormProvider>
    </>
  );
}
