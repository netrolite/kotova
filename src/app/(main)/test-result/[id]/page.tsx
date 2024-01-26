import PageTitle from "@/components/PageTitle";
import TestResultAnswers from "@/components/testResult/Answers";
import { dateFormatterDefaults, timeFormatterDefaults } from "@/lib/constants";
import TestResultContextProvider from "@/lib/contexts/testResult/Index/Provider";
import getTestResult from "@/lib/fetchers/testResults/getTestResults";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import getRelativeDateString from "@/lib/getRelativeDateString";

type Context = {
  params: { id: string };
};

export default async function TestResult({
  params: { id: testResultId },
}: Context) {
  const testResult = await getTestResult(testResultId);
  if (!testResult) notFound();

  const takenAtDateString = new Date(testResult.createdAt).toLocaleDateString(
    "ru",
    dateFormatterDefaults,
  );
  const takenAtTimeString = new Date(testResult.createdAt).toLocaleTimeString(
    "ru",
    timeFormatterDefaults,
  );

  const takenAtDateRelativeString = getRelativeDateString(testResult.createdAt);

  return (
    <TestResultContextProvider {...testResult}>
      <div className="mb-8 space-y-2">
        <div className="flex flex-col">
          <Link className="w-min" href={`/take-test/${testResult.test.id}`}>
            <PageTitle>{testResult?.test?.name}</PageTitle>
          </Link>
          <Link
            className="w-min"
            href={`/subjects/${testResult.test.subject?.id}`}
          >
            <h2 className="text-muted-foreground">
              {testResult.test?.subject?.title}
            </h2>
          </Link>
        </div>

        <div className="flex flex-col">
          <div className="text-muted-foreground">
            Пройден пользователем{" "}
            <Link
              className="font-semibold text-black"
              href={`/users/${testResult.userId ?? "deleteduser"}`}
            >
              {testResult.user?.name}
            </Link>{" "}
            <TooltipProvider>
              <Tooltip delayDuration={0}>
                <TooltipTrigger>{takenAtDateRelativeString}</TooltipTrigger>
                <TooltipContent>
                  {takenAtDateString} в {takenAtTimeString}
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>
      </div>
      <TestResultAnswers />
    </TestResultContextProvider>
  );
}
