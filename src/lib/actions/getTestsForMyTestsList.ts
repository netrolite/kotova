"use server";

import getSignedInUserOrRedirect from "../fetchers/getSignedInUserOrRedirect";
import getTestsForMyTestsList from "../fetchers/getTestsForMyTestsList";

export default async function getTestsForMyTestsListAction({
  page,
}: {
  page: number;
}) {
  const user = await getSignedInUserOrRedirect();
  return getTestsForMyTestsList({ user, page });
}
