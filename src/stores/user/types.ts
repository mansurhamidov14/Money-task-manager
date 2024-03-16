import type { CurrencyCode } from "@app/entities";

export type User = {
  id: number;
  avatar: string;
  firstName: string;
  lastName: string;
  email: string;
  hasPinProtection: 0 | 1;
  createdAt: number;
  updatedAt: number;
  primaryCurrency: CurrencyCode;
}

export type UserStore = {
  status: "loading" | "unauthorized" | "locked" | "authorized";
  data?: User;
};