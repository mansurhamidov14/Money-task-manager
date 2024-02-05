class IpService {
  public clientIp = "0.0.0.0";
  private ipInitializeEvent = "ipinitialized";

  constructor() {
    this.fetchUserIp(() => window.dispatchEvent(new CustomEvent(this.ipInitializeEvent)));
    window.addEventListener("online", this.onlineHandler);
  }

  private fetchUserIp = async (finalCallback?: () => void) => {
    try {
      const response = await fetch("https://api64.ipify.org?format=json");
      const json = await response.json();
      this.clientIp = json.ip;
    } finally {
      finalCallback?.();
    }
  }

  private onlineHandler = () => {
    this.fetchUserIp();
  }

  onIpInitialized(callback: () => void) {
    window.addEventListener(this.ipInitializeEvent, callback, { once: true });
  }
}

export const ipService = new IpService();
