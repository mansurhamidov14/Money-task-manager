import { CurrencyCode } from "@app/entities";
import type { HttpService } from "./HttpService";
import { ClientDataResponse } from "./types";

export class ClientService {
  ip = "0.0.0.0";
  localCurrency: CurrencyCode = CurrencyCode.USD;
  private clientConnectionSuccess = "clientConnectionSuccess";
  private clientConnectionError = "clientConnectionError";

  constructor(private http: HttpService) {
    this.fetchClientData();
    window.addEventListener("online", this.fetchClientData);
  }

  public fetchClientData = async () => {
    try {
      const { data } = await this.http.get<ClientDataResponse>(`/client/info`);
      this.ip = data.ip;
      this.localCurrency = data.currency;
      window.dispatchEvent(new CustomEvent(this.clientConnectionSuccess));
    } catch (e) {
      window.dispatchEvent(new CustomEvent(this.clientConnectionError));
    }
  }

  onConnectionSuccess(callback: () => void) {
    window.addEventListener(this.clientConnectionSuccess, callback);
  }

  onConnectionError(callback: () => void) {
    window.addEventListener(this.clientConnectionError, callback);
  }
}
