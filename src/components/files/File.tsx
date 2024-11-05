"use client";

import getTestFileUrlAction from "@/lib/actions/getTestFileUrl";
import {
  GENERIC_ERROR_MSG,
  dateFormatterDefaults,
  timeFormatterDefaults,
} from "@/lib/constants";
import { toast } from "sonner";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import KeyValue from "../KeyValue";
import Link from "next/link";
import { Button } from "../ui/button";
import { useState } from "react";
import BtnWithLoading from "../Btns/WithLoading";

export type FilesFileProps = {
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

export default function FilesFile({
  filename,
  createdAt,
  fileKey,
  tests,
  createdBy,
}: FilesFileProps) {
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
                ? tests.map((test, index) => (
                    <Link
                      key={test.id}
                      className="hover:text-primary hover:underline"
                      href={`/take-test/${test.id}`}
                    >
                      {test.name}
                      {index + 1 === tests.length ? "" : ", "}
                    </Link>
                  ))
                : "Нет"}
              {}
            </KeyValue>
          </ul>
        </CardContent>
      </Card>
    </li>
  );
}
