import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { dateFormatterDefaults, timeFormatterDefaults } from "@/lib/constants";
import getRelativeDateString from "@/lib/getRelativeDateString";
import useTakeTestContext from "@/lib/hooks/takeTest/context";

export default function TakeTestMetadataCreatedByUserTooltip() {
  const testResult = useTakeTestContext();

  const createdAtDateString = new Date(testResult.createdAt).toLocaleDateString(
    "ru",
    dateFormatterDefaults,
  );
  const createdAtTimeString = new Date(testResult.createdAt).toLocaleTimeString(
    "ru",
    timeFormatterDefaults,
  );
  const createdAtDateRelativeString = getRelativeDateString(
    testResult.createdAt,
  );

  return (
    <TooltipProvider>
      <Tooltip delayDuration={0}>
        <TooltipTrigger>{createdAtDateRelativeString}</TooltipTrigger>
        <TooltipContent>
          {createdAtDateString} в {createdAtTimeString}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
