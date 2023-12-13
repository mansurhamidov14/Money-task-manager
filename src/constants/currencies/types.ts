export enum CurrencyCode {
  AZN = "AZN",
  USD = "USD",
  UAH = "UAH",
  RUB = "RUB",
  TRY = "TRY",
  EUR = "EUR",
};

export type Currency = {
  code: CurrencyCode;
  sign: string;
  precision: number;
  formatter: (value: number) => string;
}
