import KeyValue from "@/components/KeyValue";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import formatGrades from "@/lib/formatGrades";
import roundTestScore from "@/lib/roundTestScore";
import { Test } from "@prisma/client";
import Link from "next/link";

type Props = Test & {
  subject: { title: string } | null;
  testResults: { id: string }[];
};

export default function DashboardTestsTestListTest({
  avgScore,
  grades,
  id,
  subject,
  name,
  testResults,
}: Props) {
  return (
    <li className="max-w-[500px]">
      <Link href={`/my/tests/${id}`}>
        <Card>
          <CardHeader>
            <CardTitle>{name}</CardTitle>
            <CardDescription>
              {!!grades.length && <span>{formatGrades(grades)}</span>}
              {subject && (
                <span>
                  {grades.length ? ` | ${subject.title}` : subject.title}
                </span>
              )}
            </CardDescription>
          </CardHeader>

          <CardContent>
            <ul>
              <KeyValue label="Средний балл">
                {avgScore ? `${roundTestScore(avgScore)}%` : "Нет данных"}
              </KeyValue>
              <KeyValue label="Раз пройден">{testResults.length}</KeyValue>
            </ul>
          </CardContent>
        </Card>
      </Link>
    </li>
  );
}
