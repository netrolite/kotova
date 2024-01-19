export default function roundTestScore(score: number) {
  if (Number.isInteger(score)) return score;
  return score.toFixed(1);
}
