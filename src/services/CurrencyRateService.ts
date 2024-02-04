import md5 from "md5";
import { CURRENCY_RATES_ACCESS_SALT, CurrencyCode } from "@app/constants";
import { CurrencyRates, CurrencyRatesResponse, cacheService } from ".";
import { ipService } from "./IpService";
import { INITIAL_CURRENCY_RATES } from "./consts";

class CurrencyRateService {
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
      const myIp = await ipService.getMyIp();
      const reqParams = new URLSearchParams({
        base: baseCurrency,
        currencies: currencies.join(","),
        date
      });
      const response = await fetch(`https://schoolplus.io/web/rates.php?${reqParams}`, {
        headers: {
          'Access-Key': md5(CURRENCY_RATES_ACCESS_SALT + md5(myIp))
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
}

export const currencyRateService = new CurrencyRateService();