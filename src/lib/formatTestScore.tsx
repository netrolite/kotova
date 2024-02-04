import roundTestScore from "./roundTestScore";

export default function formatTestScore(score: number) {
  const roundedScore = roundTestScore(score);
  return (
    <div className="flex gap-1">
      <span>{roundedScore}</span>
      <span>/</span>
      <span>100</span>
    </div>
  );
}
