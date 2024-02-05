import { ClientDataResponse, CurrencyCode } from "./types";

export class ClientService {
  ip = "0.0.0.0";
  localCurrency: CurrencyCode = CurrencyCode.USD;
  private clientInitialized = "clientinitialized";

  constructor() {
    this.fetchUserIp(() => window.dispatchEvent(new CustomEvent(this.clientInitialized)));
    window.addEventListener("online", this.onlineHandler);
  }

  private fetchUserIp = async (finalCallback?: () => void) => {
    try {
      const response = await fetch("https://ipapi.co/json/");
      const clientData = await response.json() as ClientDataResponse;
      this.ip = clientData.ip;
      this.localCurrency = clientData.currency;
    } finally {
      finalCallback?.();
    }
  }

  private onlineHandler = () => {
    this.fetchUserIp();
  }

  onInitilized(callback: () => void) {
    window.addEventListener(this.clientInitialized, callback, { once: true });
  }
}

export const clientService = new ClientService();
