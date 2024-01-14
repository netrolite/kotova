import useUserContext from "@/lib/hooks/user/context";
import useUserTestResultContext from "@/lib/hooks/user/testResults/testResultContext";
import Link from "next/link";
import { ReactNode } from "react";
import { toast } from "sonner";

type Props = {
  children: ReactNode;
};

export default function UserTestResultLink({ children }: Props) {
  const { testId, id: testResultId } = useUserTestResultContext();
  const { signedInUser } = useUserContext();

  const hasSignedInUserTakenThisTest = !!signedInUser?.testResults.find(
    (signedInUserTestResult) => signedInUserTestResult.testId === testId,
  );

  if (hasSignedInUserTakenThisTest) {
    return <Link href={`/test-result/${testResultId}`}>{children}</Link>;
  }

  return (
    <div
      className="cursor-pointer"
      onClick={() =>
        toast.error(
          "Вы не можете просмотреть этот результат теста, потому что ещё ни разу не проходили этот тест",
        )
      }
    >
      {children}
    </div>
  );
}
