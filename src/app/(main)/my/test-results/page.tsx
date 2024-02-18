import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import PageTitle from "@/components/PageTitle";
import { Button } from "@/components/ui/button";
import getOwnTestResults from "@/lib/fetchers/getOwnTestResults";
import getSignedInUserOrRedirect from "@/lib/fetchers/getSignedInUserOrRedirect";
import Link from "next/link";
import getRelativeDateString from "@/lib/getRelativeDateString";
import cardStyles from "@/styles/card.module.scss";
import KeyValue from "@/components/KeyValue";
import formatTestScore from "@/lib/formatTestScore";
import AvatarWithFallback from "@/components/AvatarWithFallback";

export default async function OwnTestResults() {
  const user = await getSignedInUserOrRedirect();
  const testResults = await getOwnTestResults(user.id);
  return (
    <>
      <PageTitle className="mb-6">Тесты, пройденные вами</PageTitle>
      {!testResults.length && (
        <>
          <p className="mb-2 text-muted-foreground">
            Вы еще не прошли ни один тест
          </p>
          <Link href="/subjects">
            <Button>Пройти тест</Button>
          </Link>
        </>
      )}
      <ul className="space-y-2">
        {testResults.map((result) => (
          <li key={result.id}>
            <Card className="space-y-2 p-6">
              <Link
                className={`${cardStyles.card} hover:no-underline`}
                href={`/test-result/${result.id}`}
              >
                <div className="space-y-1">
                  <h2 className="text-2xl font-semibold">{result.test.name}</h2>
                  <CardDescription>
                    Пройден {getRelativeDateString(result.createdAt)}
                  </CardDescription>
                </div>
                <KeyValue childrenContainerClassName="text-black" label="Баллы">
                  {formatTestScore(result.score)}
                </KeyValue>
              </Link>
              <Link
                href={`/users/${result.test.createdByUserId ?? "deleted"}`}
                className="flex items-center gap-2 hover:text-primary hover:underline"
              >
                <AvatarWithFallback
                  username={
                    result.test.createdBy?.name || "Удаленный пользователь"
                  }
                  src={result.test.createdBy?.image ?? undefined}
                />
                {result.test.createdBy?.name || "Удаленный пользователь"}
              </Link>
            </Card>
          </li>
        ))}
      </ul>
    </>
  );
}
