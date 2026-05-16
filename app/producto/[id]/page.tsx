"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { ChevronRight, Heart, MessageCircle, Star, Truck, ShieldCheck, Store } from "lucide-react";
import ProductCard from "@/components/ProductCard";
import { products, sellers } from "@/lib/data";
import { useState } from "react";

export default function ProductPage() {
  const { id } = useParams<{ id: string }>();
  const product = products.find((p) => p.id === id);
  if (!product) {
    return <div className="p-20 text-center">Producto no encontrado</div>;
  }
  const seller = sellers[product.seller];
  const related = products.filter((p) => p.id !== product.id && p.category === product.category).slice(0, 4);
  const gallery = [product.image, product.image, product.image, product.image];
  const [active, setActive] = useState(0);

  return (
    <div className="mx-auto max-w-7xl px-4 py-6 md:px-6">
      {/* Breadcrumb */}
      <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
        <Link href="/">Inicio</Link><ChevronRight className="h-3 w-3" />
        <span>{product.category}</span><ChevronRight className="h-3 w-3" />
        <span className="text-foreground">{product.name}</span>
      </div>

      <div className="mt-6 grid gap-8 lg:grid-cols-[1.1fr_1fr]">
        {/* Gallery */}
        <div className="grid gap-4 md:grid-cols-[88px_1fr]">
          <div className="order-2 flex gap-3 overflow-x-auto md:order-1 md:flex-col">
            {gallery.map((g, i) => (
              <button key={i} onClick={() => setActive(i)} className={`h-20 w-20 shrink-0 overflow-hidden rounded-xl ring-1 transition ${active === i ? "ring-2 ring-orange" : "ring-border"}`}>
                <img src={g} alt="" className="h-full w-full object-cover" />
              </button>
            ))}
          </div>
          <div className="order-1 overflow-hidden rounded-3xl bg-card ring-1 ring-border/60 md:order-2">
            <img src={gallery[active]} alt={product.name} className="aspect-square w-full object-cover" />
          </div>
        </div>

        {/* Info */}
        <div className="space-y-6">
          <div>
            <p className="text-sm text-muted-foreground">{product.category}</p>
            <h1 className="mt-1 text-3xl font-bold md:text-4xl">{product.name}</h1>
            <div className="mt-2 flex items-center gap-3 text-sm">
              <span className="flex items-center gap-1"><Star className="h-4 w-4 fill-orange text-orange" /> <span className="font-semibold">{product.rating}</span></span>
              <span className="text-muted-foreground">({product.reviews} reseñas)</span>
            </div>
          </div>

          <div className="flex items-baseline gap-3">
            <span className="text-4xl font-bold">${product.price.toFixed(2)}</span>
            {product.oldPrice && <span className="text-lg text-muted-foreground line-through">${product.oldPrice.toFixed(2)}</span>}
          </div>

          <p className="text-sm leading-relaxed text-muted-foreground">
            {product.subtitle}. Producto local elaborado con dedicación. Ideal para quienes buscan calidad cercana y apoyar a la comunidad.
          </p>

          <div className="rounded-2xl bg-secondary/60 p-4">
            <h3 className="mb-3 text-sm font-semibold">Especificaciones</h3>
            <dl className="grid grid-cols-2 gap-3 text-sm">
              <div><dt className="text-muted-foreground">Categoría</dt><dd className="font-medium">{product.category}</dd></div>
              <div><dt className="text-muted-foreground">Estado</dt><dd className="font-medium">Nuevo</dd></div>
              <div><dt className="text-muted-foreground">Origen</dt><dd className="font-medium">Local</dd></div>
              <div><dt className="text-muted-foreground">Stock</dt><dd className="font-medium">Disponible</dd></div>
            </dl>
          </div>

          <div className="flex gap-3">
            <button className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-whatsapp px-6 py-3.5 text-sm font-semibold text-white shadow-soft transition hover:brightness-105">
              <MessageCircle className="h-4 w-4" /> Contactar por WhatsApp
            </button>
            <button className="grid h-12 w-12 place-items-center rounded-full border border-border bg-background text-muted-foreground hover:text-orange" aria-label="Favorito">
              <Heart className="h-5 w-5" />
            </button>
          </div>

          <div className="flex flex-wrap gap-4 text-xs text-muted-foreground">
            <span className="flex items-center gap-1.5"><ShieldCheck className="h-4 w-4 text-orange" /> Vendedor verificado</span>
            <span className="flex items-center gap-1.5"><Truck className="h-4 w-4 text-orange" /> Entrega local</span>
          </div>

          {seller && (
            <Link href={`/tienda/${seller.id}`} className="flex items-center gap-4 rounded-2xl bg-card p-4 ring-1 ring-border/60 hover:shadow-card">
              <div className="grid h-12 w-12 place-items-center rounded-full bg-orange/15 text-orange"><Store className="h-5 w-5" /></div>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold">{seller.name}</p>
                <p className="text-xs text-muted-foreground">★ {seller.rating} · {seller.products} productos · {seller.followers} seguidores</p>
              </div>
              <span className="rounded-full border border-orange/30 px-4 py-2 text-xs font-semibold text-orange">Ver tienda</span>
            </Link>
          )}
        </div>
      </div>

      {/* Reviews */}
      <section className="mt-16">
        <h2 className="mb-6 text-xl font-semibold md:text-2xl">Reseñas y calificaciones</h2>
        <div className="grid gap-4 md:grid-cols-3">
          {[
            { name: "María G.", rating: 5, text: "Excelente producto, llegó en perfecto estado. Muy buena atención del vendedor." },
            { name: "Juan P.", rating: 5, text: "Calidad sorprendente. Definitivamente volveré a comprar." },
            { name: "Carla S.", rating: 4, text: "Muy bueno, recomendado. El empaque podría mejorar." },
          ].map((r) => (
            <article key={r.name} className="rounded-2xl bg-card p-5 ring-1 ring-border/60">
              <div className="mb-2 flex items-center gap-2">
                <div className="grid h-9 w-9 place-items-center rounded-full bg-secondary text-sm font-semibold">{r.name.charAt(0)}</div>
                <div>
                  <p className="text-sm font-semibold">{r.name}</p>
                  <div className="flex gap-0.5">
                    {Array.from({ length: 5 }).map((_, i) => <Star key={i} className={`h-3 w-3 ${i < r.rating ? "fill-orange text-orange" : "text-border"}`} />)}
                  </div>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">{r.text}</p>
            </article>
          ))}
        </div>
      </section>

      {/* Related */}
      <section className="mt-16">
        <h2 className="mb-6 text-xl font-semibold md:text-2xl">Productos relacionados</h2>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
          {related.map((p) => <ProductCard key={p.id} p={p} />)}
        </div>
      </section>
    </div>
  );
}
