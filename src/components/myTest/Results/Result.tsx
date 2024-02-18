import { ReactNode, useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { MyTestGetTestResultsReturn } from "@/lib/fetchers/myTest/getTestResults";
import Link from "next/link";
import AvatarWithFallback from "@/components/AvatarWithFallback";
import KeyValue from "@/components/KeyValue";
import { Button } from "@/components/ui/button";
import { dateToLocaleTimeString } from "@/lib/dateFormatters";
import formatTestScore from "@/lib/formatTestScore";

type Props = MyTestGetTestResultsReturn[number];

export default function MyTestResult({ id, image, name, testResults }: Props) {
  const [shouldShowResults, setShouldShowResults] = useState(false);

  const minTestResultScore = Math.min(
    ...testResults.map((result) => result.score),
  );
  const maxTestResultScore = Math.max(
    ...testResults.map((result) => result.score),
  );

  let testResultsElem: ReactNode;
  if (testResults.length > 1 && minTestResultScore !== maxTestResultScore) {
    testResultsElem = (
      <>
        <KeyValue label="Макс. баллы">
          {formatTestScore(maxTestResultScore)}
        </KeyValue>
        <KeyValue label="Мин. баллы">
          {formatTestScore(minTestResultScore)}
        </KeyValue>
      </>
    );
  } else {
    testResultsElem = (
      <KeyValue label="Баллы">
        {formatTestScore(
          Math.max(...testResults.map((result) => result.score)),
        )}
      </KeyValue>
    );
  }

  return (
    <li>
      <Card>
        <CardHeader>
          <Link
            href={`/users/${id}`}
            className="flex items-center gap-2 hover:text-primary"
          >
            <AvatarWithFallback
              src={image ?? undefined}
              username={name ?? undefined}
            />
            <p className="font-medium">{name ?? "Удаленный пользователь"}</p>
          </Link>
          <div>{testResultsElem}</div>
        </CardHeader>
        <CardContent className="space-y-2">
          <Button
            variant="outline"
            onClick={() => setShouldShowResults((prev) => !prev)}
          >
            {shouldShowResults
              ? "Скрыть прохождения теста"
              : "Показать прохождения теста"}
          </Button>
          {shouldShowResults && (
            <>
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
                        className="grid w-full grid-cols-2 rounded border px-3 py-1 hover:text-primary hover:underline"
                        href={`/test-result/${id}`}
                      >
                        <p>{createdAtString}</p>
                        {formatTestScore(score)}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </>
          )}
        </CardContent>
      </Card>
    </li>
  );
}
