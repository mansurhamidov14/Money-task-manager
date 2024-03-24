import { StorageItem } from "@app/entities";
import { SignUpForm } from "@app/schemas";
import { User } from "@app/stores";

import type { HttpService } from "./HttpService";
import { AuthResponse } from "./types";

export class AuthService {
  constructor (private httpClient: HttpService, private accessToken: StorageItem<string | null>) {}

  async signUp(formData: SignUpForm): Promise<User> {
    try {
      const { data: { access_token, user } } = await this.httpClient.post<AuthResponse, SignUpForm>('/auth/signup', formData);
      this.accessToken.value = access_token;
      return user;
    } catch (error) {
      throw error;
    }
  }

  async auth(email: string, password: string): Promise<User> {
    try {
      const { data } = await this.httpClient.post<AuthResponse>('/auth/signin', { email, password });
      this.accessToken.value = data.access_token;
      return data.user;
    } catch (e) {
      throw e;
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

  async logOut() {
    this.accessToken.clear();
    return true;
  }
}
