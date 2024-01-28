import { User } from "@prisma/client";

export default function getUsername(user: User | null) {
  return user?.name || user?.email || "Безымянный";
}
