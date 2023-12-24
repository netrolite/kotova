import { ArrowLeft } from "lucide-react";
import { Button } from "../../ui/button";
import { useRouter } from "next/navigation";

export function HeaderBackBtn() {
  const router = useRouter();
  return (
    <Button
      variant="ghost"
      onClick={router.back}
      className="aspect-square rounded-full p-1 hover:bg-slate-100 active:bg-slate-200"
    >
      <ArrowLeft />
    </Button>
  );
}
