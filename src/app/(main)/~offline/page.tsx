import PageTitle from "@/components/PageTitle";
import { WifiOffIcon } from "lucide-react";

export default async function OfflineFallback() {
  return (
    <>
      <div className="flex gap-2">
        <WifiOffIcon />
        <PageTitle> Вы не в сети</PageTitle>
      </div>
    </>
  );
}
