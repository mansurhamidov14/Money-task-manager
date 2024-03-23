import { StorageItem } from "@app/entities";
import { User } from "@app/stores";
import type { HttpService } from "./HttpService";

export class UserService {
  constructor(private httpClient: HttpService, private accessToken: StorageItem<string | null>) {}

  async getUser() {
    try {
      const { data } = await this.httpClient.get<User>('/user');
      return data;
    } catch (e) {
      this.accessToken.clear();
      return null;
    }
  }

  async validatePin(pinCode: string) {
    try {
      await this.httpClient.post<boolean>('/auth/validate-pin', { pinCode });
      return true;
    } catch (e) {
      throw(e);
    }
  }

  async setUpPinProtection(newPin: string, prevPin?: string) {
    // TODO implement from scratch
  }
}