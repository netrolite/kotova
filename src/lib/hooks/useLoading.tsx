import { useState } from "react";

export default function useLoading() {
  const [isLoading, setIsLoading] = useState(false);
  return { isLoading, setIsLoading };
}
