import BtnWithLoading from "@/components/Btns/WithLoading";
import { Button } from "@/components/ui/button";
import getTestFileUrlAction from "@/lib/actions/getTestFileUrl";
import { GENERIC_ERROR_MSG } from "@/lib/constants";
import { FileIcon } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";

export default function TakeTestFile({
  filename,
  fileKey,
}: {
  filename: string;
  fileKey: string;
}) {
  const [fileUrl, setFileUrl] = useState<string | null>(null);
  const [isLoadingFileUrl, setIsLoadingFileUrl] = useState(false);

  async function getFileUrl(key: string, filename: string) {
    setIsLoadingFileUrl(true);
    const { data: url, error } = await getTestFileUrlAction({ key, filename });
    setIsLoadingFileUrl(false);
    if (error || !url) {
      toast.error(GENERIC_ERROR_MSG);
      return null;
    }
    setFileUrl(url);
  }

  return (
    <li className="space-y-3 rounded-md border p-3">
      <div className="flex items-center gap-2">
        <FileIcon className="flex-shrink-0" />
        <p className="line-clamp-1">{filename}</p>
      </div>
      <div className="space-y-2">
        <BtnWithLoading
          isLoading={isLoadingFileUrl}
          onClick={() => getFileUrl(fileKey, filename)}
        >
          Получить ссылку на файл
        </BtnWithLoading>
        {fileUrl && (
          <div>
            <Link href={fileUrl} target="_blank">
              <Button>Открыть ссылку</Button>
            </Link>
          </div>
        )}
      </div>
    </li>
  );
}
