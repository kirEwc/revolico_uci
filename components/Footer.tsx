import Link from "next/link";
import { Logo } from "./Logo";
import { Year } from "./Year";

export default function Footer() {
  return (
    <footer className="mt-24 border-t border-border/60 bg-secondary/40">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-14 md:grid-cols-4">
        <div className="space-y-3 md:col-span-2">
          <Logo />
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
