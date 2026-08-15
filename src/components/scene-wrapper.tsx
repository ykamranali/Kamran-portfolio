"use client";

import dynamic from "next/dynamic";

const Scene = dynamic(() => import("./scene"), { ssr: false });

export default function SceneWrapper() {
  return <Scene />;
}
