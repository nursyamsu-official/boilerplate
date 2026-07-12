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
