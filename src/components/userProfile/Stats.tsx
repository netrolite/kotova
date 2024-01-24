import useUserProfileContext from "@/lib/hooks/user/context";
import KeyValue from "../KeyValue";

type Props = {};

export default function UserProfileStats({}: Props) {
  const { user } = useUserProfileContext();
  return (
    <div>
      <KeyValue label={"Пройдено тестов"}>{user._count.testResults}</KeyValue>
      <KeyValue label={"Пройдено тестов"}>{user._count.testResults}</KeyValue>
    </div>
  );
}
