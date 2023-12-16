import type { CurrencyCode } from "@app/constants";

export type User = {
  id: number;
  avatar?: string;
  firstName: string;
  lastName: string;
  email: string;
  createdAt: number;
  updatedAt: number;
  currency: CurrencyCode;
}

export type UserStore = {
  isAuthorized: boolean;
  isLoading: boolean;
  data?: User;
};