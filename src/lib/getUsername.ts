import { Session } from "next-auth";

export default function getUsername(session: Session | null) {
  return session?.user?.name || session?.user?.email || "Безымянный";
}
