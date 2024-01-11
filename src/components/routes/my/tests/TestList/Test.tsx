import KeyValue from "@/components/KeyValue";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import formatGrades from "@/lib/formatGrades";
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
              <span>
                {grades.length ? ` | ${subject.title}` : subject.title}
              </span>
            </CardDescription>
          </CardHeader>

          <CardContent>
            <ul>
              <KeyValue
                title="Средний балл"
                value={avgScore ? `${avgScore}%` : "Нет данных"}
              />
              <KeyValue title="Раз пройден" value={testResults.length} />
            </ul>
          </CardContent>
        </Card>
      </Link>
    </li>
  );
}
