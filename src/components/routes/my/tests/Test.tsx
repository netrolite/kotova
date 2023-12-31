import Li from "@/components/Li";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import getPercentage from "@/lib/getPercentage";
import { Test } from "@prisma/client";
import Link from "next/link";

type Props = {
  test: Test & { subject: { title: string }; testResults: { id: string }[] };
};

export default function TestListTest({
  test: { avgScore, grades, id, maxScore, subject, title, testResults },
}: Props) {
  const avgScorePercentage =
    avgScore && maxScore > 0 ? getPercentage(avgScore, maxScore) : null;
  return (
    <li className="max-w-[500px]">
      <Link href={`/my/tests/${id}`}>
        <Card>
          <CardHeader>
            <CardTitle>{title}</CardTitle>
            <CardDescription>
              {!!grades.length && (
                <span>
                  {grades.join(", ")} класс{grades.length > 1 ? "ы" : ""}
                </span>
              )}
              <span>
                {grades.length ? ` | ${subject.title}` : subject.title}
              </span>
            </CardDescription>
          </CardHeader>

          <CardContent>
            <ul>
              <Li
                title="Средний балл"
                value={`${
                  avgScore
                    ? `${avgScore}${maxScore ? ` из ${maxScore}` : ""} `
                    : "Нет данных"
                }${avgScorePercentage ? ` (${avgScorePercentage}%)` : ""}`}
              />
              <Li title="Раз пройден" value={testResults.length} />
            </ul>
          </CardContent>
        </Card>
      </Link>
    </li>
  );
}
