import { TestResultAnswerContextType } from "../../contexts/testResult/Answer";

type Params = {
  options: TestResultAnswerContextType["options"];
  question: TestResultAnswerContextType["question"];
};

export default function testResultGetAnswerForCheckboxQuestion({
  options,
  question,
}: Params) {
  const checkedOptions = options.filter((option) => option.isChecked);
  return checkedOptions.map((checkedOption) => {
    const matchingQuestionOption = question.options.find(
      (option) => option.id === checkedOption.testQuestionOptionId,
    );
    return matchingQuestionOption?.content || null;
  });
}
