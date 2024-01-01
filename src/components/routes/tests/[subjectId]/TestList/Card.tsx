import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import formatGrades from "@/lib/formatGrades";
import KeyValue from "@/components/KeyValue";
import TestListTestAvatar from "./Avatar";
import Link from "next/link";
import getPercentage from "@/lib/getPercentage";
import styles from "./styles.module.scss";
import { Test, User } from "@prisma/client";

type Props = Test & {
  createdBy: User;
  testResults: {
    id: string;
  }[];
};

export default function TestListCard({
  avgScore,
  maxScore,
  grades,
  title,
  testResults,
  createdBy,
  id,
}: Props) {
  const avgScorePercentage =
    avgScore && maxScore > 0 ? getPercentage(avgScore, maxScore) : null;

  return (
    <Card key={id}>
      <CardHeader>
        <Link href={`/take-test`} className={styles.cardHeaderLink}>
          <h2 className="text-2xl font-semibold">{title}</h2>
          <CardDescription>{formatGrades(grades)}</CardDescription>
        </Link>
      </CardHeader>
      <CardContent>
        {avgScore && (
          <KeyValue
            title="Средний балл"
            value={
              avgScorePercentage
                ? `${avgScore} из ${maxScore} (${avgScorePercentage}%)`
                : "Нет данных"
            }
          />
        )}
        <KeyValue title="Раз пройден" value={testResults.length} />
      </CardContent>
      <CardFooter>
        <Link
          className="flex gap-2 hover:underline"
          href={`/users/${createdBy.id}`}
        >
          <TestListTestAvatar user={createdBy} />
          {createdBy.name}
        </Link>
      </CardFooter>
    </Card>
  );
}
