import type { CurrencyCode } from "@app/constants";
import { AsyncStore } from "../types";

export type Account = {
  id: number;
  user: number;
  title: string;
  balance: number;
  currency: CurrencyCode;
  skin: string;
  primary: 1 | 0;
  createdAt: number;
  updatedAt: number;
}

export type AccountsStore = AsyncStore<Account[]>;
