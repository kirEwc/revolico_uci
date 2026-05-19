"use client";

import { createContext, useContext, useSyncExternalStore, useCallback, type ReactNode } from "react";

const STORAGE_KEY = "favorites";

let cached: string[] | null = null;

function read(): string[] {
  if (cached !== null) return cached;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    cached = raw ? JSON.parse(raw) : [];
  } catch {
    cached = [];
  }
  return cached as string[];
}

function write(ids: string[]): void {
  cached = ids;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(ids));
}

function getSnapshot(): string[] {
  return read();
}

function subscribe(cb: () => void): () => void {
  const handler = () => { cached = null; cb(); };
  window.addEventListener("storage", handler);
  return () => window.removeEventListener("storage", handler);
}

const EMPTY: string[] = [];

function getServerSnapshot(): string[] {
  return EMPTY;
}

type FavoritesContextType = {
  favorites: string[];
  toggle: (id: string) => void;
  isFavorite: (id: string) => boolean;
  count: number;
};

const FavoritesContext = createContext<FavoritesContextType | null>(null);

export function FavoritesProvider({ children }: { children: ReactNode }) {
  const favorites = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const toggle = useCallback((id: string) => {
    const current = read();
    if (current.includes(id)) {
      write(current.filter((f) => f !== id));
    } else {
      write([...current, id]);
    }
    window.dispatchEvent(new Event("storage"));
  }, []);

  const isFavorite = useCallback((id: string) => favorites.includes(id), [favorites]);

  return (
    <FavoritesContext.Provider value={{ favorites, toggle, isFavorite, count: favorites.length }}>
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites(): FavoritesContextType {
  const ctx = useContext(FavoritesContext);
  if (!ctx) throw new Error("useFavorites must be used within FavoritesProvider");
  return ctx;
}
