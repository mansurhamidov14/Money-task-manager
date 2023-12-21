import { azFlag, euFlag, gbFlag, ruFlag, trFlag, uaFlag, usFlag } from "@app/assets";
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
  flag: string,
  formatter: (sign: string, precision: number) => (value: number) => string = leadingSignFormatter,
): Currency => ({ code, sign, precision, flag, formatter: formatter(sign, precision) });

export const currencies: Record<CurrencyCode, Currency> = {
  AZN: generateCurrency(CurrencyCode.AZN, "₼", 2, azFlag, trailingSignFormatter),
  USD: generateCurrency(CurrencyCode.USD, "$", 2, usFlag),
  EUR: generateCurrency(CurrencyCode.EUR, "€", 2, euFlag, ),
  GBP: generateCurrency(CurrencyCode.GBP, "£", 2, gbFlag),
  TRY: generateCurrency(CurrencyCode.TRY, "₺", 0, trFlag),
  UAH: generateCurrency(CurrencyCode.UAH, "₴", 0, uaFlag),
  RUB: generateCurrency(CurrencyCode.RUB, "₽", 0, ruFlag, trailingSignFormatter),
};
