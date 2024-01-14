import { CardTitle } from "@/components/ui/card";
import useUserTestResult from "@/lib/hooks/user/testResults/testResult";

type Props = {};

export default function UserTestResultTitle({}: Props) {
  const { test } = useUserTestResult();
  return <CardTitle className="text-xl tracking-normal">{test.name}</CardTitle>;
}
