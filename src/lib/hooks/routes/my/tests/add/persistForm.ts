import AddTestSchema, {
  AddTestSchemaInputType,
  AddTestSchemaSavedValues,
  AddTestSchemaType,
} from "@/lib/zod/schemas/AddTest";
import { ADD_TEST_FORM_DEFAULT_VALUES } from "@/components/routes/my/tests/add/Form/Index";
import { UseFormSetValue } from "react-hook-form";
import { useEffect, useRef } from "react";
import parseJson from "@/lib/parseJson";

const ADD_TEST_FORM_DATA_KEY = "add-test-form";

export default function usePersistAddTestForm(
  formData: AddTestSchemaInputType,
  setValue: UseFormSetValue<AddTestSchemaInputType>,
) {
  const isMounted = useRef(false);

  useEffect(() => {
    const rawSavedValue = localStorage.getItem(ADD_TEST_FORM_DATA_KEY);
    const savedValue = parseJson(rawSavedValue, AddTestSchemaSavedValues);
    if (!savedValue) return;

    for (const k in ADD_TEST_FORM_DEFAULT_VALUES) {
      const key = k as keyof typeof ADD_TEST_FORM_DEFAULT_VALUES;
      setValue(key, savedValue[key]);
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
