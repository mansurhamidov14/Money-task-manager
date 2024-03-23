import { CurrencyCode } from "@app/entities";
import type { HttpService } from "./HttpService";
import { ClientDataResponse } from "./types";

export class ClientService {
  ip = "0.0.0.0";
  localCurrency: CurrencyCode = CurrencyCode.USD;
  private clientInitialized = "clientinitialized";
  private clientConnectionSuccess = "clientConnectionSuccess";

  constructor(private http: HttpService) {
    this.fetchUserIp(() => window.dispatchEvent(new CustomEvent(this.clientInitialized)));
    window.addEventListener("online", this.onlineHandler);
  }

  private fetchUserIp = async (finalCallback?: () => void) => {
    try {
      const { data } = await this.http.get<ClientDataResponse>(`/client/info`);
      this.ip = data.ip;
      this.localCurrency = data.currency;
      window.dispatchEvent(new CustomEvent(this.clientConnectionSuccess));
    } catch (e) {} finally {
      finalCallback?.();
    }
  }

  private onlineHandler = async () => {
    await this.fetchUserIp();
    window.dispatchEvent(new CustomEvent(this.clientConnectionSuccess))
  }

  onInitilized(callback: () => void) {
    window.addEventListener(this.clientInitialized, callback, { once: true });
  }

  onConnectionSuccess(callback: () => void) {
    window.addEventListener(this.clientConnectionSuccess, callback);
  }
}
