export enum CurrencyCode {
  AZN = "AZN",
  GBP = "GBP",
  USD = "USD",
  UAH = "UAH",
  RUB = "RUB",
  TRY = "TRY",
  EUR = "EUR",
};

export interface CurrencyOptions {
  code: CurrencyCode;
  sign: string;
  flag: string;
  precision?: number;
  formatter?: (sign: string, precision: number) => (value: number) => string
}

export class Currency {
  public code: CurrencyCode;
  public sign: string;
  public flag: string;
  public precision: number;
  public formatValue: (value: number) => string;

  constructor(options: CurrencyOptions) {
    this.code = options.code;
    this.sign = options.sign;
    this.flag = options.flag;
    this.precision = options.precision ?? 2;
    const formatter = options.formatter ?? Currency.leadingSignFormatter;
    this.formatValue = formatter(this.sign, this.precision);
  }

  static trailingSignFormatter = (sign: string, precision: number) => {
    return function (value: number): string {
      const isWhole = value % 1 === 0;
      const amount = new Intl.NumberFormat("en-US", {
        minimumFractionDigits: isWhole ? 0 : precision,
        maximumFractionDigits: precision
      }).format(value);
      return `${amount}${sign}`;
    }
  }
  
  static leadingSignFormatter = (sign: string, precision: number) => {
    return function (value: number): string {
      const isWhole = value % 1 === 0;
      const amount = new Intl.NumberFormat("en-US", {
        minimumFractionDigits: isWhole ? 0 : precision,
        maximumFractionDigits: precision
      }).format(Math.abs(value));
      
      let result = `${sign}${amount}`;
      if (value < 0) result = "-" + result;
      return result;
    }
  }
}
