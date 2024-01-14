export default function testResultFormatAnswer(
  answer: (string | null)[] | null,
) {
  if (!answer) return "Нет данных";
  else {
    const answerNoNulls = answer.filter(
      (answer) => answer !== null,
    ) as string[];
    return answerNoNulls.join(", ");
  }
}
