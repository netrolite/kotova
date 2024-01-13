import { cache } from "react";

const getApiData = cache(async (url: string) => {
  return (await fetch(url, { cache: 'no-store' })).json();
});

export default getApiData;
