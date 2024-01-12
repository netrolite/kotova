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
import styles from "./styles.module.scss";
import getSubjectTestsAction from "@/lib/actions/getSubjectTests";

type Props = Awaited<ReturnType<typeof getSubjectTestsAction>>[0];

export default function SubjectTestListCard({
  avgScore,
  grades,
  name,
  testResults,
  createdBy,
  id,
}: Props) {
  return (
    <Card key={id}>
      <CardHeader>
        <Link href={`/take-test/${id}`} className={styles.cardHeaderLink}>
          <h2 className="text-2xl font-semibold">{name}</h2>
          <CardDescription>{formatGrades(grades)}</CardDescription>
        </Link>
      </CardHeader>
      <CardContent>
        {avgScore && (
          <KeyValue
            title="Средний балл"
            value={avgScore ? `${avgScore}%` : "Нет данных"}
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
