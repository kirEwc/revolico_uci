"use client";

import Link from "next/link";
import { Heart } from "lucide-react";
import ProductCard from "@/components/ProductCard";
import { useFavorites } from "@/lib/favorites";
import { products } from "@/lib/data";

export default function FavoritosPage() {
  const { favorites, count } = useFavorites();
  const list = products.filter((p) => favorites.includes(p.id));

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 md:px-6">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Mis favoritos</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {count === 0 ? "Aún no tienes favoritos" : `${count} producto${count !== 1 ? "s" : ""} guardado${count !== 1 ? "s" : ""}`}
          </p>
        </div>
      </div>

      {list.length > 0 ? (
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-6 lg:grid-cols-4">
          {list.map((p) => <ProductCard key={p.id} p={p} />)}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center rounded-2xl bg-card py-24 ring-1 ring-border/60">
          <div className="grid h-16 w-16 place-items-center rounded-full bg-secondary text-muted-foreground">
            <Heart className="h-7 w-7" />
          </div>
          <p className="mt-4 text-sm font-medium text-foreground">No hay favoritos aún</p>
          <p className="mt-1 text-xs text-muted-foreground">Explora productos y agrégalos a favoritos</p>
          <Link href="/" className="mt-6 inline-flex items-center gap-2 rounded-full bg-orange px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-soft transition hover:brightness-105">
            Explorar productos
          </Link>
        </div>
      )}
    </div>
  );
}
