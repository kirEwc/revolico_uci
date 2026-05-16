"use client";

import Link from "next/link";
import { Star, Heart } from "lucide-react";
import type { Product } from "@/lib/data";

export default function ProductCard({ p }: { p: Product }) {
  return (
    <Link href={`/producto/${p.id}`} className="group block">
      <div className="relative overflow-hidden rounded-2xl bg-card shadow-card ring-1 ring-border/60 transition hover:-translate-y-0.5 hover:shadow-soft">
        <div className="relative aspect-square overflow-hidden bg-secondary">
          <img src={p.image} alt={p.name} loading="lazy" className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
          {p.badge && (
            <span className="absolute left-3 top-3 rounded-full bg-orange px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-primary-foreground shadow-soft">{p.badge}</span>
          )}
          <button className="absolute right-3 top-3 grid h-8 w-8 place-items-center rounded-full bg-background/80 text-muted-foreground backdrop-blur transition hover:text-orange" aria-label="Favorito">
            <Heart className="h-4 w-4" />
          </button>
        </div>
        <div className="space-y-1.5 p-4">
          <h3 className="truncate text-sm font-semibold text-foreground">{p.name}</h3>
          <p className="truncate text-xs text-muted-foreground">{p.subtitle}</p>
          <div className="flex items-end justify-between pt-1">
            <div className="flex items-baseline gap-1.5">
              <span className="text-base font-bold text-foreground">${p.price.toFixed(2)}</span>
              {p.oldPrice && <span className="text-xs text-muted-foreground line-through">${p.oldPrice.toFixed(2)}</span>}
            </div>
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <Star className="h-3.5 w-3.5 fill-orange text-orange" />
              <span className="font-medium text-foreground">{p.rating}</span>
              <span>({p.reviews})</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
