import { StorageItem } from "@app/entities";
import { SignUpForm } from "@app/schemas";
import type { HttpService } from "./HttpService";
import { AuthResponse, TokenResponse } from "./types";

export class AuthService {
  constructor (
    private httpClient: HttpService,
    private refreshToken: StorageItem<string | null>
  ) {}

  async signUp(formData: SignUpForm): Promise<AuthResponse> {
    try {
      const { data } = await this.httpClient.post<AuthResponse, SignUpForm>('/auth/signup', formData);
      this.refreshToken.value = data.refresh_token;
      return data;
    } catch (error) {
      throw error;
    }
  }

  async auth(email: string, password: string): Promise<AuthResponse> {
    try {
      const { data } = await this.httpClient.post<AuthResponse>('/auth/signin', { email, password });
      this.refreshToken.value = data.refresh_token;
      return data;
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
    try {
      await this.httpClient.post('/auth/logout');
    } catch (e) {} finally {
      this.refreshToken.clear();
    }
  }

  async getRefreshToken() {
    try {
      const { data } = await this.httpClient.post<TokenResponse>('/auth/refresh-token');
      this.refreshToken.value = data.refresh_token;
      return data;
    } catch (e) {
      this.refreshToken.clear();
      throw e;
    }
  }
}
