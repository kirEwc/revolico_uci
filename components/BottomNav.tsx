"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Grid3x3, Store, Heart, User } from "lucide-react";

const items = [
  { href: "/", label: "Inicio", icon: Home },
  { href: "/categoria/alimentos", label: "Categorías", icon: Grid3x3 },
  { href: "/tienda/cafe-del-pueblo", label: "Tiendas", icon: Store },
  { href: "/dashboard", label: "Mi tienda", icon: Heart },
  { href: "/dashboard", label: "Perfil", icon: User },
];

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed inset-x-0 bottom-0 z-40 border-t border-border/60 bg-background/95 backdrop-blur-xl md:hidden">
      <ul className="grid grid-cols-5">
        {items.map((it) => {
          const active = it.href === "/" ? pathname === "/" : pathname.startsWith(it.href.split("/")[1] ? "/" + it.href.split("/")[1] : "");
          const Icon = it.icon;
          return (
            <li key={it.label}>
              <Link href={it.href} className={`flex flex-col items-center gap-1 py-2.5 text-[11px] font-medium ${active ? "text-orange" : "text-muted-foreground"}`}>
                <Icon className="h-5 w-5" />
                {it.label}
              </Link>
            </li>
          );
        })}
      </ul>
      <div className="h-[env(safe-area-inset-bottom)]" />
    </nav>
  );
}
