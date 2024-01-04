import KeyValue from "@/components/KeyValue";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import formatGrades from "@/lib/formatGrades";
import getPercentage from "@/lib/getPercentage";
import { Test } from "@prisma/client";
import Link from "next/link";

type Props = Test & {
  subject: { title: string };
  testResults: { id: string }[];
};

export default function MyTestsTestListTest({
  avgScore,
  grades,
  id,
  maxScore,
  subject,
  name,
  testResults,
}: Props) {
  const avgScorePercentage =
    avgScore && maxScore > 0 ? getPercentage(avgScore, maxScore) : null;
  return (
    <li className="max-w-[500px]">
      <Link href={`/my/tests/${id}`}>
        <Card>
          <CardHeader>
            <CardTitle>{name}</CardTitle>
            <CardDescription>
              {!!grades.length && <span>{formatGrades(grades)}</span>}
              <span>
                {grades.length ? ` | ${subject.title}` : subject.title}
              </span>
            </CardDescription>
          </CardHeader>

          <CardContent>
            <ul>
              <KeyValue
                title="Средний балл"
                value={`${
                  avgScore
                    ? `${avgScore}${maxScore ? ` из ${maxScore}` : ""} `
                    : "Нет данных"
                }${avgScorePercentage ? ` (${avgScorePercentage}%)` : ""}`}
              />
              <KeyValue title="Раз пройден" value={testResults.length} />
            </ul>
          </CardContent>
        </Card>
      </Link>
    </li>
  );
}
