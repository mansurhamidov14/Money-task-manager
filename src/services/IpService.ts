class IpService {
  async getMyIp(): Promise<string> {
    const response = await fetch("https://api64.ipify.org?format=json");
    const json = await response.json();
    return json.ip;
  }
}

export const ipService = new IpService();
