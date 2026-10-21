export type TaxMode = "exclusive" | "inclusive" | "none";

export interface PricedItem {
  quantity: number;
  unitPrice: number;
}

export interface Totals {
  subtotal: number;
  tax: number;
  total: number;
}

export const TAX_RATE = 0.05;

export function itemAmount(item: PricedItem): number {
  return item.quantity * item.unitPrice;
}

export function calcTotals(items: PricedItem[], taxMode: TaxMode): Totals {
  const sum = Math.round(items.reduce((acc, it) => acc + itemAmount(it), 0));

  if (taxMode === "exclusive") {
    const tax = Math.round(sum * TAX_RATE);
    return { subtotal: sum, tax, total: sum + tax };
  }
  if (taxMode === "inclusive") {
    const subtotal = Math.round(sum / (1 + TAX_RATE));
    return { subtotal, tax: sum - subtotal, total: sum };
  }
  return { subtotal: sum, tax: 0, total: sum };
}
