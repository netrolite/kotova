export default function getTestScore({
  correctAnswersAmount,
  questionsAmount,
}: {
  correctAnswersAmount: number;
  questionsAmount: number;
}) {
  return (correctAnswersAmount / questionsAmount) * 100;
}
