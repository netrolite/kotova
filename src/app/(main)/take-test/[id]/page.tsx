import AvatarWithFallback from "@/components/AvatarWithFallback";
import PageTitle from "@/components/PageTitle";
import TakeTestQuestions from "@/components/takeTest/Questions";
import { dateFormatterDefaults, timeFormatterDefaults } from "@/lib/constants";
import takeTestGetTest from "@/lib/fetchers/takeTest/getTest";
import Link from "next/link";
import { notFound } from "next/navigation";

type Context = {
  params: { id: string };
};

export default async function TakeTest({ params: { id } }: Context) {
  const test = await takeTestGetTest(id);
  if (!test) notFound();
  const createdAtDateString = new Date(test.createdAt).toLocaleDateString(
    "ru",
    dateFormatterDefaults,
  );
  const createdAtTimeString = new Date(test.createdAt).toLocaleTimeString(
    "ru",
    timeFormatterDefaults,
  );

  return (
    <>
      <div className="mb-8 space-y-2">
        <div>
          <PageTitle className="">{test.name}</PageTitle>
          <h2 className="text-muted-foreground">{test.subject?.title}</h2>
        </div>
        <div>
          <time
            className="text-muted-foreground"
            dateTime={test.createdAt.toISOString()}
          >
            Тест создан {createdAtDateString} в {createdAtTimeString}
          </time>
          <Link
            className="flex w-min items-center gap-2 hover:underline"
            href={`/users/${test.createdBy?.id ?? "deleteduser"}`}
          >
            <AvatarWithFallback
              username={test.createdBy?.name ?? undefined}
              src={test.createdBy?.image ?? undefined}
            />
            <span className="whitespace-nowrap">
              {test.createdBy ? test.createdBy.name : "Удаленный пользователь"}
            </span>
          </Link>
        </div>
      </div>
      <TakeTestQuestions {...test} />
    </>
  );
}
