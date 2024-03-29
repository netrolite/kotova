export default function roundTestScore(score: number | null) {
  if (score === null) return null;
  if (Number.isInteger(score)) return score;

  const scoreRoundedToInt = Math.round(score);
  const isDiffBetweenRoundedAndNormalScoreNegligible =
    Math.abs(scoreRoundedToInt - score) < 0.1;

  if (isDiffBetweenRoundedAndNormalScoreNegligible) {
    return scoreRoundedToInt;
  }

  return score.toFixed(1);
}
