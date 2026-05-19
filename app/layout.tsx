import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BottomNav from "@/components/BottomNav";
import { FavoritesProvider } from "@/lib/favorites";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "Revolico UCI — Marketplace local del barrio",
  description: "Descubre, apoya y compra a los negocios locales de tu comunidad. Productos artesanales, alimentos, hogar y más.",
  openGraph: {
    title: "Revolico UCI — Marketplace local",
    description: "Lo mejor de nuestro pueblo, en un solo lugar.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${poppins.variable} antialiased`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{
          __html: `(function(){try{var e=localStorage.getItem("theme");e==="dark"?document.documentElement.classList.add("dark"):e==="light"?document.documentElement.classList.remove("dark"):window.matchMedia("(prefers-color-scheme: dark)").matches&&document.documentElement.classList.add("dark")}catch(e){}})()`,
        }} />
      </head>
      <body className="min-h-screen bg-background pb-20 md:pb-0">
        <FavoritesProvider>
          <Navbar />
          <main>{children}</main>
          <Footer />
          <BottomNav />
        </FavoritesProvider>
      </body>
    </html>
  );
}
