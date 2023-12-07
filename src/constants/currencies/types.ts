export type CurrencyCode = "AZN" | "USD" | "UAH" | "RUB" | "TRY" | "EUR";

export type Currency = {
  code: CurrencyCode;
  sign: string;
  precision: number;
  formatter: (value: number) => string;
}
