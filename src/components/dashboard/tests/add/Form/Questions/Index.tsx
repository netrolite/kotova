import { FormMessage } from "@/components/ui/form";
import { AddTestFormQuestionSchemaType } from "@/lib/zod/schemas/addTestForm/Question";
import { Separator } from "@/components/ui/separator";
import AddTestFormQuestionType from "./QuestionType";
import AddTestFormQuestionAnswerExplanation from "./QuestionAnswerExplanation";
import AddTestFormQuestionActions from "./Actions";
import AddTestFormQuestion from "./Question";
import { AddTestFormQuestions } from "../Index";
import AddTestFormQuestionText from "./QuestionText";
import { cn } from "@/lib/shadcnUtils";
import useAddTestFormContext from "@/lib/hooks/addTestForm/context";
import AddTestFormQuestionContext from "@/lib/contexts/addTestForm/question";
import AddTestFormQuestionContextProvider from "@/lib/contexts/addTestForm/questionProvider";

export type AddTestFormQuestionSchemaWithId = AddTestFormQuestionSchemaType & {
  id: string;
};

export default function AddTestFormQuestions() {
  const { questionsFields: questions } = useAddTestFormContext();

  if (!questions.fields.length) return null;
  return (
    <div className={cn("space-y-6")}>
      <h3 className="mb-4 text-xl font-semibold">Вопросы</h3>
      <div className="space-y-10">
        {questions.fields.map((question, i, arr) => {
          const isLast = arr.length - 1 === i;
          return (
            <div key={question.id} className="space-y-14">
              <AddTestFormQuestionContextProvider questionIndex={i}>
                <div className="space-y-3">
                  <div className="flex gap-2">
                    <p className="font-bold">Вопрос {i + 1}</p>
                    <AddTestFormQuestionActions />
                  </div>
                  <div className="space-y-4">
                    <AddTestFormQuestionType />
                    <AddTestFormQuestionText />
                    <AddTestFormQuestion />
                    <AddTestFormQuestionAnswerExplanation />
                  </div>
                  <FormMessage />
                </div>
              </AddTestFormQuestionContextProvider>

              {!isLast && <Separator />}
            </div>
          );
        })}
      </div>
    </div>
  );
}