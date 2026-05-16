import Link from "next/link";
import { ArrowRight, Sparkles, MapPin, ShieldCheck, MessageCircle } from "lucide-react";
import ProductCard from "@/components/ProductCard";
import { products, categories, sellers, featuredSellers } from "@/lib/data";

function Section({ title, action, children }: { title: string; action?: string; children: React.ReactNode }) {
  return (
    <section className="mx-auto max-w-7xl px-4 py-10 md:px-6 md:py-14">
      <div className="mb-6 flex items-end justify-between">
        <h2 className="text-xl font-semibold md:text-2xl">{title}</h2>
        {action && <button className="text-sm font-medium text-orange hover:underline">{action} →</button>}
      </div>
      {children}
    </section>
  );
}

export default function Home() {
  const featured = products.slice(0, 4);
  const trending = products.slice(2, 6);
  const recent = products.slice(4, 8);

  return (
    <>
      {/* Hero */}
      <section className="mx-auto max-w-7xl px-4 pt-6 md:px-6 md:pt-10">
        <div className="grid items-center gap-6 rounded-3xl bg-card p-6 shadow-card ring-1 ring-border/60 md:grid-cols-2 md:gap-10 md:p-10">
          <div className="space-y-6">
            <span className="inline-flex items-center gap-2 rounded-full bg-secondary px-3 py-1.5 text-xs font-medium text-muted-foreground">
              <MapPin className="h-3.5 w-3.5 text-orange" /> Marketplace de tu comunidad
            </span>
            <h1 className="text-4xl font-bold leading-[1.05] tracking-tight md:text-5xl lg:text-6xl">
              Lo mejor de <span className="text-orange">nuestro pueblo</span>,
              <br />en un solo lugar
            </h1>
            <p className="max-w-md text-base text-muted-foreground">
              Descubre, apoya y compra a los negocios locales de tu comunidad. Café, ropa, hogar, frutas frescas y mucho más.
            </p>
            <div className="flex flex-wrap items-center gap-3">
              <Link href="/categoria/alimentos" className="inline-flex items-center gap-2 rounded-full bg-orange px-6 py-3 text-sm font-semibold text-primary-foreground shadow-soft transition hover:brightness-105">
                Explorar productos <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href="/dashboard" className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-6 py-3 text-sm font-semibold text-foreground hover:bg-secondary">
                Vender en Revolico
              </Link>
            </div>
            <div className="flex flex-wrap gap-6 pt-2 text-xs text-muted-foreground">
              <div className="flex items-center gap-2"><ShieldCheck className="h-4 w-4 text-orange" /> Vendedores verificados</div>
              <div className="flex items-center gap-2"><MessageCircle className="h-4 w-4 text-orange" /> Contacto directo por WhatsApp</div>
            </div>
          </div>
          <div className="relative">
            <img src="/assets/hero-city.jpg" alt="Barrio local" width={1600} height={1100} className="h-72 w-full rounded-2xl object-cover shadow-soft md:h-[420px]" />
            <div className="absolute -bottom-4 -left-4 hidden rounded-2xl bg-card p-4 shadow-soft ring-1 ring-border md:block">
              <div className="flex items-center gap-3">
                <div className="grid h-10 w-10 place-items-center rounded-full bg-orange/15 text-orange"><Sparkles className="h-5 w-5" /></div>
                <div>
                  <p className="text-xs text-muted-foreground">Más de</p>
                  <p className="text-base font-semibold">450 negocios locales</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <Section title="Categorías" action="Ver todas">
        <div className="grid grid-cols-3 gap-3 md:grid-cols-6 md:gap-4">
          {categories.map((c) => (
            <Link key={c.slug} href={`/categoria/${c.slug}`} className="group flex flex-col items-center gap-2 rounded-2xl bg-card p-4 ring-1 ring-border/60 transition hover:-translate-y-0.5 hover:shadow-card">
              <div className="grid h-14 w-14 place-items-center rounded-2xl bg-orange/10 text-2xl transition group-hover:bg-orange/20">{c.icon}</div>
              <span className="text-xs font-medium md:text-sm">{c.name}</span>
            </Link>
          ))}
        </div>
      </Section>

      {/* Featured products */}
      <Section title="Productos destacados" action="Ver todos">
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
          {featured.map((p) => <ProductCard key={p.id} p={p} />)}
        </div>
      </Section>

      {/* Promo banner */}
      <section className="mx-auto max-w-7xl px-4 py-6 md:px-6">
        <div className="overflow-hidden rounded-3xl bg-navy p-8 text-cream md:flex md:items-center md:justify-between md:p-10">
          <div className="space-y-2">
            <h3 className="text-2xl font-semibold md:text-3xl">¿Tienes un negocio?</h3>
            <p className="max-w-md text-sm text-cream/80">Únete a Revolico UCI y lleva tu tienda al siguiente nivel. Sin comisiones por venta.</p>
          </div>
          <Link href="/dashboard" className="mt-5 inline-flex items-center gap-2 rounded-full bg-orange px-6 py-3 text-sm font-semibold text-primary-foreground shadow-soft md:mt-0">
            Publicar mi negocio <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      {/* Featured sellers */}
      <Section title="Tiendas destacadas" action="Ver todas">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {featuredSellers.map((sid) => {
            const s = sellers[sid];
            return (
              <Link key={sid} href={`/tienda/${sid}`} className="group flex items-center gap-4 rounded-2xl bg-card p-4 ring-1 ring-border/60 transition hover:-translate-y-0.5 hover:shadow-card">
                <div className="grid h-14 w-14 shrink-0 place-items-center rounded-full bg-orange/15 text-lg font-bold text-orange">
                  {s.name.charAt(0)}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold">{s.name}</p>
                  <p className="truncate text-xs text-muted-foreground">{s.tagline}</p>
                  <p className="mt-1 text-xs text-muted-foreground">★ {s.rating} · {s.products} productos</p>
                </div>
              </Link>
            );
          })}
        </div>
      </Section>

      {/* Trending */}
      <Section title="Tendencia esta semana" action="Ver más">
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
          {trending.map((p) => <ProductCard key={p.id} p={p} />)}
        </div>
      </Section>

      {/* Recently added */}
      <Section title="Recién añadidos" action="Ver más">
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
          {recent.map((p) => <ProductCard key={p.id} p={p} />)}
        </div>
      </Section>
    </>
  );
}
