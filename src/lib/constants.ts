export const genericErrorMsg = "Что-то пошло не так. Попробуйте еще раз позже!";
export const MY_TESTS_LIST_TESTS_PER_PAGE = 30;
export const SUBJECT_TESTS_TESTS_PER_PAGE = 30;
export const allGrades = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11] as const;
export type Grade = (typeof allGrades)[number];
