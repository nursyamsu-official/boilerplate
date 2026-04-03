// import { getBaseUrl } from "@/lib/utils"; //NOT USE TEMPORARY

export const appConfig = {
  appName: "SALAM AlBayyinah",
  appNameFull: "SALAM| Sistem Administrasi dan Layanan Akademik AlBayyinah",
  description: `SALAM adalah sistem administrasi dan layanan akademik AlBayyinah.`,
  // baseUrl: getBaseUrl(), // NOT USE TEMPORARY
  // Contact information (displayed on contact page)
  contact: {
    enabled: true,
    email: "hello@yourdomain.com",
    phone: "(123) 456-7890",
    address: "123 Main St, San Francisco, CA",
  },

  // Pagination defaults
  pagination: {
    // Default page size for lists
    defaultLimit: 25,
    // Maximum allowed page size
    maxLimit: 100,
  },
} satisfies AppConfig;

// Type definitions
export type ContactConfig = {
  enabled: boolean;
  email: string;
  phone: string;
  address: string;
};

export type PaginationConfig = {
  defaultLimit: number;
  maxLimit: number;
};

export type AppConfig = {
  appName: string;
  appNameFull: string;
  description: string;
  contact: ContactConfig;
  pagination: PaginationConfig;
};
