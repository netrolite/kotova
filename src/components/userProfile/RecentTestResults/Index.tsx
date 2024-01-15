import UserProfileRecentTestResultsList from "./List";

type Props = {};

export default function UserProfileRecentTestResults({}: Props) {
  return (
    <section>
      <h3 className="mb-6 text-xl font-medium">Недавно пройденные тесты</h3>
      <UserProfileRecentTestResultsList />
    </section>
  );
}
