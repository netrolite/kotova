"use client";

import { useEffect } from "react";

export default function IpLogger() {
  useEffect(() => {
    fetch("/api/log-ip");
  }, []);

  return null;
}
