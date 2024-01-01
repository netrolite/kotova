"use server";
import getSubjectTests, {
  GetSubjectsTestsParams,
} from "../fetchers/getSubjectTests";

const getSubjectTestsAction = async (params: GetSubjectsTestsParams) =>
  getSubjectTests(params);

export default getSubjectTestsAction;
