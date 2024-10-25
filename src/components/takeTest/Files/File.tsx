import BtnWithIcon from "@/components/Btns/WithIcon";
import getTestFileUrlAction from "@/lib/actions/getTestFileUrl";
import { GENERIC_ERROR_MSG } from "@/lib/constants";
import { FileIcon, ViewIcon } from "lucide-react";
import { toast } from "sonner";

export default function TakeTestFile({
  filename,
  fileKey,
}: {
  filename: string;
  fileKey: string;
}) {
  async function getFileUrl() {
    const { data, error } = await getTestFileUrlAction({
      key: fileKey,
      filename,
    });
    if (error) toast.error(GENERIC_ERROR_MSG);
    else return data;
  }

  async function viewFile() {
    const url = await getFileUrl();
    if (!url) return;
    window.open(url, "_blank");
  }

  return (
    <li className="space-y-3 rounded-md border p-3">
      <div className="flex items-center gap-2">
        <FileIcon className="flex-shrink-0" />
        <p className="line-clamp-1">{filename}</p>
      </div>
      <div className="space-y-1">
        <BtnWithIcon onClick={viewFile} variant="outline" icon={<ViewIcon />}>
          Посмотреть
        </BtnWithIcon>
      </div>
    </li>
  );
}
