export function buildWhatsAppLink(phone: string, productTitle: string, productUrl: string) {
  const message = encodeURIComponent(
    `Hola, me interesa: ${productTitle}\n${productUrl}`
  );
  return `https://wa.me/${phone}?text=${message}`;
}
