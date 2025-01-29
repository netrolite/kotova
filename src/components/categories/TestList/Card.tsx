import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import formatGrades from "@/lib/formatGrades";
import KeyValue from "@/components/KeyValue";
import CategoryTestListTestAvatar from "./Avatar";
import Link from "next/link";
import getCategoryTestsAction from "@/lib/actions/getCategoryTests";
import formatTestScore from "@/lib/formatTestScore";

type Props = Awaited<ReturnType<typeof getCategoryTestsAction>>[0];

export default function CategoryTestListCard({
  avgScore,
  grades,
  name,
  testResults,
  createdBy,
  createdAt,
  id,
}: Props) {

  const createdAtStringDayMonth = new Date(createdAt).toLocaleDateString(
    "ru",
    {
      day: "numeric",
      month: "long",
    },
  );
  const createdAtStringTime = new Date(createdAt).toLocaleTimeString(
    "ru",
    {
      hour: "2-digit",
      minute: "2-digit",
    },
  );

  return (
    <Card key={id}>
      <Link href={`/take-test/${id}`}>
        <CardHeader>
          <h2 className="text-2xl font-semibold">{name}</h2>
          <CardDescription>{formatGrades(grades)}</CardDescription>
        </CardHeader>
        <CardContent>
          <KeyValue label="Средний балл">
            {avgScore !== null ? formatTestScore(avgScore) : "Нет данных"}
          </KeyValue>
          <KeyValue label="Раз пройден">{testResults.length}</KeyValue>
          <KeyValue label="Дата создания">{createdAtStringDayMonth} в {createdAtStringTime}</KeyValue>
        </CardContent>
      </Link>
      <CardFooter>
        <Link
          className="flex items-center gap-2 hover:text-primary hover:underline"
          href={createdBy?.id ? `/users/${createdBy.id}` : "/users/deleted"}
        >
          <CategoryTestListTestAvatar user={createdBy} />
          {createdBy ? createdBy.name : "Удаленный пользователь"}
        </Link>
      </CardFooter>
    </Card>
  );
}
