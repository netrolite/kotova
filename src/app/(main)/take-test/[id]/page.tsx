import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import PageTitle from "@/components/PageTitle";
import TakeTestQuestions from "@/components/takeTest/Questions";
import { dateFormatterDefaults, timeFormatterDefaults } from "@/lib/constants";
import takeTestGetTest from "@/lib/fetchers/takeTest/getTest";
import Link from "next/link";
import { notFound } from "next/navigation";
import getRelativeDateString from "@/lib/getRelativeDateString";

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
  const createdAtDateRelativeString = getRelativeDateString(test.createdAt);

  return (
    <>
      <div className="mb-8 space-y-2">
        <div className="flex flex-col">
          <Link className="w-min" href={`/take-test/${test.id}`}>
            <PageTitle>{test.name}</PageTitle>
          </Link>
          <Link className="w-min" href={`/subjects/${test.subject?.id}`}>
            <h2 className="text-muted-foreground">{test.subject?.title}</h2>
          </Link>
        </div>
        <div>
          <div className="text-muted-foreground">
            Создан пользователем{" "}
            <Link
              className="font-semibold text-black"
              href={`/users/${test.createdBy?.id ?? "/deleteduser"}`}
            >
              {test.createdBy?.name ?? "Удаленный пользователь"}
            </Link>{" "}
            <TooltipProvider>
              <Tooltip delayDuration={0}>
                <TooltipTrigger>{createdAtDateRelativeString}</TooltipTrigger>
                <TooltipContent>
                  {createdAtDateString} в {createdAtTimeString}
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>
      </div>
      <TakeTestQuestions {...test} />
    </>
  );
}
