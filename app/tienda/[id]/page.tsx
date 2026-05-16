"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { MessageCircle, Star, Store, MapPin, Share2 } from "lucide-react";
import ProductCard from "@/components/ProductCard";
import { products, sellers } from "@/lib/data";
import { useState } from "react";

const tabs = ["Productos", "Reseñas", "Información", "Políticas"] as const;

export default function StorePage() {
  const { id } = useParams<{ id: string }>();
  const seller = sellers[id];
  if (!seller) {
    return <div className="p-20 text-center">Tienda no encontrada</div>;
  }
  const items = products.filter((p) => p.seller === seller.id);
  const [tab, setTab] = useState<typeof tabs[number]>("Productos");

  return (
    <div className="mx-auto max-w-7xl px-4 pt-4 md:px-6">
      {/* Cover */}
      <div className="relative h-44 overflow-hidden rounded-3xl md:h-64">
        <img src="/assets/store-cover.jpg" alt="" className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-navy/80 via-navy/40 to-transparent" />
      </div>

      {/* Header card */}
      <div className="-mt-16 rounded-3xl bg-card p-6 shadow-soft ring-1 ring-border/60 md:p-8">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-4">
            <div className="grid h-16 w-16 shrink-0 place-items-center rounded-2xl bg-orange text-2xl font-bold text-primary-foreground shadow-soft md:h-20 md:w-20">
              {seller.name.charAt(0)}
            </div>
            <div>
              <h1 className="text-2xl font-bold md:text-3xl">{seller.name}</h1>
              <p className="text-sm text-muted-foreground">{seller.tagline}</p>
              <p className="mt-1 flex items-center gap-3 text-xs text-muted-foreground">
                <span className="flex items-center gap-1"><Star className="h-3.5 w-3.5 fill-orange text-orange" /> {seller.rating}</span>
                <span className="flex items-center gap-1"><MapPin className="h-3.5 w-3.5" /> Local</span>
              </p>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-6 md:gap-10 text-center">
            <div><p className="text-xl font-bold md:text-2xl">{seller.products}</p><p className="text-[11px] uppercase tracking-wide text-muted-foreground">Productos</p></div>
            <div><p className="text-xl font-bold md:text-2xl">{seller.followers}</p><p className="text-[11px] uppercase tracking-wide text-muted-foreground">Seguidores</p></div>
            <div><p className="text-xl font-bold md:text-2xl">98%</p><p className="text-[11px] uppercase tracking-wide text-muted-foreground">Calificación</p></div>
          </div>
        </div>

        <div className="mt-6 flex flex-wrap items-center gap-3">
          <button className="inline-flex items-center gap-2 rounded-full bg-whatsapp px-6 py-3 text-sm font-semibold text-white shadow-soft hover:brightness-105">
            <MessageCircle className="h-4 w-4" /> Contactar por WhatsApp
          </button>
          <button className="rounded-full border border-border bg-background px-6 py-3 text-sm font-semibold hover:bg-secondary">Seguir</button>
          <button className="grid h-11 w-11 place-items-center rounded-full border border-border" aria-label="Compartir"><Share2 className="h-4 w-4" /></button>
        </div>

        <div className="mt-6 flex gap-1 overflow-x-auto border-t border-border/60 pt-4">
          {tabs.map((t) => (
            <button key={t} onClick={() => setTab(t)} className={`rounded-full px-4 py-2 text-sm font-medium transition ${tab === t ? "bg-secondary text-foreground" : "text-muted-foreground hover:text-foreground"}`}>
              {t}
            </button>
          ))}
        </div>
      </div>

      {tab === "Productos" && (
        <section className="mt-10">
          <h2 className="mb-6 text-lg font-semibold">Todos los productos</h2>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
            {items.map((p) => <ProductCard key={p.id} p={p} />)}
            {items.length === 0 && <p className="text-sm text-muted-foreground">Sin productos aún.</p>}
          </div>
        </section>
      )}

      {tab === "Información" && (
        <section className="mt-10 max-w-2xl rounded-2xl bg-card p-6 ring-1 ring-border/60">
          <div className="mb-4 flex items-center gap-2 text-sm font-semibold"><Store className="h-4 w-4 text-orange" /> Sobre la tienda</div>
          <p className="text-sm leading-relaxed text-muted-foreground">{seller.description}</p>
        </section>
      )}

      {tab === "Reseñas" && (
        <section className="mt-10 grid gap-4 md:grid-cols-2">
          {[1, 2, 3, 4].map((i) => (
            <article key={i} className="rounded-2xl bg-card p-5 ring-1 ring-border/60">
              <div className="mb-2 flex items-center gap-2">
                <div className="grid h-9 w-9 place-items-center rounded-full bg-secondary text-sm font-semibold">U</div>
                <div>
                  <p className="text-sm font-semibold">Usuario {i}</p>
                  <div className="flex gap-0.5">{Array.from({ length: 5 }).map((_, k) => <Star key={k} className="h-3 w-3 fill-orange text-orange" />)}</div>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">Excelente atención y productos de muy buena calidad. Siempre vuelvo.</p>
            </article>
          ))}
        </section>
      )}

      {tab === "Políticas" && (
        <section className="mt-10 max-w-2xl space-y-3 rounded-2xl bg-card p-6 ring-1 ring-border/60 text-sm text-muted-foreground">
          <p><strong className="text-foreground">Entrega:</strong> Local, coordinada por WhatsApp.</p>
          <p><strong className="text-foreground">Pagos:</strong> En efectivo o transferencia.</p>
          <p><strong className="text-foreground">Devoluciones:</strong> 7 días para reportar inconvenientes.</p>
        </section>
      )}
    </div>
  );
}
