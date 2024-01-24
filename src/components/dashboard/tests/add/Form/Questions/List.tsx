import AddTestFormQuestionContextProvider from "@/lib/contexts/addTestForm/questionProvider";
import useAddTestFormContext from "@/lib/hooks/addTestForm/context";
import AddTestFormQuestionActions from "./Actions";
import AddTestFormQuestionText from "./QuestionText";
import AddTestFormQuestion from "./Question";
import AddTestFormQuestionAnswerExplanation from "./QuestionAnswerExplanation";
import { FormMessage } from "@/components/ui/form";
import { Separator } from "@/components/ui/separator";
import AddTestFormQuestionType from "./QuestionType";

type Props = {};

export default function AddTestFormQuestionList({}: Props) {
  const { questionsFields: questions } = useAddTestFormContext();
  if (!questions.fields.length) return null;
  return (
    <ul className="space-y-10">
      {questions.fields.map((question, i, arr) => {
        const isLast = arr.length - 1 === i;
        return (
          <li key={question.id}>
            <AddTestFormQuestionContextProvider questionIndex={i}>
              <div className="mb-1 flex gap-2">
                <p className="font-bold">Вопрос {i + 1}</p>
                <AddTestFormQuestionActions />
              </div>
              <AddTestFormQuestionType />

              <div>
                <AddTestFormQuestionText />
                <AddTestFormQuestion />
                <AddTestFormQuestionAnswerExplanation />
              </div>
              <FormMessage />
            </AddTestFormQuestionContextProvider>

            {!isLast && <Separator />}
          </li>
        );
      })}
    </ul>
  );
}
