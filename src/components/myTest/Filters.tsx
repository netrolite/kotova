"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
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
import { useSearchParams } from "next/navigation";
import updateUrlQueryString from "@/lib/updateUrlQueryString";
import { useDebouncedCallback } from "use-debounce";
import { Range } from "react-range";

const SCORE_DEFAULT = [0, 100];

export default function MyTestFilters() {
  const [score, setScore] = useState(SCORE_DEFAULT);
  const {
    test: { id: testId },
  } = useMyTestContext();
  const initSearchParams = useSearchParams();
  const [searchParams, setSearchParams] = useState(
    new URLSearchParams(initSearchParams),
  );
  const { mutate } = useMyTestResultsSwr({ testId, searchParams });
  console.log(score);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
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
  }, 300);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <BtnWithIcon variant="outline" icon={<FilterIcon width={16} />}>
          Фильтры
        </BtnWithIcon>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Фильтры</DialogTitle>
        </DialogHeader>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label>
              Баллы
              <Range
                min={0}
                max={100}
                values={score}
                onChange={(val) => setScore(val)}
                renderTrack={({ props, children }) => (
                  <div {...props} className="h-2 bg-gray-500">
                    {children}
                  </div>
                )}
                renderThumb={({ props }) => (
                  <div
                    {...props}
                    key={props.key}
                    className="h-4 w-4 rounded-full bg-primary"
                  />
                )}
              />
            </label>
          </div>

          <Button>Применить фильтры</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
