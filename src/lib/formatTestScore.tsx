import roundTestScore from "./roundTestScore";

export default function formatTestScore(score: number | null) {
  const roundedScore = roundTestScore(score);
  if (!roundedScore) return null;
  return (
    <div className="flex gap-1">
      <span>{roundedScore}</span>
      <span>/</span>
      <span>100</span>
    </div>
  );
}
