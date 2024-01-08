import { ADD_TEST_FORM_DEFAULT_VALUES } from "@/components/routes/my/tests/add/Form/Index";
import { UseFormReturn } from "react-hook-form";
import { useEffect, useRef } from "react";
import parseJson from "@/lib/parseJson";
import {
  AddTestFormSavedValuesSchema,
  AddTestFormSchemaType,
} from "@/lib/zod/schemas/addTestForm/Index";

const ADD_TEST_FORM_DATA_KEY = "add-test-form";

export default function usePersistAddTestForm(
  form: UseFormReturn<AddTestFormSchemaType>,
) {
  const { setValue, getValues, watch } = form;
  watch(); // trigger a re-render when the form updates
  const formData = getValues();
  const isMounted = useRef(false);

  useEffect(() => {
    const rawSavedValues = localStorage.getItem(ADD_TEST_FORM_DATA_KEY);
    const savedValues = parseJson(rawSavedValues, AddTestFormSavedValuesSchema);
    if (!savedValues) return;

    for (const k in ADD_TEST_FORM_DEFAULT_VALUES) {
      const key = k as keyof typeof ADD_TEST_FORM_DEFAULT_VALUES;
      setValue(key, savedValues[key]);
    }
  }, []);

  useEffect(() => {
    if (isMounted.current) {
      localStorage.setItem(ADD_TEST_FORM_DATA_KEY, JSON.stringify(formData));
    } else {
      isMounted.current = true;
    }
  }, [formData]);
}
