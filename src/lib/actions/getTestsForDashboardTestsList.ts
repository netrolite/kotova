"use server";

import getSignedInUserOrRedirect from "../fetchers/getSignedInUserOrRedirect";
import getTestsForDashboardTestsList from "../fetchers/getTestsForDashboardTestsList";

export default async function getTestsForDashboardTestsListAction({
  page,
}: {
  page: number;
}) {
  const user = await getSignedInUserOrRedirect();
  return getTestsForDashboardTestsList({ user, page });
}
