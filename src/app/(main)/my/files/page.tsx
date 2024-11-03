import AccessDenied from "@/components/AccessDenied";
import PageTitle from "@/components/PageTitle";
import FilesAddFile from "@/components/files/AddFile";
import FilesListFile, { FilesListFileProps } from "@/components/files/File";
import { Button } from "@/components/ui/button";
import { db } from "@/lib/db";
import getSignedInUserOrRedirect from "@/lib/fetchers/getSignedInUserOrRedirect";
import { ROLE } from "@/lib/types/enums/Role";

export default async function ManageFilesPage() {
  const user = await getSignedInUserOrRedirect();
  if (user.role !== ROLE.TEACHER && user.role !== ROLE.ADMIN) {
    return <AccessDenied />;
  }
  const rawFiles = await db.testFile.findMany({
    orderBy: { createdAt: "desc" },
    include: { tests: true, createdBy: true },
  });
  const files = rawFiles.map((file) => {
    const { key, ...obj } = file;
    const result: FilesListFileProps = { ...obj, fileKey: file.key };
    return result;
  });

  return (
    <>
      <PageTitle className="mb-6">Управление файлами</PageTitle>
      <FilesAddFile />
      <ul className="space-y-2">
        {files.map((file) => (
          <FilesListFile key={file.fileKey} {...file} />
        ))}
      </ul>
    </>
  );
}
