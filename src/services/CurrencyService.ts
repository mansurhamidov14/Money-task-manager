import { azFlag, euFlag, gbFlag, ruFlag, trFlag, uaFlag, usFlag } from "@app/assets";
import { Currency, CurrencyCode } from "@app/entities";
import { getAbsentKeys, toMap } from "@app/helpers";
import { Currencies, CurrencyRates, CurrencyRatesResponse, INITIAL_CURRENCY_RATES } from "@app/services";

import type { CacheService } from "./CacheService";
import type { ClientService } from "./ClientService";
import type { HttpService } from "./HttpService";

export class CurrencyService {
  private availableCurrenciesMap: Currencies;
  public availableCurrencyCodes: CurrencyCode[];
  public avaliableCurrencies: Currency[];
  public defaultCurrency: CurrencyCode = CurrencyCode.USD;

  constructor(
    private http: HttpService,
    private cacheService: CacheService,
    clientService: ClientService
  ) {
    this.availableCurrenciesMap = {
      AZN: new Currency({ code: CurrencyCode.AZN, sign: "₼", flag: azFlag, formatter: Currency.trailingSignFormatter }),
      USD: new Currency({ code: CurrencyCode.USD, sign: "$", flag: usFlag }),
      EUR: new Currency({ code: CurrencyCode.EUR, sign: "€", flag: euFlag }),
      GBP: new Currency({ code: CurrencyCode.GBP, sign: "£", flag: gbFlag }),
      TRY: new Currency({ code: CurrencyCode.TRY, sign: "₺", precision: 0, flag: trFlag }),
      UAH: new Currency({ code: CurrencyCode.UAH, sign: "₴", precision: 0, flag: uaFlag }),
      RUB: new Currency({ code: CurrencyCode.RUB, sign: "₽", precision: 0, flag: ruFlag, formatter: Currency.trailingSignFormatter}),
    };
    this.avaliableCurrencies = Object.values(this.availableCurrenciesMap);
    this.availableCurrencyCodes = Object.values(CurrencyCode);
  
    /** Setting up app default currency according to user's country */
    clientService.on("connectionSuccess", () => {
      if (this.availableCurrencyCodes.includes(clientService.localCurrency)) {
        this.defaultCurrency = clientService.localCurrency;
      }
    });
  }

  async getRates(
    baseCurrency: CurrencyCode,
    currencies: CurrencyCode[],
    date: string
  ): Promise<CurrencyRates> {
    if (!currencies.length) {
      return INITIAL_CURRENCY_RATES;
    }
    const key = `${date}_${baseCurrency}`;
    const cachedRates = this.cacheService.getCacheData("currencyRates");
    const cachedRatesOfDate = cachedRates[key] ?? {};
    const absentCurrencies = getAbsentKeys(cachedRatesOfDate, currencies);
    if (!absentCurrencies.length) {
      return { ...INITIAL_CURRENCY_RATES, ...cachedRatesOfDate };
    }
    try {
      const absentCurrenciesStr = absentCurrencies.join(",");
      const { data } = await this.http.get<CurrencyRatesResponse>(
        `/currency/rates/${baseCurrency}/${absentCurrenciesStr}/${date}`
      );
      const replenishedRates = toMap(data, 'to', 'result');
      cachedRates[key] = { ...cachedRatesOfDate, ...replenishedRates };
      this.cacheService.writeToSection("currencyRates", cachedRates)
      return { ...INITIAL_CURRENCY_RATES, ...cachedRates[key] };
    } catch (e: any) {
      return INITIAL_CURRENCY_RATES;
    };
  }

  getCurrency(code: CurrencyCode) {
    return this.availableCurrenciesMap[code];
  }

  formatValue(code: CurrencyCode, value: number) {
    return this.getCurrency(code).formatValue(value);
  }
  
  getFlag(code: CurrencyCode) {
    return this.getCurrency(code).flag;
  }

  getSign(code: CurrencyCode) {
    return this.getCurrency(code).sign;
  }
}
