import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import formatGrades from "@/lib/formatGrades";
import KeyValue from "@/components/KeyValue";
import SubjectTestListTestAvatar from "./Avatar";
import Link from "next/link";
import getPercentage from "@/lib/getPercentage";
import styles from "./styles.module.scss";
import getSubjectTestsAction from "@/lib/actions/getSubjectTests";

type Props = Awaited<ReturnType<typeof getSubjectTestsAction>>[0];

export default function SubjectTestListCard({
  avgScore,
  maxScore,
  grades,
  name,
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
          <h2 className="text-2xl font-semibold">{name}</h2>
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
          href={createdBy?.id ? `/users/${createdBy.id}` : "/users/deleted"}
        >
          <SubjectTestListTestAvatar user={createdBy} />
          {createdBy?.name || "Удаленный пользователь"}
        </Link>
      </CardFooter>
    </Card>
  );
}
