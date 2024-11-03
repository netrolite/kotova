"use client";

import FormItemField from "@/components/Form/ItemField";
import Loading from "@/components/Loading/Loading";
import { Button } from "@/components/ui/button";
import { FormMessage } from "@/components/ui/form";
import deleteFileAction from "@/lib/actions/deleteFile";
import uploadFilesAction from "@/lib/actions/uploadFiles";
import {
  ADD_TEST_FORM_MAX_FILES_AMOUNT,
  MAX_FILE_SIZE_BYTES,
  errCodes,
} from "@/lib/constants";
import useAddTestFormContext from "@/lib/hooks/addTestForm/context";
import { TrashIcon } from "lucide-react";
import { ChangeEvent, useRef, useState } from "react";

export default function AddTestFormFiles() {
  const filesInputRef = useRef<HTMLInputElement | null>(null);
  const { setError, setValue, control, clearErrors, watch } =
    useAddTestFormContext();
  const [isSendingFiles, setIsSendingFiles] = useState(false);
  const filesState = watch("files");

  async function handleFilesInputChange(e: ChangeEvent<HTMLInputElement>) {
    const { files } = e.target;
    if (!files) return;
    clearErrors();

    try {
      if (files.length > ADD_TEST_FORM_MAX_FILES_AMOUNT) {
        throw new Error(errCodes.TOO_MANY_FILES);
      }

      const formData = new FormData();
      for (let i = 0; i < files.length; i += 1) {
        const file = files[i];
        if (file.size > MAX_FILE_SIZE_BYTES) {
          throw new Error(errCodes.FILE_TOO_BIG);
        }
        formData.append("file", file);
      }

      setIsSendingFiles(true);

      const { data: uploadedFiles, error } = await uploadFilesAction(formData);
      if (error || !uploadedFiles) throw new Error("upload failed");

      setValue("files", [...filesState, ...uploadedFiles]);
    } catch (error: any) {
      if (error?.message === errCodes.TOO_MANY_FILES) {
        setError("files", {
          message: `Слишком много файлов. Максимум ${ADD_TEST_FORM_MAX_FILES_AMOUNT}`,
        });
      } else if (error?.message === errCodes.FILE_TOO_BIG) {
        setError("files", {
          message: `Слишком большой файл. Максимальный размер ${
            MAX_FILE_SIZE_BYTES / 1_000_000
          } мегабайт`,
        });
      } else {
        setError("files", { message: `Не удалось добавить файл` });
      }
      console.log("file error");
      console.log(error);
    }
    setIsSendingFiles(false);
  }

  async function deleteFile(fileKey: string) {
    const { error } = await deleteFileAction({ fileKey });
    if (error) setError("files", { message: "Не удалось удалить файл" });

    const newFiles = filesState.filter((file) => file.key === fileKey);
    setValue("files", newFiles);
  }

  return (
    <FormItemField
      control={control}
      name="files"
      render={() => (
        <div>
          <h3 className="mb-2 text-xl font-semibold">Теория к тесту</h3>
          <Button type="button" onClick={() => filesInputRef.current?.click()}>
            Добавить файлы
          </Button>
          <input
            type="file"
            className="hidden"
            ref={filesInputRef}
            onChange={handleFilesInputChange}
            multiple
          />
          {isSendingFiles && (
            <div className="mt-4 flex items-center gap-2">
              <Loading className="mx-right" />
              <p>Загрузка файлов</p>
            </div>
          )}

          <FormMessage />

          <ul className="mt-2 space-y-2">
            {filesState.map((file) => (
              <li
                key={file.key}
                className="flex items-center justify-between rounded-lg border p-3"
              >
                <div>
                  {file.filename} (
                  {(file.byteLength / 1_000_000).toPrecision(1)} мегабайт)
                </div>
                <Button
                  className="h-auto bg-red-500 p-2 hover:bg-red-600"
                  type="button"
                  onClick={() => deleteFile(file.key)}
                >
                  <TrashIcon />
                </Button>
              </li>
            ))}
          </ul>
        </div>
      )}
    />
  );
}
