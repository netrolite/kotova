import useUserProfileContext from "@/lib/hooks/user/context";
import KeyValue from "../KeyValue";
import formatTestScore from "@/lib/formatTestScore";

type Props = {};

export default function UserProfileStats({}: Props) {
  const { user } = useUserProfileContext();
  return (
    <div>
      <KeyValue label={"Пройдено тестов"}>{user._count.testResults}</KeyValue>
      <KeyValue label={"Средний балл"}>
        {user.avgTestScore !== null
          ? formatTestScore(user.avgTestScore)
          : "Нет данных"}
      </KeyValue>
    </div>
  );
}
