import AddTestFormQuestionContextProvider from "@/lib/contexts/addTestForm/questionProvider";
import useAddTestFormContext from "@/lib/hooks/addTestForm/context";
import AddTestFormQuestionActions from "./Actions";
import AddTestFormQuestionType from "./QuestionType";
import AddTestFormQuestionText from "./QuestionText";
import AddTestFormQuestion from "./Question";
import AddTestFormQuestionAnswerExplanation from "./QuestionAnswerExplanation";
import { FormMessage } from "@/components/ui/form";
import { Separator } from "@/components/ui/separator";

type Props = {};

export default function AddTestFormQuestionList({}: Props) {
  const { questionsFields: questions } = useAddTestFormContext();
  if (!questions.fields.length) return null;
  return (
    <ul className="space-y-10">
      {questions.fields.map((question, i, arr) => {
        const isLast = arr.length - 1 === i;
        return (
          <li key={question.id} className="space-y-14">
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
          </li>
        );
      })}
    </ul>
  );
}
