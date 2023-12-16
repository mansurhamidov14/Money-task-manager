import type { IconTypes } from "solid-icons";

export type CategoryId =
  | "market"
  | "education"
  | "entertainment"
  | "health"
  | "clothing"
  | "restaurant"
  | "transfer"
  | "transport"
  | "other";

export type Category = {
  id: CategoryId,
  icon: IconTypes,
  colors: {
    accent: string;
    icon: string;
  }
}
