import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { dateFormatterDefaults, timeFormatterDefaults } from "@/lib/constants";
import getRelativeDateString from "@/lib/getRelativeDateString";
import useTestResultContext from "@/lib/hooks/testResult/context";

export default function TestResultMetadataTakenByUserPopover() {
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
    <Popover>
      <PopoverTrigger>{takenAtDateRelativeString}</PopoverTrigger>
      <PopoverContent className="max-w-max">
        {takenAtDateString} в {takenAtTimeString}
      </PopoverContent>
    </Popover>
  );
}
