import { Button } from "@/components/ui/button";
import AddSubjectForm from "./Form";
import ResponsiveDialog from "@/components/ResponsiveDialog";

export default function AddSubjectBtn() {
  return (
    <>
      <ResponsiveDialog
        trigger={<Button variant={"outline"}>Создать предмет</Button>}
        title="Создать новый предмет"
      >
        <AddSubjectForm />
      </ResponsiveDialog>
    </>
  );
}
