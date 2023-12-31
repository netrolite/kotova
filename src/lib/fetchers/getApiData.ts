import axios from "axios";
import { cache } from "react";

const getApiData = cache(async (url: string) => {
  return (await axios.get(url)).data;
});

export default getApiData;
