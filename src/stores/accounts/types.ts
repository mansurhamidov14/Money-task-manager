import type { CurrencyCode } from "@app/entities";
import { AsyncStore } from "../types";

export type Account = {
  id: string;
  userId: string;
  title: string;
  balance: number;
  currency: CurrencyCode;
  skin: string;
  primary: boolean;
  createdAt: number;
  updatedAt: number;
}

export type AccountsStore = AsyncStore<Account[]>;
