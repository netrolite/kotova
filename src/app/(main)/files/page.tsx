import PageTitle from "@/components/PageTitle";
import FilesFile from "@/components/files/File";
import { db } from "@/lib/db";

export default async function FilesPage() {
  const files = await db.testFile.findMany({
    orderBy: { createdAt: "desc" },
    include: { createdBy: true, tests: true },
  });
  return (
    <>
      <PageTitle className="mb-6">Файлы с теорией</PageTitle>
      <ul>
        {files.map(({ key, ...file }) => (
          <FilesFile key={key} {...file} fileKey={key} />
        ))}
      </ul>
    </>
  );
}
