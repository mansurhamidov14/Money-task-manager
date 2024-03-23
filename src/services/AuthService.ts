import { StorageItem } from "@app/entities";
import { t } from "@app/i18n";
import { SignUpForm } from "@app/schemas";
import { User } from "@app/stores";

import type { HttpService } from "./HttpService";
import { AuthResponse } from "./types";

export class AuthService {
  private static EmailAlreadyRegisteredException = "EmailAlreadyRegisteredException";
  private static WrongEmailOrPasswordException = "WrongEmailOrPasswordException";

  constructor (private httpClient: HttpService, private accessToken: StorageItem<string | null>) {}

  async signUp(formData: SignUpForm): Promise<User> {
    try {
      const { data: { access_token, user } } = await this.httpClient.post<AuthResponse, SignUpForm>('/auth/signup', formData);
      this.accessToken.value = access_token;
      return user;
    } catch (error) {
      throw new Error(AuthService.EmailAlreadyRegisteredException);
    }
  }

  async auth(email: string, password: string): Promise<User> {
    try {
      const { data } = await this.httpClient.post<AuthResponse>('/auth/signin', { email, password });
      this.accessToken.value = data.access_token;
      return data.user;
    } catch (e) {
      throw new Error(AuthService.WrongEmailOrPasswordException);
    }
  }

  async userExist(email: string): Promise<boolean> {
    try {
      const { data } = await this.httpClient.get<boolean>(`/auth/user-exist?email=${email}`);
      return data;
    } catch (e) {
      return false;
    }
  }

  async setUpPinProtection(user: User, newPin: string, prevPin?: string) {
    const isValid = this.validatePin(user.id, prevPin);

    if (!isValid) {
      throw new Error("PIN is incorrect");
    }

    await this.update(user.id, { pinCode: newPin, hasPinProtection: 1 });
  }

  async logOut() {
    this.accessToken.clear();
    return true;
  }

  async getByEmailAndPassword(email: string, password: string): Promise<User | null> {
    const user = await this.collection.queryOne({ email: email.toLowerCase(), password });

    return user;
  }

  async removePinProtectionByPassword(email: string, password: string) {
    const user = await this.getByEmailAndPassword(email, password);

    if (user) {
      await this.update(user.id, { hasPinProtection: 0, pinCode: undefined });
    } else {
      throw new Error(t("AuthScreen.PINInput.invalidPassword"));
    }
  }

  async removePinProtectionByPin(id: number, pin: string) {
    const isValid = await this.validatePin(id, pin);

    if (isValid) {
      await this.update(id, { hasPinProtection: 0, pinCode: undefined });
      return true;
    } else {
      throw Error("Invalid PIN");
    }
  }
}
