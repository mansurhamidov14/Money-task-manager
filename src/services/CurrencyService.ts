import md5 from "md5";
import { azFlag, euFlag, gbFlag, ruFlag, trFlag, uaFlag, usFlag } from "@app/assets";
import { CURRENCY_RATES_ACCESS_SALT } from "@app/constants";
import {
  cacheService,
  Currencies,
  Currency,
  CurrencyCode,
  CurrencyRates,
  CurrencyRatesResponse,
  INITIAL_CURRENCY_RATES,
  clientService,
  type ClientService,
} from "@app/services";

class CurrencyService {
  private availableCurrenciesMap: Currencies;
  public availableCurrencyCodes: CurrencyCode[];
  public avaliableCurrencies: Currency[];
  public defaultCurrency: CurrencyCode = CurrencyCode.USD;

  constructor(public clientService: ClientService) {
    this.availableCurrenciesMap = {
      AZN: this.generateCurrency(CurrencyCode.AZN, "₼", 2, azFlag, this.trailingSignFormatter),
      USD: this.generateCurrency(CurrencyCode.USD, "$", 2, usFlag),
      EUR: this.generateCurrency(CurrencyCode.EUR, "€", 2, euFlag, ),
      GBP: this.generateCurrency(CurrencyCode.GBP, "£", 2, gbFlag),
      TRY: this.generateCurrency(CurrencyCode.TRY, "₺", 0, trFlag),
      UAH: this.generateCurrency(CurrencyCode.UAH, "₴", 0, uaFlag),
      RUB: this.generateCurrency(CurrencyCode.RUB, "₽", 0, ruFlag, this.trailingSignFormatter),
    };
    this.avaliableCurrencies = Object.values(this.availableCurrenciesMap);
    this.availableCurrencyCodes = Object.values(CurrencyCode);
    this.clientService.onInitilized(() => {
      if (this.availableCurrencyCodes.includes(this.clientService.localCurrency)) {
        this.defaultCurrency = this.clientService.localCurrency;
      }
    });
  }

  async getRates(
    baseCurrency: CurrencyCode,
    currencies: CurrencyCode[],
    date: string,
    accessKey: string[]
  ): Promise<CurrencyRates> {
    if (!currencies.length) {
      return INITIAL_CURRENCY_RATES;
    }
    const key = accessKey.join("_");
    const cachedData = cacheService.data;
    const cachedRates = cachedData.currencyRates[key];
    if (cachedRates) return cachedRates;
    try {
      const reqParams = new URLSearchParams({
        base: baseCurrency,
        currencies: currencies.join(","),
        date
      });
      const response = await fetch(`https://schoolplus.io/web/rates.php?${reqParams}`, {
        headers: {
          'Access-Key': md5(CURRENCY_RATES_ACCESS_SALT + md5(this.clientService.ip))
        }
      });
      const ratesData = (await response.json()).body;
      const res = this.formatResponse(ratesData);
      cachedData.currencyRates[key] = res;
      cacheService.write(cachedData);
      return res;
    } catch (e) {
      return INITIAL_CURRENCY_RATES;
    };
  }

  private formatResponse(response: CurrencyRatesResponse): Record<CurrencyCode, number> {
    return response.reduce((result, rate) => {
      result[rate.to] = rate.result;
      return result;
    }, { ...INITIAL_CURRENCY_RATES });
  }

  getCurrency(code: CurrencyCode) {
    return this.availableCurrenciesMap[code];
  }

  getFormatter(code: CurrencyCode) {
    return this.getCurrency(code).formatter;
  }

  formatValue(code: CurrencyCode, value: number) {
    return this.getFormatter(code)(value);
  }
  
  getFlag(code: CurrencyCode) {
    return this.getCurrency(code).flag;
  }

  getSign(code: CurrencyCode) {
    return this.getCurrency(code).sign;
  }

  private generateCurrency = (
    code: CurrencyCode,
    sign: string,
    precision: number,
    flag: string,
    formatter: (sign: string, precision: number) => (value: number) => string = this.leadingSignFormatter,
  ): Currency => ({ code, sign, precision, flag, formatter: formatter(sign, precision) });

  private trailingSignFormatter = function(sign: string, precision: number) {
    return function (value: number): string {
      const isWhole = value % 1 === 0;
      const amount = new Intl.NumberFormat("en-US", {
        minimumFractionDigits: isWhole ? 0 : precision,
        maximumFractionDigits: precision
      }).format(value);
      return `${amount}${sign}`;
    }
  }

  private leadingSignFormatter = function(sign: string, precision: number) {
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

export const currencyService = new CurrencyService(clientService);
