"use client";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Search, Heart, User, Menu } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";
import { useSyncExternalStore, useRef, type FormEvent } from "react";
import { useFavorites } from "@/lib/favorites";

function getDarkSnapshot(): boolean {
  return document.documentElement.classList.contains("dark");
}

function subscribe(cb: () => void): () => void {
  const observer = new MutationObserver(cb);
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
  return () => observer.disconnect();
}

function getServerSnapshot(): boolean {
  return false;
}

export default function Navbar() {
  const dark = useSyncExternalStore(subscribe, getDarkSnapshot, getServerSnapshot);
  const { count } = useFavorites();
  const router = useRouter();
  const desktopRef = useRef<HTMLInputElement>(null);
  const mobileRef = useRef<HTMLInputElement>(null);

  function search(e: FormEvent, input: HTMLInputElement | null) {
    e.preventDefault();
    const q = input?.value.trim();
    if (q) router.push(`/buscar?q=${encodeURIComponent(q)}`);
  }

  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center gap-4 px-4 md:px-6">
        <Link href="/" className="flex items-center">
          <Image
            src={dark ? "/assets/logo-oscuro.ico" : "/assets/logo-claro.ico"}
            alt="Logo Revolico UCI"
            width={80}
            height={80}
            className="h-20 w-auto py-2"
          />
        </Link>

        <form onSubmit={(e) => search(e, desktopRef.current)} className="relative hidden flex-1 md:block max-w-xl mx-4">
          <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input ref={desktopRef} placeholder="Buscar productos, tiendas…" className="h-11 w-full rounded-full border border-border bg-secondary/60 pl-11 pr-4 text-sm outline-none focus:border-orange focus:ring-0" />
        </form>

        <nav className="ml-auto hidden items-center gap-1 text-sm font-medium text-muted-foreground lg:flex">
          <Link href="/categoria/alimentos" className="rounded-full px-3 py-2 hover:text-foreground">Categorías</Link>
          <Link href="/tienda/cafe-del-pueblo" className="rounded-full px-3 py-2 hover:text-foreground">Tiendas</Link>
          <Link href="/categoria/ofertas" className="rounded-full px-3 py-2 hover:text-foreground">Ofertas</Link>
          <Link href="/dashboard" className="rounded-full px-3 py-2 hover:text-foreground">Vendedores</Link>
        </nav>

        <div className="flex items-center gap-1">
          <ThemeToggle />
          <Link href="/favoritos" className="relative hidden rounded-full p-2 text-muted-foreground hover:bg-secondary hover:text-foreground md:block" aria-label="Favoritos">
            <Heart className={`h-4 w-4 ${count > 0 ? "text-orange" : ""}`} />
            {count > 0 && <span className="absolute -right-0.5 -top-0.5 grid h-4 min-w-4 place-items-center rounded-full bg-orange px-1 text-[10px] font-bold text-white">{count > 9 ? "9+" : count}</span>}
          </Link>
          <button className="rounded-full bg-secondary p-2 text-foreground hover:bg-accent" aria-label="Perfil"><User className="h-4 w-4" /></button>
          <button className="rounded-full p-2 md:hidden" aria-label="Menú"><Menu className="h-5 w-5" /></button>
        </div>
      </div>

      <form onSubmit={(e) => search(e, mobileRef.current)} className="md:hidden border-t border-border/60 px-4 py-2">
        <div className="relative">
          <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input ref={mobileRef} placeholder="Buscar…" className="h-10 w-full rounded-full border border-border bg-secondary/60 pl-11 pr-4 text-sm outline-none focus:border-orange" />
        </div>
      </form>
    </header>
  );
}
