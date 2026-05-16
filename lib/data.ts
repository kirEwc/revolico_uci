export type Product = {
  id: string;
  name: string;
  subtitle: string;
  price: number;
  oldPrice?: number;
  rating: number;
  reviews: number;
  image: string;
  category: string;
  seller: string;
  badge?: string;
};

export const products: Product[] = [
  { id: "cafe-artesanal", name: "Café Artesanal", subtitle: "Tueste Premium 250g", price: 8.5, rating: 4.8, reviews: 120, image: "/assets/p-coffee.jpg", category: "Alimentos", seller: "cafe-del-pueblo", badge: "Destacado" },
  { id: "camisa-casual", name: "Camisa Casual", subtitle: "Algodón 100% — Talla M", price: 24, oldPrice: 32, rating: 4.7, reviews: 65, image: "/assets/p-shirt.jpg", category: "Ropa", seller: "moda-local" },
  { id: "lampara-moderna", name: "Lámpara Moderna", subtitle: "Diseño Minimalista", price: 35, rating: 4.9, reviews: 42, image: "/assets/p-lamp.jpg", category: "Hogar", seller: "casa-bonita", badge: "Nuevo" },
  { id: "pan-integral", name: "Pan Integral", subtitle: "Recién Horneado", price: 4, rating: 4.6, reviews: 87, image: "/assets/p-bread.jpg", category: "Alimentos", seller: "panaderia-luz" },
  { id: "ceramica-set", name: "Set de Cerámica", subtitle: "Hecho a mano — 6 piezas", price: 48, rating: 5.0, reviews: 31, image: "/assets/p-ceramics.jpg", category: "Hogar", seller: "casa-bonita" },
  { id: "frutas-tropicales", name: "Frutas Tropicales", subtitle: "Cesta variada 3kg", price: 12, rating: 4.7, reviews: 54, image: "/assets/p-fruits.jpg", category: "Alimentos", seller: "frutas-del-barrio" },
  { id: "bolso-cuero", name: "Bolso de Cuero", subtitle: "Artesanal — Cosido a mano", price: 75, oldPrice: 95, rating: 4.9, reviews: 28, image: "/assets/p-bag.jpg", category: "Ropa", seller: "moda-local", badge: "Oferta" },
  { id: "cafe-molido", name: "Café Molido", subtitle: "Tradicional 500g", price: 6, rating: 4.6, reviews: 88, image: "/assets/p-coffee.jpg", category: "Alimentos", seller: "cafe-del-pueblo" },
];

export const categories = [
  { slug: "alimentos", name: "Alimentos", icon: "🥖" },
  { slug: "ropa", name: "Ropa", icon: "👕" },
  { slug: "hogar", name: "Hogar", icon: "🏠" },
  { slug: "tecnologia", name: "Tecnología", icon: "💻" },
  { slug: "belleza", name: "Belleza", icon: "💄" },
  { slug: "deportes", name: "Deportes", icon: "⚽" },
];

export interface Seller {
  id: string;
  name: string;
  tagline: string;
  rating: number;
  products: number;
  followers: string;
  description: string;
}

export const sellers: Record<string, Seller> = {
  "cafe-del-pueblo": { id: "cafe-del-pueblo", name: "Café del Pueblo", tagline: "Alimentos y Bebidas", rating: 4.8, products: 120, followers: "2.5k", description: "Tostadores artesanales con más de 20 años llevando café cubano de alta calidad a cada mesa del barrio." },
  "moda-local": { id: "moda-local", name: "Moda Local", tagline: "Ropa y Accesorios", rating: 4.7, products: 86, followers: "1.8k", description: "Diseño y confección local. Prendas hechas con dedicación para tu día a día." },
  "casa-bonita": { id: "casa-bonita", name: "Casa Bonita", tagline: "Hogar y Decoración", rating: 4.9, products: 64, followers: "3.1k", description: "Objetos para hacer de tu casa un lugar más cálido. Cerámica, iluminación y textiles." },
  "panaderia-luz": { id: "panaderia-luz", name: "Panadería Luz", tagline: "Alimentos", rating: 4.6, products: 24, followers: "980", description: "Pan recién horneado cada mañana, recetas tradicionales del barrio." },
  "frutas-del-barrio": { id: "frutas-del-barrio", name: "Frutas del Barrio", tagline: "Alimentos frescos", rating: 4.7, products: 38, followers: "1.2k", description: "Frutas frescas seleccionadas, directo del campo a tu cocina." },
};

export const featuredSellers = ["cafe-del-pueblo", "casa-bonita", "moda-local", "panaderia-luz"];
