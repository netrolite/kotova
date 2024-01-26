import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { dateFormatterDefaults, timeFormatterDefaults } from "@/lib/constants";
import getRelativeDateString from "@/lib/getRelativeDateString";
import useTestResultContext from "@/lib/hooks/testResult/context";

export default function TestResultMetadataTakenByUserTooltip() {
  const testResult = useTestResultContext();

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
    <TooltipProvider>
      <Tooltip delayDuration={0}>
        <TooltipTrigger>{takenAtDateRelativeString}</TooltipTrigger>
        <TooltipContent>
          {takenAtDateString} в {takenAtTimeString}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
