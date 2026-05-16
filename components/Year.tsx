"use client";

import { useSyncExternalStore } from "react";

function getYearSnapshot(): string {
  return String(new Date().getFullYear());
}

function subscribe(cb: () => void): () => void {
  const id = setInterval(cb, 86_400_000);
  return () => clearInterval(id);
}

function getServerSnapshot(): string {
  return "2026";
}

export function Year() {
  const year = useSyncExternalStore(subscribe, getYearSnapshot, getServerSnapshot);
  return <>{year}</>;
}
