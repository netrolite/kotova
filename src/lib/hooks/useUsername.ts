import { useSession } from "next-auth/react";

export default function useUsername() {
  const { status, data } = useSession();
  return data?.user?.name || data?.user?.email || "Безымянный";
}
