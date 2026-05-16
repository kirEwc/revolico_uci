"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { Search, SlidersHorizontal, ChevronRight } from "lucide-react";
import ProductCard from "@/components/ProductCard";
import { products, categories } from "@/lib/data";
import { useState } from "react";

export default function CategoryPage() {
  const { slug } = useParams<{ slug: string }>();
  const cat = categories.find((c) => c.slug === slug);
  const name = cat?.name ?? "Explorar";
  const list = cat ? products.filter((p) => p.category === cat.name) : products;
  const [sort, setSort] = useState("Relevancia");
  const sorts = ["Relevancia", "Precio: menor", "Precio: mayor", "Mejor valorados"];

  return (
    <div className="mx-auto max-w-7xl px-4 py-6 md:px-6 md:py-10">
      <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
        <Link href="/">Inicio</Link><ChevronRight className="h-3 w-3" />
        <span className="text-foreground">{name}</span>
      </div>

      <div className="mt-4 flex items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold md:text-4xl">{name}</h1>
          <p className="mt-1 text-sm text-muted-foreground">{list.length} productos disponibles en tu comunidad</p>
        </div>
      </div>

      <div className="mt-6 flex gap-3">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input placeholder="Buscar en esta categoría…" className="h-12 w-full rounded-full border border-border bg-card pl-11 pr-4 text-sm outline-none focus:border-orange" />
        </div>
        <button className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-5 text-sm font-medium md:px-6">
          <SlidersHorizontal className="h-4 w-4" /> Filtros
        </button>
      </div>

      <div className="mt-6 grid gap-8 lg:grid-cols-[260px_1fr]">
        <aside className="hidden lg:block">
          <div className="sticky top-24 space-y-6 rounded-2xl bg-card p-5 ring-1 ring-border/60">
            <div>
              <h3 className="mb-3 text-sm font-semibold">Categorías</h3>
              <ul className="space-y-1.5 text-sm">
                {categories.map((c) => (
                  <li key={c.slug}>
                    <Link href={`/categoria/${c.slug}`} className={`flex items-center gap-2 rounded-lg px-2 py-1.5 ${c.slug === slug ? "bg-orange/10 text-orange font-medium" : "text-muted-foreground hover:bg-secondary"}`}>
                      <span>{c.icon}</span> {c.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="mb-3 text-sm font-semibold">Precio</h3>
              <div className="flex gap-2">
                <input placeholder="Min" className="h-9 w-full rounded-lg border border-border bg-background px-3 text-sm" />
                <input placeholder="Max" className="h-9 w-full rounded-lg border border-border bg-background px-3 text-sm" />
              </div>
            </div>
            <div>
              <h3 className="mb-3 text-sm font-semibold">Calificación</h3>
              <div className="space-y-2 text-sm text-muted-foreground">
                {[5, 4, 3].map((r) => (
                  <label key={r} className="flex items-center gap-2"><input type="checkbox" className="accent-orange" /> {r}★ y más</label>
                ))}
              </div>
            </div>
          </div>
        </aside>

        <div>
          <div className="mb-4 flex flex-wrap items-center gap-2">
            {sorts.map((s) => (
              <button key={s} onClick={() => setSort(s)} className={`rounded-full px-4 py-1.5 text-xs font-medium transition ${sort === s ? "bg-orange text-primary-foreground" : "bg-secondary text-muted-foreground hover:text-foreground"}`}>{s}</button>
            ))}
          </div>

          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-6">
            {list.map((p) => <ProductCard key={p.id} p={p} />)}
          </div>
          {list.length === 0 && (
            <div className="rounded-2xl bg-card p-12 text-center text-muted-foreground ring-1 ring-border/60">
              No hay productos en esta categoría aún. ¡Vuelve pronto!
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
