import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { dateFormatterDefaults, timeFormatterDefaults } from "@/lib/constants";
import getRelativeDateString from "@/lib/getRelativeDateString";
import useTakeTestContext from "@/lib/hooks/takeTest/context";

export default function TakeTestMetadataCreatedByUserPopover() {
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
    <Popover>
      <PopoverTrigger>{createdAtDateRelativeString}</PopoverTrigger>
      <PopoverContent className="max-w-max">
        {createdAtDateString} в {createdAtTimeString}
      </PopoverContent>
    </Popover>
  );
}
