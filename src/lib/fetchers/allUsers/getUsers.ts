import { db } from "@/lib/db";
import { cache } from "react";

export const USERS_PER_PAGE = 10;

type Params = {
  query?: string;
  page: number;
};

const getUsers = cache(({ query, page }: Params) => {
  return db.user.findMany({
    where: {
      name: {
        contains: query,
        mode: "insensitive",
      },
    },
    select: {
      id: true,
      name: true,
      email: true,
      image: true,
      role: true,
      avgTestScore: true,
      phone: true,
    },
    skip: USERS_PER_PAGE * page,
    take: USERS_PER_PAGE,
  });
});

export type GetUsersReturn = Exclude<
  Awaited<ReturnType<typeof getUsers>>,
  null
>;

export default getUsers;
