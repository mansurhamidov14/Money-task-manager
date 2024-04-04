import { User } from "@app/stores";
import type { HttpService } from "./HttpService";

export class UserService {
  constructor(private httpClient: HttpService) {}

  async getUser() {
    return await this.httpClient.get<User>('/user')
  }

  update(data: Partial<User>) {
    return this.httpClient.patch<Partial<User>>('/user', data);
  }

  async validatePin(pinCode: string) {
    try {
      await this.httpClient.post<boolean>('/user/validate-pin', { pinCode });
      return true;
    } catch (e: any) {
      console.log(JSON.stringify(e));
      throw(e);
    }
  }

  setUpPinProtection(prevPin?: string, newPin?: string) {
    return this.httpClient.post<boolean>('/user/set-pin', {
      pinCode: prevPin,
      newPinCode: newPin
    });
  }

  removePinProtectionByPassword(password: string) {
    return this.httpClient.post<boolean>('/user/remove-pin-by-password', { password });
  }

  resetPassword(password: string, newPassword: string) {
    return this.httpClient.post<boolean>('/user/reset-password', { password, newPassword });
  }
}