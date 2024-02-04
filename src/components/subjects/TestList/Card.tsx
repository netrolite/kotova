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
import cardStyles from "@/styles/card.module.scss";
import getSubjectTestsAction from "@/lib/actions/getSubjectTests";
import formatTestScore from "@/lib/formatTestScore";

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
      <Link
        href={`/take-test/${id}`}
        className={`${cardStyles.card} hover:no-underline`}
      >
        <CardHeader>
          <h2 className="text-2xl font-semibold">{name}</h2>
          <CardDescription>{formatGrades(grades)}</CardDescription>
        </CardHeader>
        <CardContent>
          <KeyValue
            label="Средний балл"
            childrenContainerClassName="text-foreground"
          >
            {avgScore !== null ? formatTestScore(avgScore) : "Нет данных"}
          </KeyValue>
          <KeyValue
            label="Раз пройден"
            childrenContainerClassName="text-foreground"
          >
            {testResults.length}
          </KeyValue>
        </CardContent>
      </Link>
      <CardFooter>
        <Link
          className="flex items-center gap-2"
          href={createdBy?.id ? `/users/${createdBy.id}` : "/users/deleted"}
        >
          <SubjectTestListTestAvatar user={createdBy} />
          {createdBy ? createdBy.name : "Удаленный пользователь"}
        </Link>
      </CardFooter>
    </Card>
  );
}
