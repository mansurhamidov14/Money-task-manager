import { Currency, CurrencyCode } from "./types";

const leadingSignFormatter = function(sign: string, precision: number) {
  return function (value: number): string {
    return `${sign}${value.toFixed(precision)}`;
  }
}

const trailingSignFormatter = function(sign: string, precision: number) {
  return function (value: number): string {
    return `${value.toFixed(precision)}${sign}`;
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
