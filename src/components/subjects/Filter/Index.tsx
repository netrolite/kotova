"use client";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { FilterIcon } from "lucide-react";
import SubjectTestListFilterOption from "./Option";
import useSearchParamsRouter from "@/lib/hooks/searchParamsRouter";
import useUrlSearchParams from "@/lib/hooks/urlSearchParams";
import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import parseUriComponent from "@/lib/parseUriComponent";
import { z } from "zod";
import SubjectTestListFilterPillsList from "./PillsList";
import useGradesFilterStore from "@/lib/stores/gradesFilter";

type Props = {};

export default function SubjectTestListFilter({}: Props) {
  const {
    allGrades,
    selectedGrades,
    setSelectedGrades,
    isFilterDialogOpen,
    setIsFilterDialogOpen,
  } = useGradesFilterStore();
  const router = useSearchParamsRouter();
  const { getSearchParams } = useUrlSearchParams();
  const searchParams = useSearchParams();

  useEffect(() => {
    const gradesRaw = searchParams.get("grades") || "";
    const parsedGrades = parseUriComponent(gradesRaw, z.number().array()) || [];
    setSelectedGrades(parsedGrades);
  }, []);

  function applyFilter() {
    const params = getSearchParams();
    if (!selectedGrades.length) params.delete("grades");
    else {
      const stringifiedGrades = encodeURIComponent(
        JSON.stringify(selectedGrades),
      );
      params.set("grades", stringifiedGrades);
    }

    router.replace(params);
  }

  return (
    <>
      <Dialog open={isFilterDialogOpen} onOpenChange={setIsFilterDialogOpen}>
        <DialogTrigger asChild>
          <Button variant="outline" className="space-x-2">
            <FilterIcon width={20} />
            <span>Фильтр по классу</span>
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Фильтр по классу</DialogTitle>
            <DialogDescription>
              Выберите те классы, тесты для которых вы хотите увидеть
            </DialogDescription>
          </DialogHeader>
          <section className="space-y-2">
            {allGrades.map((grade) => (
              <SubjectTestListFilterOption grade={grade} key={grade} />
            ))}
          </section>
          <DialogClose asChild>
            <Button onClick={applyFilter}>Применить фильтр</Button>
          </DialogClose>
        </DialogContent>
      </Dialog>
      <SubjectTestListFilterPillsList />
    </>
  );
}
