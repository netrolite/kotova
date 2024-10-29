"use client";

import useTakeTestContext from "@/lib/hooks/takeTest/context";
import TakeTestFile from "./File";

export default function TakeTestFiles() {
  const test = useTakeTestContext();
  if (!test.files.length) return null;

  return (
    <div>
      <h3 className="mb-2 text-xl font-semibold">Файлы с теорией к тесту</h3>
      <ul className="mb-8">
        {test.files.map((file) => (
          <TakeTestFile
            key={file.key}
            filename={file.filename}
            fileKey={file.key}
          />
        ))}
      </ul>
    </div>
  );
}
