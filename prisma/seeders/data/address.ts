export type CountrySeed = {
  code: string;
  name: string;
  description: string | null;
};

export type ProvinceSeed = {
  code: string;
  name: string;
  description: string | null;
  countryCode: string;
};

export type DistrictSeed = {
  code: string;
  name: string;
  description: string | null;
  provinceCode: string;
  countryCode: string;
};

export const countries: CountrySeed[] = [
  {
    code: "id",
    name: "Indonesia",
    description: "Republic of Indonesia",
  },
];

export const provinces: ProvinceSeed[] = [
  {
    code: "dki_jakarta",
    name: "DKI Jakarta",
    description: null,
    countryCode: "id",
  },
  {
    code: "jawa_barat",
    name: "Jawa Barat",
    description: null,
    countryCode: "id",
  },
  {
    code: "jawa_tengah",
    name: "Jawa Tengah",
    description: null,
    countryCode: "id",
  },
  {
    code: "jawa_timur",
    name: "Jawa Timur",
    description: null,
    countryCode: "id",
  },
  {
    code: "banten",
    name: "Banten",
    description: null,
    countryCode: "id",
  },
];

export const districts: DistrictSeed[] = [
  {
    code: "jakarta_pusat",
    name: "Jakarta Pusat",
    description: null,
    provinceCode: "dki_jakarta",
    countryCode: "id",
  },
  {
    code: "jakarta_selatan",
    name: "Jakarta Selatan",
    description: null,
    provinceCode: "dki_jakarta",
    countryCode: "id",
  },
  {
    code: "jakarta_utara",
    name: "Jakarta Utara",
    description: null,
    provinceCode: "dki_jakarta",
    countryCode: "id",
  },
  {
    code: "bandung",
    name: "Bandung",
    description: null,
    provinceCode: "jawa_barat",
    countryCode: "id",
  },
  {
    code: "bogor",
    name: "Bogor",
    description: null,
    provinceCode: "jawa_barat",
    countryCode: "id",
  },
  {
    code: "bekasi",
    name: "Bekasi",
    description: null,
    provinceCode: "jawa_barat",
    countryCode: "id",
  },
  {
    code: "semarang",
    name: "Semarang",
    description: null,
    provinceCode: "jawa_tengah",
    countryCode: "id",
  },
  {
    code: "surakarta",
    name: "Surakarta",
    description: null,
    provinceCode: "jawa_tengah",
    countryCode: "id",
  },
  {
    code: "surabaya",
    name: "Surabaya",
    description: null,
    provinceCode: "jawa_timur",
    countryCode: "id",
  },
  {
    code: "malang",
    name: "Malang",
    description: null,
    provinceCode: "jawa_timur",
    countryCode: "id",
  },
  {
    code: "tangerang",
    name: "Tangerang",
    description: null,
    provinceCode: "banten",
    countryCode: "id",
  },
  {
    code: "serang",
    name: "Serang",
    description: null,
    provinceCode: "banten",
    countryCode: "id",
  },
];
