import md5 from "md5";
import { azFlag, euFlag, gbFlag, ruFlag, trFlag, uaFlag, usFlag } from "@app/assets";
import { API_BASE_URL, CURRENCY_RATES_ACCESS_SALT } from "@app/constants";
import {
  cacheService,
  Currencies,
  CurrencyRates,
  CurrencyRatesResponse,
  INITIAL_CURRENCY_RATES,
  clientService,
  type ClientService,
  OptionalCurrencyRates,
  HttpService,
} from "@app/services";
import { getAbsentKeys } from "@app/helpers";
import { Currency, CurrencyCode } from "@app/entities";

class CurrencyService {
  private availableCurrenciesMap: Currencies;
  public availableCurrencyCodes: CurrencyCode[];
  public avaliableCurrencies: Currency[];
  public defaultCurrency: CurrencyCode = CurrencyCode.USD;

  constructor(private http: HttpService, clientService: ClientService) {
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
    clientService.onInitilized(() => {
      if (this.availableCurrencyCodes.includes(clientService.localCurrency)) {
        this.defaultCurrency = clientService.localCurrency;
      }
    });
  
    /** Setting up httpClient request headers */
    clientService.onConnectionSuccess(() => {
      this.http.headers = this.createRequestHeaders(clientService.ip);
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
    const cachedRates = cacheService.getCacheData("currencyRates", {});
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
      const res = this.formatResponse(data);
      cachedRates[key] = { ...cachedRatesOfDate, ...res };
      cacheService.writeToSection("currencyRates", cachedRates)
      return { ...INITIAL_CURRENCY_RATES, ...cachedRates[key] };
    } catch (e: any) {
      return INITIAL_CURRENCY_RATES;
    };
  }

  private formatResponse(response: CurrencyRatesResponse): OptionalCurrencyRates {
    return response.reduce((result, rate) => {
      result[rate.to] = rate.result;
      return result;
    }, {} as OptionalCurrencyRates);
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

  private getAccessKey(ipAddress: string) {
    return md5(CURRENCY_RATES_ACCESS_SALT + md5(ipAddress));
  }

  private createRequestHeaders(ipAddress: string) {
    return {
      'Access-Key': this.getAccessKey(ipAddress)
    };
  }
}

export const currencyService = new CurrencyService(new HttpService(API_BASE_URL), clientService);
