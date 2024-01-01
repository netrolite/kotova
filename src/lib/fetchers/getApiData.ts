import { cache } from "react";

const getApiData = cache(async (url: string) => {
  return (await fetch(url)).json();
});

export default getApiData;
