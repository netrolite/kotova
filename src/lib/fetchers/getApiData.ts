import axios from "axios";
import { cache } from "react";
import wait from "../wait";

const getApiData = cache(async (url: string) => {
  await wait(1000);
  return (await axios.get(url)).data;
});

export default getApiData;
