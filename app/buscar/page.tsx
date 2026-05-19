"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Search } from "lucide-react";
import ProductCard from "@/components/ProductCard";
import { products } from "@/lib/data";

function BuscarContent() {
  const searchParams = useSearchParams();
  const q = searchParams.get("q") || "";

  const list = q
    ? products.filter(
        (p) =>
          p.name.toLowerCase().includes(q.toLowerCase()) ||
          p.subtitle.toLowerCase().includes(q.toLowerCase()) ||
          p.category.toLowerCase().includes(q.toLowerCase()) ||
          p.seller.toLowerCase().includes(q.toLowerCase())
      )
    : [];

  return (
    <>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-foreground">
          {q ? `Resultados para "${q}"` : "Buscar"}
        </h1>
        {q && (
          <p className="mt-1 text-sm text-muted-foreground">
            {list.length} resultado{list.length !== 1 ? "s" : ""}
          </p>
        )}
      </div>

      {q && list.length > 0 ? (
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-6 lg:grid-cols-4">
          {list.map((p) => <ProductCard key={p.id} p={p} />)}
        </div>
      ) : q && list.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-2xl bg-card py-24 ring-1 ring-border/60">
          <div className="grid h-16 w-16 place-items-center rounded-full bg-secondary text-muted-foreground">
            <Search className="h-7 w-7" />
          </div>
          <p className="mt-4 text-sm font-medium text-foreground">Sin resultados</p>
          <p className="mt-1 text-xs text-muted-foreground">No encontramos nada para &quot;{q}&quot;</p>
          <Link href="/" className="mt-6 inline-flex items-center gap-2 rounded-full bg-orange px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-soft transition hover:brightness-105">
            Explorar productos
          </Link>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center rounded-2xl bg-card py-24 ring-1 ring-border/60">
          <div className="grid h-16 w-16 place-items-center rounded-full bg-secondary text-muted-foreground">
            <Search className="h-7 w-7" />
          </div>
          <p className="mt-4 text-sm font-medium text-foreground">Busca productos y tiendas</p>
          <p className="mt-1 text-xs text-muted-foreground">Usa el buscador para encontrar lo que necesitas</p>
        </div>
      )}
    </>
  );
}

export default function BuscarPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-10 md:px-6">
      <Suspense fallback={
        <div className="flex items-center justify-center py-24">
          <p className="text-sm text-muted-foreground">Cargando…</p>
        </div>
      }>
        <BuscarContent />
      </Suspense>
    </div>
  );
}
