/**
 * first page is 0, not 1!
 * @returns
 */
export default function getPagination({
  itemsPerPage,
  page,
}: {
  itemsPerPage: number;
  page: number;
}) {
  return { skip: page * itemsPerPage, take: itemsPerPage };
}
