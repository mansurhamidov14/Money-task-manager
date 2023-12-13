import type { CurrencyCode } from "@app/constants";
import { Lang } from "@app/i18n/types";

export type User = {
  id: number;
  avatar?: string;
  firstName: string;
  lastName: string;
  email: string;
  createdAt: number;
  updatedAt: number;
  currency: CurrencyCode;
  lang: Lang;
  theme: "light" | "dark" | null;
}

export type UserStore = {
  isAuthorized: boolean;
  isLoading: boolean;
  data?: User;
};