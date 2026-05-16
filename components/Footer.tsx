"use client";

import Link from "next/link";
import Image from "next/image";
import { Year } from "./Year";
import { useSyncExternalStore } from "react";

function getDarkSnapshot(): boolean {
  return document.documentElement.classList.contains("dark");
}

function subscribe(cb: () => void): () => void {
  const observer = new MutationObserver(cb);
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
  return () => observer.disconnect();
}

function getServerSnapshot(): boolean {
  return false;
}

export default function Footer() {
  const dark = useSyncExternalStore(subscribe, getDarkSnapshot, getServerSnapshot);

  return (
    <footer className="mt-24 border-t border-border/60 bg-secondary/40">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-14 md:grid-cols-4">
        <div className="space-y-3 md:col-span-2">
          <Link href="/" className="flex items-center">
            <Image
              src={dark ? "/assets/logo-oscuro.ico" : "/assets/logo-claro.ico"}
              alt="Logo Revolico UCI"
              width={80}
              height={80}
              className="h-20 w-auto py-2"
            />
          </Link>
          <p className="max-w-sm text-sm text-muted-foreground">
            El marketplace local del barrio. Apoya a vendedores cercanos y descubre lo mejor de tu comunidad.
          </p>
        </div>
        <div>
          <h4 className="mb-3 text-sm font-semibold">Plataforma</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><Link href="/dashboard">Vender</Link></li>
            <li><Link href="/categoria/alimentos">Explorar</Link></li>
            <li>Cómo funciona</li>
          </ul>
        </div>
        <div>
          <h4 className="mb-3 text-sm font-semibold">Comunidad</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>Ayuda</li>
            <li>Confianza y seguridad</li>
            <li>Contacto</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border/60 px-6 py-5 text-center text-xs text-muted-foreground">
        © <Year /> Revolico UCI · Hecho con cariño para el barrio
      </div>
    </footer>
  );
}
