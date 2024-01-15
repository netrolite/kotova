import { cache } from "react";

const getApiData = cache(async (url: string) => {
  // fetch only caches data on the server, not the client,
  // so there's no need to specify `{ cache: "no-store"}`
  return (await fetch(url)).json();
});

export default getApiData;
