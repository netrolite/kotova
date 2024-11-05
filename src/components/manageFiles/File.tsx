"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import getTestFileUrlAction from "@/lib/actions/getTestFileUrl";
import {
  GENERIC_ERROR_MSG,
  dateFormatterDefaults,
  timeFormatterDefaults,
} from "@/lib/constants";
import Link from "next/link";
import { toast } from "sonner";
import KeyValue from "../KeyValue";
import bytesToSize from "@/lib/bytesToSize";
import { useState } from "react";
import deleteFileAction from "@/lib/actions/deleteFile";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import BtnWithLoading from "../Btns/WithLoading";

export type ManageFilesListFileProps = {
  filename: string;
  fileKey: string;
  createdAt: Date | null;
  byteLength: number;
  createdBy: {
    image: string | null;
    id: string;
    role: number;
    name: string | null;
    email: string | null;
    emailVerified: Date | null;
    phone: string | null;
    password: string | null;
    createdAt: Date;
    avgTestScore: number | null;
  } | null;
  tests: {
    id: string;
    name: string;
    createdAt: Date;
    createdByUserId: string | null;
    avgScore: number | null;
    updatedAt: Date;
    grades: number[];
    categoryId: string | null;
  }[];
};

export default function ManageFilesListFile({
  tests,
  filename,
  fileKey,
  byteLength,
  createdAt,
  createdBy,
}: ManageFilesListFileProps) {
  const [error, setError] = useState("");
  const router = useRouter();
  const [fileUrl, setFileUrl] = useState<string | null>(null);
  const [isLoadingFileUrl, setIsLoadingFileUrl] = useState(false);

  const createdAtDateString = createdAt
    ? new Date(createdAt).toLocaleDateString("ru", dateFormatterDefaults)
    : null;
  const createdAtTimeString = createdAt
    ? new Date(createdAt).toLocaleTimeString("ru", timeFormatterDefaults)
    : null;

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

  async function deleteFile(fileKey: string) {
    const { error } = await deleteFileAction({ fileKey });
    if (error) return setError("Не удалось удалить файл");
    router.refresh();
  }

  return (
    <li className="max-w-[500px]">
      <Card>
        <CardHeader>
          <CardTitle
            className="hover:cursor-pointer hover:text-primary hover:underline"
            onClick={() => getFileUrl(fileKey, filename)}
          >
            {filename}
          </CardTitle>
        </CardHeader>

        <CardContent>
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
          <ul>
            <KeyValue label="Добавлен пользователем">
              <Link
                className="hover:text-primary hover:underline"
                href={`/users/${createdBy?.id || "not-found"}`}
              >
                {createdBy?.name || "Удаленный пользователь"}
              </Link>
            </KeyValue>

            <KeyValue label="Дата добавления">
              {createdAtDateString} в {createdAtTimeString}
            </KeyValue>

            <KeyValue label="Используется в тестах">
              {tests.length
                ? tests.map((test) => (
                    <Link
                      key={test.id}
                      className="hover:text-primary hover:underline"
                      href={`/my/tests/${test.id}`}
                    >
                      {test.name}
                    </Link>
                  ))
                : "Нет"}
              {}
            </KeyValue>

            <KeyValue label="Размер">{bytesToSize(byteLength)}</KeyValue>
          </ul>
          <Button disabled={!!tests.length} onClick={() => deleteFile(fileKey)}>
            Удалить файл
          </Button>
          {error && <p>{error}</p>}
        </CardContent>
      </Card>
    </li>
  );
}
