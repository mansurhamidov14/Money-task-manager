import type { CurrencyCode } from "@app/entities";
import { AsyncStore } from "../types";
import { User } from "..";

export type Account = {
  id: string;
  userId: User['id'];
  title: string;
  balance: number;
  currency: CurrencyCode;
  skin: string;
  primary: boolean;
  createdAt: number;
  updatedAt: number;
}

export type AccountsStore = AsyncStore<Account[]>;
