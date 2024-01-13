import { Session } from "next-auth";

export default function getRole(session: Session | null): number | null {
  if (!session) return null;
  return (session.user as any)?.role ?? null;
}
