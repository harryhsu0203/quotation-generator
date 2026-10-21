import type { TaxMode } from "./tax";

export interface Party {
  name: string;
  taxId: string;
  address: string;
  phone: string;
  email: string;
  contact: string;
}

export interface Seller extends Party {
  /** 壓縮後的 data URL */
  logo: string;
  stamp: string;
}

export interface Item {
  id: string;
  name: string;
  spec: string;
  quantity: number;
  unit: string;
  unitPrice: number;
}

export interface Quote {
  number: string;
  date: string; // YYYY-MM-DD
  validUntil: string; // YYYY-MM-DD
  customer: Party;
  items: Item[];
  taxMode: TaxMode;
  notes: string;
  paymentTerms: string;
}

export const emptyParty: Party = {
  name: "",
  taxId: "",
  address: "",
  phone: "",
  email: "",
  contact: "",
};

export const emptySeller: Seller = { ...emptyParty, logo: "", stamp: "" };

export function newItem(): Item {
  return {
    id: crypto.randomUUID(),
    name: "",
    spec: "",
    quantity: 1,
    unit: "式",
    unitPrice: 0,
  };
}

export function toDateInput(d: Date): string {
  const p = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}`;
}

export function addDays(dateStr: string, days: number): string {
  const [y, m, d] = dateStr.split("-").map(Number);
  return toDateInput(new Date(y, m - 1, d + days));
}
