import { dateFormatterDefaults } from "@/lib/constants";
import useUserTestResultContext from "@/lib/hooks/user/testResults/testResultContext";

type Props = {};

export default function UserProfileTestResultDescription({}: Props) {
  const { test, createdAt } = useUserTestResultContext();
  const createdAtString = new Date(createdAt).toLocaleDateString(
    "ru",
    dateFormatterDefaults,
  );

  return (
    <>
      <div className="space-y-0 text-sm text-muted-foreground">
        <p>{test.category?.title || ""}</p>
        <p>Пройден {createdAtString}</p>
      </div>
    </>
  );
}
