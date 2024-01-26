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
          <p className="text-muted-foreground">
            Создан пользователем{" "}
            <Link
              className="text-black hover:underline"
              href={`/users/${test.createdBy?.id ?? "/deleteduser"}`}
            >
              {test.createdBy?.name ?? "Удаленный пользователь"}
            </Link>{" "}
            {createdAtDateString} в {createdAtTimeString}
          </p>
        </div>
      </div>
      <TakeTestQuestions {...test} />
    </>
  );
}
