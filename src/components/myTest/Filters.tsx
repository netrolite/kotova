"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import BtnWithIcon from "../Btns/WithIcon";
import { FilterIcon } from "lucide-react";
import { FormEvent, useEffect, useState } from "react";
import { Button } from "../ui/button";
import useMyTestResultsSwr from "@/lib/hooks/swr/myTestResults";
import useMyTestContext from "@/lib/contexts/myTest/useContext";
import updateUrlQueryString from "@/lib/updateUrlQueryString";
import { useDebouncedCallback } from "use-debounce";
import { Range } from "react-range";
import parseSearchParamNumber from "@/lib/parseSearchParamNumber";

const SCORE_DEFAULT = [0, 100];

// should probably use a filters object if more filters are needed
export default function MyTestFilters() {
  const { searchParams, setSearchParams, initSearchParams } =
    useMyTestContext();
  const [isOpen, setIsOpen] = useState(false);
  const [score, setScore] = useState(
    [
      parseSearchParamNumber(initSearchParams.get("scoreMin")) ??
        SCORE_DEFAULT[0],
      parseSearchParamNumber(initSearchParams.get("scoreMax")) ??
        SCORE_DEFAULT[1],
    ].sort(),
  );
  const enabledFiltersAmount = [
    JSON.stringify(score) !== JSON.stringify(SCORE_DEFAULT),
  ].filter((filter) => filter === true).length;
  const { mutate } = useMyTestResultsSwr();

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsOpen(false);
    mutate();
  }

  useEffect(() => {
    setSearchParams((prevSearchParams) => {
      const sp = new URLSearchParams(prevSearchParams);

      sp.delete("scoreMin");
      if (score[0] !== SCORE_DEFAULT[0]) {
        sp.append("scoreMin", score[0].toString());
      }
      sp.delete("scoreMax");
      if (score[1] !== SCORE_DEFAULT[1]) {
        sp.append("scoreMax", score[1].toString());
      }

      return sp;
    });
  }, [score]);

  useEffect(() => updateUrlQueryStringDebounced(), [searchParams.toString()]);

  const updateUrlQueryStringDebounced = useDebouncedCallback(() => {
    updateUrlQueryString(searchParams);
  }, 200);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <BtnWithIcon variant="outline" icon={<FilterIcon width={16} />}>
          Фильтры {enabledFiltersAmount ? `(${enabledFiltersAmount})` : null}
        </BtnWithIcon>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Фильтры</DialogTitle>
        </DialogHeader>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="space-y-2">
            <span>Баллы</span>
            <div className="flex items-center gap-4">
              <div className="w-10 rounded border p-1 text-center font-mono">
                {score[0]}
              </div>
              <Range
                min={0}
                max={100}
                values={score}
                onChange={(val) => setScore(val)}
                renderTrack={({ props, children }) => (
                  <div {...props} className="h-2 flex-grow rounded bg-primary">
                    {children}
                  </div>
                )}
                renderThumb={({ props }) => (
                  <div
                    {...props}
                    key={props.key}
                    className="h-5 w-5 rounded-full border border-white bg-primary"
                  />
                )}
              />
              <div className="w-10 rounded border p-1 text-center font-mono">
                {score[1]}
              </div>
            </div>
          </div>

          <Button>Применить фильтры</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
