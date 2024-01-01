export default function formatGrades(grades: number[]) {
  return `${grades.join(", ")} класс${grades.length > 1 ? "ы" : ""}`;
}
