import KeyValue from "@/components/KeyValue";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import formatGrades from "@/lib/formatGrades";
import formatTestScore from "@/lib/formatTestScore";
import { Test } from "@prisma/client";
import Link from "next/link";
import cardStyles from "@/styles/card.module.scss";

type Props = Test & {
  category: { title: string } | null;
  testResults: { id: string }[];
};

export default function DashboardTestsTestListTest({
  avgScore,
  grades,
  id,
  category,
  name,
  testResults,
}: Props) {
  return (
    <li className="max-w-[500px]">
      <Link className="hover:no-underline" href={`/my/tests/${id}`}>
        <Card className={cardStyles.card}>
          <CardHeader>
            <CardTitle>{name}</CardTitle>
            <CardDescription>
              {!!grades.length && <span>{formatGrades(grades)}</span>}
              {category && (
                <span>
                  {grades.length ? ` | ${category.title}` : category.title}
                </span>
              )}
            </CardDescription>
          </CardHeader>

          <CardContent>
            <ul>
              <KeyValue label="Средний балл">
                {avgScore !== null ? formatTestScore(avgScore) : "Нет данных"}
              </KeyValue>
              <KeyValue label="Раз пройден">{testResults.length}</KeyValue>
            </ul>
          </CardContent>
        </Card>
      </Link>
    </li>
  );
}
