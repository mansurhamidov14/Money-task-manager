import { CurrencyCode } from ".";

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