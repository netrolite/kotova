"use client";

import UserProfileRecentTestResultsList from "./List";

type Props = {};

export default async function UserProfileRecentTestResults({}: Props) {
  return (
    <section>
      <h3 className="mb-6 text-xl font-medium">Недавно пройденные тесты</h3>
      <UserProfileRecentTestResultsList />
    </section>
  );
}
