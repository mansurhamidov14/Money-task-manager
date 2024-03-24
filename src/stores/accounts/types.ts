import type { CurrencyCode } from "@app/entities";
import { AsyncStore } from "../types";

export type Account = {
  id: number;
  user: string;
  title: string;
  balance: number;
  currency: CurrencyCode;
  skin: string;
  primary: 1 | 0;
  createdAt: number;
  updatedAt: number;
}

export type AccountsStore = AsyncStore<Account[]>;
