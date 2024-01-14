import { CardTitle } from "@/components/ui/card";
import useUserTestResultContext from "@/lib/hooks/user/testResults/testResultContext";

type Props = {};

export default function UserTestResultTitle({}: Props) {
  const { test } = useUserTestResultContext();
  return <CardTitle className="text-xl tracking-normal">{test.name}</CardTitle>;
}
