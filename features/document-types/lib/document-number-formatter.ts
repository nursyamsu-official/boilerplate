type FormatDocumentNumberInput = {
  prefix: string;
  separator: string;
  number: number;
  padding: number;
  year?: number;
};

export function formatDocumentNumber({
  prefix,
  separator,
  number,
  padding,
  year = new Date().getFullYear(),
}: FormatDocumentNumberInput): string {
  const paddedNumber = String(number).padStart(padding, "0");
  return `${prefix}${separator}${year}${separator}${paddedNumber}`;
}
