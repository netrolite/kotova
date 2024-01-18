import homepageGetRecentlyCreatedTests from "@/lib/fetchers/homepage/getRecentlyCreatedTests";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import formatGrades from "@/lib/formatGrades";
import styles from "./styles.module.scss";

type Props = {};

export default async function HomepageRecentlyCreatedTests({}: Props) {
  const tests = await homepageGetRecentlyCreatedTests();
  if (!tests.length)
    return (
      <p className="text-muted-foreground">Ещё не был создан ни один тест</p>
    );

  return (
    <ul className="space-y-2">
      {tests.map(({ name, grades, subject, id, createdAt }) => {
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
          <li key={id}>
            <Link href={`/take-test/${id}`}>
              <Card className={styles.testCard}>
                <CardHeader className="pb-4">
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
                  Создан {createdAtStringDayMonth} в {createdAtStringTime}
                </CardContent>
              </Card>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
