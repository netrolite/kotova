"use client";

import { ChangeEvent, useRef, useState } from "react";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import Loading from "../Loading/Loading";
import uploadFileAction from "@/lib/actions/uploadFile";

export default function ManageFilesAddFile() {
  const filesInputRef = useRef<HTMLInputElement>(null);
  const [isSendingFiles, setIsSendingFiles] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  async function handleFileInputChange(e: ChangeEvent<HTMLInputElement>) {
    const { files } = e.target;
    setError("");
    if (!files) return;

    try {
      setIsSendingFiles(true);

      const formData = new FormData();
      formData.append("file", files[0]);

      const { data: uploadedFile, error } = await uploadFileAction(formData);
      if (error || !uploadedFile) throw new Error("upload failed");
      router.refresh();
    } catch (error: any) {
      setError(`Не удалось добавить файл`);
      console.log(error);
    }
    setIsSendingFiles(false);
  }

  return (
    <>
      <Button
        className="mb-6"
        type="button"
        onClick={() => filesInputRef.current?.click()}
      >
        Добавить файл
      </Button>
      <input
        type="file"
        className="hidden"
        ref={filesInputRef}
        onChange={handleFileInputChange}
      />
      {isSendingFiles && (
        <div className="mt-4 flex items-center gap-2">
          <Loading className="mx-right" />
          <p>Загрузка файла</p>
        </div>
      )}
      {error && <p>{error}</p>}
    </>
  );
}
