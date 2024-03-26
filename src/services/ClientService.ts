import { CurrencyCode, DataWithEventHandlers } from "@app/entities";
import type { HttpService } from "./HttpService";
import { ClientDataResponse, ClientServiceEvent, ClientServiceEventHandler } from "./types";

const events: ClientServiceEvent[] = ["connectionError", "connectionSuccess"];
export class ClientService extends DataWithEventHandlers<ClientServiceEvent, ClientServiceEventHandler> {
  ip = "0.0.0.0";
  localCurrency: CurrencyCode = CurrencyCode.USD;

  constructor(private http: HttpService) {
    super(events);
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
