import { TEST_QUESTION_TYPE } from "@/lib/types/enums/TestQuestionType";
import { z } from "zod";

const { CHECKBOX, RADIO, TABLE, TEXT } = TEST_QUESTION_TYPE;

const AddTestFormAddQuestionQuestionType = z
  .union([
    z.literal(TEXT),
    z.literal(RADIO),
    z.literal(CHECKBOX),
    z.literal(TABLE),
    z.null(),
  ])
  .refine((data) => data !== null, { message: "Не выбран тип вопроса" });

export default AddTestFormAddQuestionQuestionType;
