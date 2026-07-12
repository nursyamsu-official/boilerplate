export type CompanySeed = {
  code: string;
  name: string;
  description: string | null;
};

export type OrganizationalUnitSeed = {
  code: string;
  name: string;
  description: string | null;
  companyCode: string;
  parentCode: string | null;
  sortOrder: number;
};

export type LogisticUnitSeed = {
  code: string;
  name: string;
  description: string | null;
  companyCode: string;
  parentCode: string | null;
  sortOrder: number;
};

export type PurchasingGroupSeed = {
  code: string;
  name: string;
  description: string | null;
  companyCode: string;
  parentCode: string | null;
  sortOrder: number;
};

export const companies: CompanySeed[] = [
  {
    code: "albayyinah",
    name: "Albayyinah",
    description: "Default company",
  },
];

export const organizationalUnits: OrganizationalUnitSeed[] = [
  {
    code: "head_office",
    name: "Head Office",
    description: null,
    companyCode: "albayyinah",
    parentCode: null,
    sortOrder: 1,
  },
  {
    code: "hr",
    name: "Human Resources",
    description: null,
    companyCode: "albayyinah",
    parentCode: "head_office",
    sortOrder: 1,
  },
  {
    code: "finance",
    name: "Finance",
    description: null,
    companyCode: "albayyinah",
    parentCode: "head_office",
    sortOrder: 2,
  },
  {
    code: "operations",
    name: "Operations",
    description: null,
    companyCode: "albayyinah",
    parentCode: "head_office",
    sortOrder: 3,
  },
];

export const logisticUnits: LogisticUnitSeed[] = [
  {
    code: "logistics",
    name: "Logistics",
    description: null,
    companyCode: "albayyinah",
    parentCode: null,
    sortOrder: 1,
  },
  {
    code: "warehouse",
    name: "Warehouse",
    description: null,
    companyCode: "albayyinah",
    parentCode: "logistics",
    sortOrder: 1,
  },
  {
    code: "fleet",
    name: "Fleet",
    description: null,
    companyCode: "albayyinah",
    parentCode: "logistics",
    sortOrder: 2,
  },
  {
    code: "distribution",
    name: "Distribution",
    description: null,
    companyCode: "albayyinah",
    parentCode: "logistics",
    sortOrder: 3,
  },
];

export const purchasingGroups: PurchasingGroupSeed[] = [
  {
    code: "procurement",
    name: "Procurement",
    description: null,
    companyCode: "albayyinah",
    parentCode: null,
    sortOrder: 1,
  },
  {
    code: "direct_materials",
    name: "Direct Materials",
    description: null,
    companyCode: "albayyinah",
    parentCode: "procurement",
    sortOrder: 1,
  },
  {
    code: "indirect_materials",
    name: "Indirect Materials",
    description: null,
    companyCode: "albayyinah",
    parentCode: "procurement",
    sortOrder: 2,
  },
  {
    code: "services",
    name: "Services",
    description: null,
    companyCode: "albayyinah",
    parentCode: "procurement",
    sortOrder: 3,
  },
];
