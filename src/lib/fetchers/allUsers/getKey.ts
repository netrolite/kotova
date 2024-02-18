import { swrKeys } from "@/lib/constants";

type Params = {
  query?: string;
};

export default function allUsersGetKey(
  index: number,
  prevPageData: any,
  { query }: Params = {},
) {
  return `${swrKeys.allUsers}?page=${index}${query ? `&q=${query}` : ""}`;
}
