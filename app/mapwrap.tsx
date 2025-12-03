"use client";

import dynamic from "next/dynamic";

export const DynamicMap = dynamic(() => import("./map"), {
  loading: () => <p>Loading...</p>,
  ssr: false,
});
