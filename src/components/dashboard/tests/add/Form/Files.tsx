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
import { Check, ChevronsUpDown, TrashIcon } from "lucide-react";
import { ChangeEvent, useRef, useState } from "react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/shadcnUtils";
import bytesToSize from "@/lib/bytesToSize";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { TestFile } from "@prisma/client";

const frameworks = [
  {
    value: "next.js",
    label: "Next.js",
  },
  {
    value: "sveltekit",
    label: "SvelteKit",
  },
  {
    value: "nuxt.js",
    label: "Nuxt.js",
  },
  {
    value: "remix",
    label: "Remix",
  },
  {
    value: "astro",
    label: "Astro",
  },
];

export default function AddTestFormFiles() {
  const filesInputRef = useRef<HTMLInputElement | null>(null);
  const { setError, setValue, control, clearErrors, watch, existingFiles } =
    useAddTestFormContext();
  const [isSendingFiles, setIsSendingFiles] = useState(false);
  const [isSelectFilesPopoverOpen, setIsSelectFilesPopoverOpen] =
    useState(false);
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
        formData.append("files[]", file);
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

  return (
    <>
      <FormItemField
        control={control}
        name="files"
        render={() => (
          <div>
            <h3 className="mb-2 text-xl font-semibold">Теория к тесту</h3>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">Выбрать файлы</Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                <DropdownMenuLabel>Выбрать</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {existingFiles.map((file) => (
                  <DropdownMenuCheckboxItem
                    checked={!!filesState.find((f) => f.key === file.key)}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        setValue("files", [
                          ...filesState,
                          existingFiles.find(
                            (f) => f.key === file.key,
                          ) as TestFile,
                        ]);
                      } else {
                        console.log("unchecked:");
                        console.log(file);
                        const filtered = filesState.filter(
                          (f) => f.key === file.key,
                        );
                        console.log("filtered:");
                        console.log(filtered);

                        setValue(
                          "files",
                          filesState.filter((f) => f.key !== file.key),
                        );
                      }
                    }}
                  >
                    {file.filename}
                  </DropdownMenuCheckboxItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
            <br />
            <Button
              type="button"
              onClick={() => filesInputRef.current?.click()}
            >
              Добавить новые файлы
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
                    {file.filename} ({bytesToSize(file.byteLength)})
                  </div>
                  <Button
                    className="h-auto bg-red-500 p-2 hover:bg-red-600"
                    type="button"
                    onClick={() => {
                      setValue(
                        "files",
                        filesState.filter((f) => f.key !== file.key),
                      );
                    }}
                  >
                    <TrashIcon />
                  </Button>
                </li>
              ))}
            </ul>
          </div>
        )}
      />
    </>
  );
}
