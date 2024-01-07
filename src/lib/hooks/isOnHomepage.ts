import { usePathname } from "next/navigation";

export default function useIsOnHomepage() {
  const pathname = usePathname();
  return pathname === "/";
}
