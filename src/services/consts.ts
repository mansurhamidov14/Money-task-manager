import { CachedData, CurrencyCode } from "./types";

export const INITIAL_CURRENCY_RATES: Record<CurrencyCode, number> = Object
  .values(CurrencyCode)
  .reduce((result, code) => {
    result[code] = 1;
    return result;
  }, {} as Record<CurrencyCode, number>);

export const INITIAL_CACHE_DATA: CachedData = {
  currencyRates: {}
};
