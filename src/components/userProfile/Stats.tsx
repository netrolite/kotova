import useUserProfileContext from "@/lib/hooks/user/context";
import KeyValue from "../KeyValue";
import roundTestScore from "@/lib/roundTestScore";

type Props = {};

export default function UserProfileStats({}: Props) {
  const { user } = useUserProfileContext();
  return (
    <div>
      <KeyValue label={"Пройдено тестов"}>{user._count.testResults}</KeyValue>
      <KeyValue label={"Средний балл"}>
        {user.avgTestScore !== null
          ? `${roundTestScore(user.avgTestScore)}%`
          : "Нет данных"}
      </KeyValue>
    </div>
  );
}
