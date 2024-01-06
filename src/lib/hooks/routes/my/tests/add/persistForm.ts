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
  setValue: UseFormSetValue<AddTestSchemaInputType>,
  formData: AddTestSchemaInputType,
) {
  const isMounted = useRef(false);

  useEffect(() => {
    const savedValue = localStorage.getItem(ADD_TEST_FORM_DATA_KEY);
    console.log(savedValue);
    const parsedSavedValue = parseJson(savedValue, AddTestSchemaSavedValues);
    if (parsedSavedValue) {
      for (const key in ADD_TEST_FORM_DEFAULT_VALUES) {
        console.log(key);
        setValue(
          key as keyof typeof parsedSavedValue,
          parsedSavedValue[key as keyof typeof parsedSavedValue],
        );
      }
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
