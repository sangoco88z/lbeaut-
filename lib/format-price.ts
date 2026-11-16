const euro = new Intl.NumberFormat("fr-FR", {
  style: "currency", currency: "EUR", minimumFractionDigits: 0, maximumFractionDigits: 0,
});

export function formatPrice(priceEuros: number) {
  return euro.format(priceEuros);
}
