"use client";

import Link from "next/link";
import { Search, Heart, User, Menu } from "lucide-react";
import { Logo } from "./Logo";
import { ThemeToggle } from "./ThemeToggle";
import { cn } from "@/lib/utils";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center gap-4 px-4 md:px-6">
        <Link href="/"><Logo /></Link>

        <div className="relative hidden flex-1 md:block max-w-xl mx-4">
          <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input placeholder="Buscar productos, tiendas…" className="h-11 w-full rounded-full border border-border bg-secondary/60 pl-11 pr-4 text-sm outline-none focus:border-orange focus:ring-0" />
        </div>

        <nav className="ml-auto hidden items-center gap-1 text-sm font-medium text-muted-foreground lg:flex">
          <Link href="/categoria/alimentos" className="rounded-full px-3 py-2 hover:text-foreground">Categorías</Link>
          <Link href="/tienda/cafe-del-pueblo" className="rounded-full px-3 py-2 hover:text-foreground">Tiendas</Link>
          <Link href="/categoria/ofertas" className="rounded-full px-3 py-2 hover:text-foreground">Ofertas</Link>
          <Link href="/dashboard" className="rounded-full px-3 py-2 hover:text-foreground">Vendedores</Link>
        </nav>

        <div className="flex items-center gap-1">
          <ThemeToggle />
          <button className="hidden rounded-full p-2 text-muted-foreground hover:bg-secondary hover:text-foreground md:block" aria-label="Favoritos"><Heart className="h-4 w-4" /></button>
          <button className="rounded-full bg-secondary p-2 text-foreground hover:bg-accent" aria-label="Perfil"><User className="h-4 w-4" /></button>
          <button className="rounded-full p-2 md:hidden" aria-label="Menú"><Menu className="h-5 w-5" /></button>
        </div>
      </div>

      <div className="md:hidden border-t border-border/60 px-4 py-2">
        <div className="relative">
          <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input placeholder="Buscar…" className="h-10 w-full rounded-full border border-border bg-secondary/60 pl-11 pr-4 text-sm outline-none focus:border-orange" />
        </div>
      </div>
    </header>
  );
}
