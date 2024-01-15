import UserProfileTestResultContext from "@/lib/contexts/user/testResult";
import useUserProfileContext from "@/lib/hooks/user/context";
import UserProfileTestResult from "./Result/Index";

type Props = {};

export default function UserProfileRecentTestResultsList({}: Props) {
  const { user } = useUserProfileContext();
  const { testResults } = user;

  if (!testResults.length)
    return (
      <p className="text-muted-foreground">
        Пользователь {user.name} ещё не прошел ни одного теста
      </p>
    );

  return (
    <ul className="space-y-6">
      {testResults.map((testResult) => (
        <UserProfileTestResultContext.Provider
          key={testResult.id}
          value={testResult}
        >
          <UserProfileTestResult />
        </UserProfileTestResultContext.Provider>
      ))}
    </ul>
  );
}
