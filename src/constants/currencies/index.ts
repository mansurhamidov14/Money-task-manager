import { Currency, CurrencyCode } from "./types";

const leadingSignFormatter = function(sign: string, precision: number) {
  return function (value: number): string {
    const isWhole = value % 1 === 0;
    const amount = new Intl.NumberFormat("en-US", {
      minimumFractionDigits: isWhole ? 0 : precision,
      maximumFractionDigits: precision
    }).format(Math.abs(value));
    return `${sign}${amount}`;
  }
}

const trailingSignFormatter = function(sign: string, precision: number) {
  return function (value: number): string {
    const isWhole = value % 1 === 0;
    const amount = new Intl.NumberFormat("en-US", {
      minimumFractionDigits: isWhole ? 0 : precision,
      maximumFractionDigits: precision
    }).format(Math.abs(value));
    return `${amount}${sign}`;
  }
}

const generateCurrency = (
  code: CurrencyCode,
  sign: string,
  precision: number,
  formatter: (sign: string, precision: number) => (value: number) => string = leadingSignFormatter
): Currency => ({ code, sign, precision, formatter: formatter(sign, precision) });

export const currencies: Record<CurrencyCode, Currency> = {
  AZN: generateCurrency(CurrencyCode.AZN, "₼", 2, trailingSignFormatter),
  EUR: generateCurrency(CurrencyCode.EUR, "€", 2),
  RUB: generateCurrency(CurrencyCode.RUB, "₽", 2, trailingSignFormatter),
  TRY: generateCurrency(CurrencyCode.TRY, "₺", 2),
  UAH: generateCurrency(CurrencyCode.UAH, "₴", 2),
  USD: generateCurrency(CurrencyCode.USD, "$", 2),
};
