"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
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

export type FilesListFileProps = {
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

export default function FilesListFile({
  tests,
  filename,
  fileKey,
  byteLength,
  createdAt,
  createdBy,
}: FilesListFileProps) {
  const [error, setError] = useState("");
  const router = useRouter();
  const createdAtDateString = createdAt
    ? new Date(createdAt).toLocaleDateString("ru", dateFormatterDefaults)
    : null;
  const createdAtTimeString = createdAt
    ? new Date(createdAt).toLocaleTimeString("ru", timeFormatterDefaults)
    : null;

  async function viewFile(key: string, filename: string) {
    const { data: url, error } = await getTestFileUrlAction({ key, filename });
    if (error || !url) return toast.error(GENERIC_ERROR_MSG);

    console.log(url);
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
            onClick={() => viewFile(fileKey, filename)}
          >
            {filename}
          </CardTitle>
          <CardDescription>desciprtion</CardDescription>
        </CardHeader>

        <CardContent>
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
                    <Link key={test.id} href={`/my/tests/${test.id}`}>
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
