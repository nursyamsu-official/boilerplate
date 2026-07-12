import {
  provinceCreateRepository,
  provinceGetByCodeRepository,
} from "../repositories/province-create.repository";
import type { ProvinceCreateInput } from "../schemas/province-create.schema";

export async function provinceCreateService(input: ProvinceCreateInput) {
  const existing = await provinceGetByCodeRepository(
    input.countryId,
    input.code,
  );
  if (existing) {
    throw new Error("Province code already exists for this country");
  }

  return provinceCreateRepository(input);
}
