import { dateFormatterReasonableDefaults } from "@/lib/constants";
import useUserTestResultContext from "@/lib/hooks/user/testResults/testResultContext";

type Props = {};

export default function UserTestResultDescription({}: Props) {
  const { test, createdAt } = useUserTestResultContext();
  const createdAtString = new Date(createdAt).toLocaleDateString(
    "ru",
    dateFormatterReasonableDefaults,
  );

  return (
    <>
      <div className="space-y-0 text-sm text-muted-foreground">
        <p>{test.subject?.title || ""}</p>
        <p>Пройден {createdAtString}</p>
      </div>
    </>
  );
}
