/**
 * This function should only be used on the client side because it depends on the `window` object
 */
export default function updateUrlQueryString(searchParams: URLSearchParams) {
  const queryString = searchParams.toString();
  const newUrl = `${location.origin}${location.pathname}${
    queryString ? `?${queryString}` : ""
  }`;
  history.replaceState(null, "", newUrl);
}
