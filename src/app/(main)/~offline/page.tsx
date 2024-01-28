import PageTitle from "@/components/PageTitle";
import { WifiOffIcon } from "lucide-react";

export default async function OfflineFallback() {
  return (
    <>
      <div className="flex items-center gap-4">
        <WifiOffIcon />
        <PageTitle>Вы не в сети</PageTitle>
      </div>
    </>
  );
}
