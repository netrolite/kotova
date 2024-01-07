import { useSession } from "next-auth/react";

export default function useUsername() {
  const { data } = useSession();
  return data?.user?.name || data?.user?.email || "Безымянный";
}
