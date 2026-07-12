export type DocumentCategorySeed = {
  code: string;
  name: string;
  description: string | null;
};

export type DocumentTypeSeed = {
  code: string;
  name: string;
  description: string | null;
  categoryCode: string;
  numberPrefix: string;
  numberSeparator?: string;
  numberStart: number;
  numberEnd: number;
  numberCurrent: number;
  numberPadding?: number;
};

export const documentCategories: DocumentCategorySeed[] = [
  {
    code: "purchasing",
    name: "Purchasing",
    description: "Procurement and goods receipt documents",
  },
  {
    code: "sales",
    name: "Sales",
    description: "Sales and billing documents",
  },
  {
    code: "finance",
    name: "Finance",
    description: "Finance and payment documents",
  },
];

export const documentTypes: DocumentTypeSeed[] = [
  {
    code: "purchase_order",
    name: "Purchase Order",
    description: null,
    categoryCode: "purchasing",
    numberPrefix: "PO",
    numberStart: 1,
    numberEnd: 99999,
    numberCurrent: 1,
  },
  {
    code: "goods_receipt",
    name: "Goods Receipt",
    description: null,
    categoryCode: "purchasing",
    numberPrefix: "GR",
    numberStart: 1,
    numberEnd: 99999,
    numberCurrent: 1,
  },
  {
    code: "sales_order",
    name: "Sales Order",
    description: null,
    categoryCode: "sales",
    numberPrefix: "SO",
    numberStart: 1,
    numberEnd: 99999,
    numberCurrent: 1,
  },
  {
    code: "invoice",
    name: "Invoice",
    description: null,
    categoryCode: "sales",
    numberPrefix: "INV",
    numberStart: 1,
    numberEnd: 99999,
    numberCurrent: 1,
  },
  {
    code: "payment_voucher",
    name: "Payment Voucher",
    description: null,
    categoryCode: "finance",
    numberPrefix: "PV",
    numberStart: 1,
    numberEnd: 99999,
    numberCurrent: 1,
  },
];
