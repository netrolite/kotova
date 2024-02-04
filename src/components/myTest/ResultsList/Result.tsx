import { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { MyTestGetTestResultsReturn } from "@/lib/fetchers/myTest/getTestResults";
import Link from "next/link";
import AvatarWithFallback from "@/components/AvatarWithFallback";
import KeyValue from "@/components/KeyValue";
import { Button } from "@/components/ui/button";
import DynamicHeight from "@/components/DynamicHeight";
import { dateToLocaleTimeString } from "@/lib/dateFormatters";
import roundTestScore from "@/lib/roundTestScore";

type Props = MyTestGetTestResultsReturn[number];

export default function MyTestResult({ id, image, name, testResults }: Props) {
  const [showResults, setShowResults] = useState(true);

  return (
    <li key={id}>
      <Card>
        <CardHeader>
          <Link href={`/users/${id}`} className="flex items-center gap-2">
            <AvatarWithFallback
              src={image ?? undefined}
              username={name ?? undefined}
            />
            <p className="font-medium">{name ?? "Удаленный пользователь"}</p>
          </Link>
          <div>
            <KeyValue label="Макс. баллы">
              {roundTestScore(
                Math.max(...testResults.map((result) => result.score)),
              )}
              %
            </KeyValue>
            <KeyValue label="Мин. баллы">
              {roundTestScore(
                Math.max(...testResults.map((result) => result.score)),
              )}
              %
            </KeyValue>
          </div>
        </CardHeader>
        <CardContent className="space-y-2">
          <Button
            variant="outline"
            onClick={() => setShowResults((prev) => !prev)}
          >
            {showResults
              ? "Скрыть прохождения теста"
              : "Показать прохождения теста"}
          </Button>
          <DynamicHeight isOpen={showResults} className="max-w-[400px]">
            <div className="grid grid-cols-2">
              <p>Дата</p>
              <p>Баллы</p>
            </div>
            <ul className="space-y-1">
              {testResults.map(({ createdAt, id, score }) => {
                const createdAtString = dateToLocaleTimeString(createdAt, {
                  month: "long",
                  day: "numeric",
                });
                return (
                  <li key={id}>
                    <Link
                      className="grid w-full grid-cols-2 rounded border px-3 py-1"
                      href={`/test-result/${id}`}
                    >
                      <p>{createdAtString}</p>
                      <p>{roundTestScore(score)}%</p>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </DynamicHeight>
        </CardContent>
      </Card>
    </li>
  );
}
