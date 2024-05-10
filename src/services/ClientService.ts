import { CurrencyCode, EventHandler } from "@app/entities";
import type { HttpService } from "./HttpService";
import { ClientDataResponse, ClientServiceEvent, ClientServiceEventHandler } from "./types";

export class ClientService extends EventHandler<ClientServiceEvent, ClientServiceEventHandler> {
  ip = "0.0.0.0";
  localCurrency: CurrencyCode = CurrencyCode.USD;

  constructor(private http: HttpService) {
    super();
    this.fetchClientData();
    window.addEventListener("online", this.fetchClientData);
  }

  public fetchClientData = async () => {
    try {
      const { data } = await this.http.get<ClientDataResponse>(`/client/info`);
      this.ip = data.ip;
      this.localCurrency = data.currency;
      this.dispatchEvent("connectionSuccess");
    } catch (e) {
      this.dispatchEvent("connectionError");
    }
  }
}
