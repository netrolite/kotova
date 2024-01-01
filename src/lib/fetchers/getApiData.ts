import { cache } from "react";
import p from "phin";
import { Subject } from "@prisma/client";

const getApiData = cache(async (url: string) => {
  return (await p<Subject[]>({ url, parse: "json" })).body;
});

export default getApiData;
