"use client";

import Link from "next/link";
import { LayoutDashboard, Package, MessageSquare, BarChart3, Star, Megaphone, Store, Settings, Plus, TrendingUp, Eye, ShoppingBag, MoreHorizontal } from "lucide-react";
import { Logo } from "@/components/Logo";
import { ThemeToggle } from "@/components/ThemeToggle";
import { products } from "@/lib/data";

const nav = [
  { label: "Inicio", icon: LayoutDashboard },
  { label: "Productos", icon: Package },
  { label: "Mensajes", icon: MessageSquare },
  { label: "Estadísticas", icon: BarChart3 },
  { label: "Reseñas", icon: Star },
  { label: "Promociones", icon: Megaphone },
  { label: "Tienda", icon: Store },
  { label: "Configuración", icon: Settings },
];

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="flex">
        {/* Sidebar */}
        <aside className="sticky top-0 hidden h-screen w-64 shrink-0 flex-col border-r border-border/60 bg-card p-5 md:flex">
          <Link href="/" className="mb-8 px-2"><Logo /></Link>
          <nav className="flex-1 space-y-1">
            {nav.map((n, i) => {
              const Icon = n.icon;
              const active = i === 0;
              return (
                <Link key={n.label} href="/dashboard" className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition ${active ? "bg-orange/10 text-orange" : "text-muted-foreground hover:bg-secondary hover:text-foreground"}`}>
                  <Icon className="h-4 w-4" /> {n.label}
                </Link>
              );
            })}
          </nav>
          <div className="rounded-2xl bg-secondary/60 p-4">
            <p className="text-xs font-semibold">Plan Comunidad</p>
            <p className="mt-1 text-xs text-muted-foreground">Sin comisiones por venta. Próximamente: pagos integrados.</p>
          </div>
        </aside>

        {/* Main */}
        <div className="flex-1">
          {/* Topbar */}
          <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-border/60 bg-background/85 px-4 backdrop-blur md:px-8">
            <div className="md:hidden"><Link href="/"><Logo /></Link></div>
            <div className="hidden md:block">
              <h1 className="text-lg font-semibold">Resumen</h1>
              <p className="text-xs text-muted-foreground">Bienvenido de vuelta, Café del Pueblo</p>
            </div>
            <div className="flex items-center gap-2">
              <ThemeToggle />
              <button className="inline-flex items-center gap-1.5 rounded-full bg-orange px-4 py-2 text-xs font-semibold text-primary-foreground shadow-soft">
                <Plus className="h-3.5 w-3.5" /> Nuevo producto
              </button>
              <div className="grid h-9 w-9 place-items-center rounded-full bg-secondary text-sm font-semibold">CP</div>
            </div>
          </header>

          <div className="space-y-6 p-4 md:p-8">
            {/* Stats */}
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {[
                { label: "Visitas", value: "12,450", delta: "+12%", icon: Eye },
                { label: "Mensajes", value: "320", delta: "+8%", icon: MessageSquare },
                { label: "Productos vendidos", value: "1,250", delta: "+15%", icon: ShoppingBag },
                { label: "Calificación", value: "4.8", delta: "+0.2", icon: Star },
              ].map((s) => {
                const Icon = s.icon;
                return (
                  <div key={s.label} className="rounded-2xl bg-card p-5 ring-1 ring-border/60">
                    <div className="flex items-center justify-between">
                      <div className="grid h-10 w-10 place-items-center rounded-xl bg-orange/10 text-orange"><Icon className="h-4 w-4" /></div>
                      <span className="inline-flex items-center gap-1 rounded-full bg-whatsapp/10 px-2 py-0.5 text-xs font-semibold text-whatsapp"><TrendingUp className="h-3 w-3" />{s.delta}</span>
                    </div>
                    <p className="mt-4 text-2xl font-bold">{s.value}</p>
                    <p className="text-xs text-muted-foreground">{s.label}</p>
                  </div>
                );
              })}
            </div>

            <div className="grid gap-6 lg:grid-cols-3">
              {/* Chart */}
              <div className="rounded-2xl bg-card p-6 ring-1 ring-border/60 lg:col-span-2">
                <div className="mb-6 flex items-center justify-between">
                  <div>
                    <h2 className="text-base font-semibold">Visitas</h2>
                    <p className="text-xs text-muted-foreground">Últimos 30 días</p>
                  </div>
                  <button className="rounded-full bg-secondary p-2"><MoreHorizontal className="h-4 w-4" /></button>
                </div>
                <Chart />
              </div>

              {/* Messages */}
              <div className="rounded-2xl bg-card p-6 ring-1 ring-border/60">
                <h2 className="mb-4 text-base font-semibold">Mensajes recientes</h2>
                <ul className="space-y-3">
                  {[
                    { name: "Juan Pérez", msg: "Hola, ¿está disponible?", time: "5 min" },
                    { name: "María González", msg: "¿Cuál es el precio?", time: "15 min" },
                    { name: "Carlos Silva", msg: "Gracias, lo quiero", time: "30 min" },
                    { name: "Ana López", msg: "¿Hacen entrega?", time: "1 h" },
                  ].map((m) => (
                    <li key={m.name} className="flex items-start gap-3">
                      <div className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-secondary text-xs font-semibold">{m.name.charAt(0)}</div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center justify-between gap-2">
                          <p className="truncate text-sm font-semibold">{m.name}</p>
                          <span className="text-[10px] text-muted-foreground">{m.time}</span>
                        </div>
                        <p className="truncate text-xs text-muted-foreground">{m.msg}</p>
                      </div>
                    </li>
                  ))}
                </ul>
                <button className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-orange">Ver todos</button>
              </div>
            </div>

            {/* Products table */}
            <div className="rounded-2xl bg-card ring-1 ring-border/60">
              <div className="flex items-center justify-between p-6">
                <h2 className="text-base font-semibold">Mis productos</h2>
                <button className="text-xs font-semibold text-orange">Ver todos</button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-y border-border/60 bg-secondary/40 text-left text-xs uppercase tracking-wide text-muted-foreground">
                      <th className="px-6 py-3 font-medium">Producto</th>
                      <th className="px-6 py-3 font-medium">Precio</th>
                      <th className="px-6 py-3 font-medium">Vistas</th>
                      <th className="px-6 py-3 font-medium">Estado</th>
                      <th className="px-6 py-3" />
                    </tr>
                  </thead>
                  <tbody>
                    {products.slice(0, 5).map((p) => (
                      <tr key={p.id} className="border-b border-border/40 last:border-0">
                        <td className="px-6 py-3">
                          <div className="flex items-center gap-3">
                            <img src={p.image} alt="" className="h-10 w-10 rounded-lg object-cover" />
                            <div>
                              <p className="font-medium">{p.name}</p>
                              <p className="text-xs text-muted-foreground">{p.subtitle}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-3 font-semibold">${p.price.toFixed(2)}</td>
                        <td className="px-6 py-3 text-muted-foreground">{(p.reviews * 12).toLocaleString()}</td>
                        <td className="px-6 py-3">
                          <span className="inline-flex rounded-full bg-whatsapp/10 px-2.5 py-1 text-xs font-semibold text-whatsapp">Activo</span>
                        </td>
                        <td className="px-6 py-3 text-right">
                          <button className="rounded-full p-2 text-muted-foreground hover:bg-secondary"><MoreHorizontal className="h-4 w-4" /></button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Chart() {
  const points = [22, 30, 28, 45, 38, 52, 48, 60, 55, 72, 68, 85];
  const max = Math.max(...points);
  const w = 600, h = 180, step = w / (points.length - 1);
  const pts = points.map((v, i) => [i * step, h - (v / max) * h * 0.85 - 10] as const);
  const path = pts.map(([x, y], i) => `${i === 0 ? "M" : "L"}${x},${y}`).join(" ");
  const area = `${path} L${w},${h} L0,${h} Z`;
  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="h-44 w-full">
      <defs>
        <linearGradient id="g" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="var(--orange)" stopOpacity="0.35" />
          <stop offset="100%" stopColor="var(--orange)" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={area} fill="url(#g)" />
      <path d={path} fill="none" stroke="var(--orange)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      {pts.map(([x, y], i) => <circle key={i} cx={x} cy={y} r="3" fill="var(--orange)" />)}
    </svg>
  );
}
