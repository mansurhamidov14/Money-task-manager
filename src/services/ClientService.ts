import { API_BASE_URL } from "@app/constants";
import { ClientDataResponse } from "./types";
import { HttpService } from ".";
import { CurrencyCode } from "@app/entities";

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

export const clientService = new ClientService(
  new HttpService(API_BASE_URL)
);
