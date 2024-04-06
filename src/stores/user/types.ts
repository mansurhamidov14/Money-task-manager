import type { User } from "@app/entities";

export type UserStore = {
  status: "loading" | "unauthorized" | "locked" | "authorized";
  data?: User;
};