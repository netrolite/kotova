"use server";
import getCategoryTests, {
  GetCategoriesTestsParams as GetCategoriesTestsParams,
} from "../fetchers/getCategoryTests";

const getCategoryTestsAction = async (params: GetCategoriesTestsParams) =>
  getCategoryTests(params);

export default getCategoryTestsAction;
