import { ArrowLeft } from "lucide-react";
import { Button } from "../../ui/button";
import { useRouter } from "next/navigation";

export function HeaderBackBtn() {
  const router = useRouter();
  return (
    <Button
      variant="ghost"
      className="rounded-full hover:bg-slate-100 active:bg-slate-200 aspect-square p-1"
      onClick={router.back}
    >
      <ArrowLeft />
    </Button>
  );
}
