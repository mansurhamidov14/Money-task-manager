import { CurrencyCode } from ".";
import { User } from "./User";

export type Account = {
  id: string;
  userId: User["id"];
  title: string;
  balance: number;
  currency: CurrencyCode;
  skin: string;
  primary: boolean;
  createdAt: number;
  updatedAt: number;
}